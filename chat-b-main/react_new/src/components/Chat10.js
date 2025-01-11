import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user prompt to the messages
    const userMessage = { sender: "User", text: prompt };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send the prompt to the backend
      const response = await axios.post("http://127.0.0.1:5000/prompt", { prompt });
      const aiMessage = { sender: "AI", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      const errorMessage = { sender: "AI", text: "Error: Unable to fetch response." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setPrompt(""); // Clear the input field
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1>Chatbot</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "10px 0" }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          style={{ width: "80%", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Send</button>
      </form>
    </div>
  );
}

export default App;
