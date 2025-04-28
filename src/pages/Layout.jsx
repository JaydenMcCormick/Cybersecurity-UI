import React from "react";
import { NavLink, Outlet } from "react-router-dom";


function Layout() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md shadow-sm text-white font-medium ${
      isActive ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"
    }`;

 return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Top Navigation */}
      <header className="bg-blue-600 text-white shadow">
  <div className="w-full flex flex-col items-center py-6 px-4">
    <h1 className="text-4xl font-extrabold mb-4 text-center">Student Canvas</h1>
    <nav className="flex flex-wrap justify-center gap-3 text-sm">
      <NavLink to="/" className={linkClass}><strong>{`{Dashboard}`}</strong></NavLink>
      <NavLink to="/courses" className={linkClass}><strong>{`{Courses}`}</strong></NavLink>
      <NavLink to="/assignments" className={linkClass}><strong>{`{Assignments}`}</strong></NavLink>
      <NavLink to="/grades" className={linkClass}><strong>{`{Grades}`}</strong></NavLink>
      <NavLink to="/discussion" className={linkClass}><strong>{`{Discussion}`}</strong></NavLink>
      <NavLink to="/profile" className={linkClass}><strong>{`{Profile}`}</strong></NavLink>
      <NavLink to="/login" className={linkClass}><strong>{`{Login}`}</strong></NavLink>
      <NavLink to="/register" className={linkClass}><strong>{`{Register}`}</strong></NavLink>
    </nav>
  </div>
</header>

 {/* Page Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white p-6 rounded shadow">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;







