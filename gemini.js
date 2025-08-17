// Function to run the Gemini API call using a direct fetch request
async function run(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  try {
    // Build request payload
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100, // allow longer responses
      },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();

    // Safely extract text
    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from model.";
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "An error occurred while generating content.";
  }
}

export default run;
