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
 HUGGINGFACE MODEL ENDPOINTS
=====================================================
*/

// 🔹 Summarization Model
const SUMMARY_URL =
  "https://router.huggingface.co/hf-inference/models/sshleifer/distilbart-cnn-12-6";

// 🔹 Translation Models (English → Target)
const TRANSLATE_MODELS = {
  Hindi:
    "https://router.huggingface.co/hf-inference/models/Helsinki-NLP/opus-mt-en-hi",
  Marathi:
    "https://router.huggingface.co/hf-inference/models/Helsinki-NLP/opus-mt-en-mr",
  Gujarati:
    "https://router.huggingface.co/hf-inference/models/Helsinki-NLP/opus-mt-en-gu",
};

/*
=====================================================
 STEP 1 → SUMMARIZE TEXT
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
      inputs: text.slice(0, 4000), // limit size
      parameters: {
        max_length: 120,
        min_length: 40,
      },
      options: { wait_for_model: true },
    }),
  });

  const data = await response.json();

  console.log("🧠 HF Summary Response:", data);

  if (Array.isArray(data)) {
    return data[0].summary_text;
  }

  throw new Error("Summarization failed");
}

/*
=====================================================
 STEP 2 → TRANSLATE SUMMARY (OPTIONAL)
=====================================================
*/
async function translateText(text, language) {
  const modelURL = TRANSLATE_MODELS[language];

  if (!modelURL) return text; // If unsupported → return English

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

  console.log("🌍 HF Translation Response:", data);

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
    const { text, language = "English" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    console.log("📄 Processing request...");
    console.log("🌐 Target Language:", language);

    // 🔹 Step 1: Generate English summary
    const summary = await summarizeText(text);

    // 🔹 Step 2: Translate if needed
    let finalSummary = summary;

    if (language !== "English") {
      finalSummary = await translateText(summary, language);
    }

    res.json({ summary: finalSummary });

  } catch (err) {
    console.error("❌ AI Proxy Error:", err);
    res.status(500).json({ error: "AI processing failed" });
  }
});

/*
=====================================================
 START SERVER
=====================================================
*/
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`✅ HF Proxy running on http://localhost:${PORT}`);
});
