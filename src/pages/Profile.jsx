import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setProfile({
            name: data.name,
            email: data.email,
          });
        } else {
          setError("Failed to load profile.");
        }
      } catch (error) {
        setError("An error occurred loading profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        const updatedData = await response.json();
        localStorage.setItem("user_name", updatedData.name); // <-- Update localStorage immediately
        setSuccess("Profile updated successfully!");
      } else {
        const errData = await response.json();
        setError(errData.detail || "Failed to update profile.");
      }
    } catch (error) {
      setError("An error occurred saving profile.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-700">Loading Profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>

      <input
        type="text"
        className="w-full border p-2 rounded"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <input
        type="email"
        className="w-full border p-2 rounded"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">{success}</div>}

      <button
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        onClick={handleSave}
      >
        Save Changes
      </button>

      <button
        className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700 mt-4"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
