import React, { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Jadyen Hose",
    email: "jadyen1811@eagle.fgcu.edu",
  });

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
      </div>
    </div>
  );
}

export default Profile;







  