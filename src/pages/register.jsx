import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // <-- Loading state
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: "student", // Force role to "student"
        }),
      });

      if (response.ok) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const errData = await response.json();
        setError(errData.detail || "Registration failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-white text-lg">Loading...</p>
        </div>
      )}

      {/* Main Register Form */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md z-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
          />
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={loading}
          />
          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={loading}
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}

          <button
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
            onClick={handleRegister}
            disabled={loading}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
