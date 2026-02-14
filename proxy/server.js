import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/*
=====================================================
 HUGGINGFACE INFERENCE ENDPOINT (CORRECT)
=====================================================
*/

// ✅ Summarization model
const SUMMARY_URL =
  "https://router.huggingface.co/hf-inference/models/sshleifer/distilbart-cnn-12-6";

// ✅ Translation model (must ALSO use hf-inference)
// Translation models (free supported)
const TRANSLATE_MODELS = {
  Hindi: "https://router.huggingface.co/hf-inference/models/Helsinki-NLP/opus-mt-en-hi",
  Marathi: "https://router.huggingface.co/hf-inference/models/Helsinki-NLP/opus-mt-en-mr",
  Gujarati: "https://router.huggingface.co/hf-inference/models/Helsinki-NLP/opus-mt-en-gu",
};

/*
=====================================================
 STEP 1 → SUMMARIZE TEXT (ENGLISH)
=====================================================
*/
async function summarizeText(text) {
  const response = await fetch(SUMMARY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: text.slice(0, 5000), // keep short for speed
      parameters: {
        max_length: 120,
        min_length: 40,
      },
      options: { wait_for_model: true },
    }),
  });

  const data = await response.json();
  console.log("🧠 Summary:", data);

  if (Array.isArray(data)) return data[0].summary_text;

  throw new Error("Summarization failed");
}

/*
=====================================================
 STEP 2 → TRANSLATE SUMMARY (MULTILINGUAL)
=====================================================
*/
async function translateText(text, targetLang) {
  const modelURL = TRANSLATE_MODELS[targetLang];

  // If language not supported → return English summary
  if (!modelURL) return text;

  const response = await fetch(modelURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: text,
      options: { wait_for_model: true },
    }),
  });

  const data = await response.json();
  console.log("🌍 Translation:", data);

  if (Array.isArray(data)) {
    return data[0].translation_text;
  }

  return text;
}


/*
=====================================================
 MAIN API ROUTE
=====================================================
*/
app.post("/summarize", async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    console.log("📄 Processing request...");
    console.log("🌐 Target Language:", language || "English");

    let workingText = text;

    /*
    ============================================
    STEP 1 → If user wants Hindi/Marathi/etc
    Translate ORIGINAL PAGE → English FIRST
    ============================================
    */
    if (language && language !== "English" && LANG_MODELS[language]) {
      console.log("🔄 Translating page → English");
      workingText = await translate(
        text.slice(0, 2000),   // translate more text for context
        LANG_MODELS[language].toEnglish
      );
    }

    /*
    ============================================
    STEP 2 → Summarize CLEAN English content
    ============================================
    */
    console.log("🧠 Generating summary...");
    const summary = await summarizeText(workingText);

    /*
    ============================================
    STEP 3 → Translate SUMMARY back to user language
    ============================================
    */
    let finalSummary = summary;

    if (language && language !== "English" && LANG_MODELS[language]) {
      console.log("🌍 Translating summary →", language);
      finalSummary = await translate(summary, LANG_MODELS[language].fromEnglish);
    }

    res.json({ summary: finalSummary });
  } catch (err) {
    console.error("❌ Proxy error:", err.message);
    res.status(500).json({ error: "AI processing failed" });
  }
});


/*
=====================================================
 START SERVER
=====================================================
*/
app.listen(5001, () => {
  console.log("✅ HF Proxy running on http://localhost:5001");
});
