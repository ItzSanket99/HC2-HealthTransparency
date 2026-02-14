export const summarizeTextHF = async (text, language = "English") => {
  try {
    const response = await fetch("http://localhost:5001/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, language }),
    });

    const data = await response.json();

    // ✅ NEW RESPONSE FORMAT
    if (data && data.summary) {
      return data.summary;
    }

    return "No summary generated.";
  } catch (err) {
    console.error("Summarizer error:", err);
    return "Error generating summary.";
  }
};
