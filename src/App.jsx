// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails"; // <- dynamic course page
import Assignments from "./pages/Assignments";
import Grades from "./pages/Grades";
import Discussion from "./pages/Discussion";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetails />} /> {/* dynamic route */}
        <Route path="assignments" element={<Assignments />} />
        <Route path="grades" element={<Grades />} />
        <Route path="discussion" element={<Discussion />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
