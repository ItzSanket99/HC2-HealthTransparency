import { pipeline } from "@xenova/transformers";

let summarizer = null;

// Function to summarize text
export const summarizeText = async (text) => {
  try {
    // Load model only first time
    if (!summarizer) {
      summarizer = await pipeline(
        "summarization",
        "Xenova/distilbart-cnn-6-6"
      );
    }

    const output = await summarizer(text, {
      max_length: 80,
      min_length: 30,
    });

    return output[0].summary_text;
  } catch (error) {
    console.error("Summarization error:", error);
    return "Failed to generate summary.";
  }
};
