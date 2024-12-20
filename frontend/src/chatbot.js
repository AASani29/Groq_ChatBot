import React, { useState } from "react";
import axios from "axios";

function ChatBot() {
  const [userMessage, setUserMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        userMessage,
      });
      setChatResponse(response.data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatResponse("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "50px" }}>
      <h1>ChatBot</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your question here..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>
          Ask
        </button>
      </form>
      <div
        style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}
      >
        <h2>Response:</h2>
        <p>{chatResponse}</p>
      </div>
    </div>
  );
}

export default ChatBot;
