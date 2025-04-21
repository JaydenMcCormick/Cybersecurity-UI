import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";

function Discussion() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/posts/")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handlePost = async () => {
    const cleanContent = DOMPurify.sanitize(input);
    const newPost = {
      author: "You",
      content: cleanContent,
    };

    const response = await fetch("http://localhost:8000/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      const saved = await response.json();
      setPosts([...posts, saved]);
      setInput("");
    } else {
      console.error("Failed to post.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Discussion Board</h2>
      <div className="space-y-3 mb-6">
        {posts.map((post, i) => (
          <div key={post.id || i} className="border rounded p-3 bg-white">
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
