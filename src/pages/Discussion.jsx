import React, { useState, useEffect } from "react";

function Discussion() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    try {
      const savedMessages = JSON.parse(
        localStorage.getItem("discussionMessages") || "[]"
      );
      if (Array.isArray(savedMessages)) {
        setMessages(savedMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to load discussion messages:", error);
      setMessages([]);
    }
  }, []);

  const handlePost = () => {
    if (!newMessage.trim()) return;

    const userName = localStorage.getItem("user_name") || "Unknown Student";

    const updatedMessages = [
      ...messages,
      {
        text: newMessage,
        postedBy: userName,
      },
    ];

    setMessages(updatedMessages);
    localStorage.setItem("discussionMessages", JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Discussion Board</h2>

      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handlePost}
        >
          Post
        </button>
      </div>

      {messages.length > 0 ? (
        <div className="space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="border p-2 rounded bg-white shadow">
              <p className="text-xs text-gray-500 mb-1">
                Posted by: {msg.postedBy}
              </p>
              <p className="text-gray-700">{msg.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No posts yet — start the conversation!
        </p>
      )}
    </div>
  );
}

export default Discussion;
