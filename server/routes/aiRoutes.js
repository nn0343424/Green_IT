// server/routes/aiRoutes.js
const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

// ⚠️ FINAL FIX: The SDK automatically looks for the GEMINI_API_KEY 
// in the environment variables (loaded via dotenv).
const ai = new GoogleGenAI({}); 

router.post('/generate-description', async (req, res) => {
    // ... (rest of the prompt logic remains the same, using the message field)
    const { product, condition, location, message } = req.body; 

    if (!message) {
        return res.status(400).json({ message: "A description (message) is required to rephrase." });
    }

    // --- PROMPT remains the same ---
    const prompt = `You are a professional copyeditor for an e-waste community platform.
    Your task is to rephrase the following rough description into a concise, formal, and clearly understandable listing description (maximum 3 sentences). 
    Do not add extra marketing slogans or information not present in the original text. Keep it strictly focused on the item's specific condition and reported issues.
    
    Item Type: ${product}
    Condition: ${condition}
    Location: ${location}
    Original Rough Description: "${message}"
    
    Revised Description:`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });

        const generatedText = response.text.trim();

        if (!generatedText) {
             console.error(`AI generated empty text. Finish Reason: ${response.candidates?.[0]?.finishReason}`);
             return res.status(500).json({ message: "AI generated an empty response." });
        }

        // Success: Send the generated text back
        res.status(200).json({ description: generatedText });

    } catch (error) {
        console.error("Gemini API Connection or Runtime Error:", error.message);
        res.status(500).json({ message: "Failed to connect to AI service. Check API Key validity and network." });
    }
});

module.exports = router;