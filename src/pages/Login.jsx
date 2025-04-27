import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_name", data.user_name || "Student");
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1200);
      } else {
        let errMessage = "Login failed.";
        try {
          const errData = await response.json();
          if (Array.isArray(errData)) {
            // If FastAPI validation error array
            errMessage = errData.map((e) => e.msg).join(", ");
          } else if (errData.detail) {
            // If FastAPI custom error object
            errMessage = errData.detail;
          }
        } catch (err) {
          errMessage = "Invalid server response.";
        }
        setError(errMessage);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-700">Loading...</p>
        </div>
      )}

      {/* Login */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md z-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          {error && (
            <div className="text-red-500 text-sm">
              {typeof error === "string"
                ? error
                : Array.isArray(error)
                ? error.map((e) => e.msg).join(", ")
                : JSON.stringify(error)}
            </div>
          )}
          {success && <div className="text-green-500 text-sm">{success}</div>}

          <button
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
