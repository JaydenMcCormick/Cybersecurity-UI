import React from "react";

function Dashboard() {
  const userName = localStorage.getItem("user_name") || "Student";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Welcome back, {userName}!</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border p-4 rounded-lg shadow text-center">
          <h3 className="font-bold text-xl">Courses</h3>
          <p>4 Active</p>
        </div>
        <div className="border p-4 rounded-lg shadow text-center">
          <h3 className="font-bold text-xl">Assignments</h3>
          <p>2 Due This Week</p>
        </div>
        <div className="border p-4 rounded-lg shadow text-center">
          <h3 className="font-bold text-xl">Grades</h3>
          <p>3 Updated</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Assignment submitted for CEN 4721</li>
          <li>New grade posted in COP 4710</li>
          <li>Discussion reply from Prof. Rose</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
