import React, { useState } from "react";

function Discussion() {
  const [posts, setPosts] = useState([
    { author: "Jeremy", content: "Can someone explain Question 3?" },
    { author: "Jordan", content: "Sure! I think it's related to binary trees." },
  ]);

  const [input, setInput] = useState("");

  const handlePost = () => {
    if (input.trim()) {
      setPosts([...posts, { author: "You", content: input }]);
      setInput("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Discussion Board</h2>
      <div className="space-y-3 mb-6">
        {posts.map((post, i) => (
          <div key={i} className="border rounded p-3 bg-white">
            <div className="font-bold">{post.author}</div>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      <textarea
        className="w-full border p-2 rounded"
        rows="3"
        placeholder="Write a reply..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
}

export default Discussion;


