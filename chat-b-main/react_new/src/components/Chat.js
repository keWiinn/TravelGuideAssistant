import React, { useState, useEffect, useRef } from "react";
import "./PRChatbot.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const PRChatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [clickedNow, setClickedNow] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [savedStatus, setSavedStatus] = useState("");
  const messagesEndRef = useRef(null);

  const suggestions = [
    {
      icon: "✈️",
      text: "Best time to visit",
      prompt: "What's the best time to visit Bali?",
      color: "#4facfe",
    },
    {
      icon: "💰",
      text: "Budget planning",
      prompt: "How much should I budget for a week in Paris?",
      color: "#00f2fe",
    },
    {
      icon: "🌤️",
      text: "Weather info",
      prompt: "What's the weather like in Tokyo during spring?",
      color: "#3498db",
    },
    {
      icon: "🎒",
      text: "Packing tips",
      prompt: "What should I pack for a trip to Iceland?",
      color: "#2ecc71",
    },
    {
      icon: "🍜",
      text: "Local cuisine",
      prompt: "What are must-try local dishes in Thailand?",
      color: "#e74c3c",
    },
  ];

  const getHoursAndMinutes = (timestamp) => {
    const [time, meridian] = timestamp.split(" ");
    const [hours, minutes] = time.split(":");
    let formattedHours = parseInt(hours, 10);
    if (meridian === "PM" && formattedHours !== 12) {
      formattedHours += 12;
    } else if (meridian === "AM" && formattedHours === 12) {
      formattedHours = 0;
    }
    return `${formattedHours}:${minutes}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = async (suggestedPrompt) => {
    setPrompt(suggestedPrompt);
    await handleSubmit({ preventDefault: () => {} }, true);
  };

  const handleSubmit = async (e, isSuggestion = false) => {
    e.preventDefault();
    if (!prompt.trim() || (clickedNow && !isSuggestion)) return;

    const userMessage = {
      sender: "User",
      text: prompt,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      setClickedNow(true);
      setIsTyping(true);

      // API call
      const response = await axios.post("http://127.0.0.1:5000/prompt", {
        prompt,
      });

      const aiMessage = {
        sender: "AI",
        text: response.data.response,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "AI",
        text: "I apologize, but I'm having trouble connecting. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setIsTyping(false);
    setClickedNow(false);
    setPrompt("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !clickedNow) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const saveConversation = () => {
    const conversationData = {
      messages,
      exportDate: new Date().toLocaleString(),
      metadata: {
        totalMessages: messages.length,
        conversationDuration:
          messages.length > 0
            ? `${Math.round(
                (new Date() - new Date(messages[0].timestamp)) / 1000 / 60
              )} minutes`
            : "0 minutes",
      },
    };

    const blob = new Blob([JSON.stringify(conversationData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `travel-conversation-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;

    setSavedStatus("Saving...");
    setTimeout(() => {
      link.click();
      setSavedStatus("Saved!");
      setTimeout(() => setSavedStatus(""), 2000);
    }, 500);

    URL.revokeObjectURL(url);
  };

  const shareConversation = () => {
    const conversationText = messages
      .map((msg) => `${msg.sender} (${msg.timestamp}): ${msg.text}`)
      .join("\n\n");

    if (navigator.share) {
      navigator
        .share({
          title: "Travel Guide Conversation",
          text: conversationText,
        })
        .catch(() => {
          navigator.clipboard.writeText(conversationText);
          alert("Conversation copied to clipboard!");
        });
    } else {
      navigator.clipboard.writeText(conversationText);
      alert("Conversation copied to clipboard!");
    }
  };

  return (
    <div className="prchatbot-app-container">
      <div className="prchatbot-container">
        <div className="prchatbot-header">
          <h1>Travel Guide Assistant</h1>
          <p className="header-subtitle">Your personal travel companion</p>
          <div className="header-buttons">
            <button onClick={saveConversation}>
              <span>💾</span>
              {savedStatus || "Save"}
            </button>
            <button onClick={shareConversation}>
              <span>📤</span>
              Share
            </button>
          </div>
        </div>

        <div className="prchatbot-messages">
          {messages.length === 0 ? (
            <div className="prchatbot-welcome">
              <h2>Ready to Plan Your Adventure?</h2>
              <p>Choose a topic or ask any travel-related question</p>
              <div className="prchatbot-suggestions">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-btn"
                    onClick={() => handleSuggestionClick(suggestion.prompt)}
                    style={{ backgroundColor: suggestion.color }}
                  >
                    <span className="suggestion-icon">{suggestion.icon}</span>
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`prchatbot-message ${msg.sender.toLowerCase()} ${
                  msg.isError ? "error" : ""
                }`}
              >
                <div className="message-header">
                  <strong>
                    {msg.sender === "User" ? "You" : "Travel Assistant"}
                  </strong>
                  <span className="message-time">
                    {getHoursAndMinutes(msg.timestamp)}
                  </span>
                </div>
                <div className="message-content">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="prchatbot-input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about travel..."
            disabled={clickedNow}
          />
          <button
            type="submit"
            className="prchatbot-send-btn"
            disabled={clickedNow || !prompt.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default PRChatbot;
