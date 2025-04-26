// src/pages/Profile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

function Profile() {
  const [profile, setProfile] = useState({
    name: localStorage.getItem("user_name") || "Student",
    email: "jadyen1811@eagle.fgcu.edu",
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="space-y-4 max-w-sm">
        <label className="block">
          <span className="text-sm">Full Name</span>
          <input
            type="text"
            value={profile.name}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
          />
        </label>

        <label className="block">
          <span className="text-sm">Email</span>
          <input
            type="email"
            value={profile.email}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />
        </label>

        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Changes
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
