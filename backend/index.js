const express = require("express");
const Groq = require("groq-sdk");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Chatbot endpoint
app.post("/chat", async (req, res) => {
  const { userMessage } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Answer as Alif\n",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "mixtral-8x7b-32768",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    const response =
      chatCompletion.choices[0]?.message?.content || "No response.";
    res.json({ response });
  } catch (error) {
    console.error("Error in GROQ:", error);
    res.status(500).json({ error: "Failed to fetch response." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
