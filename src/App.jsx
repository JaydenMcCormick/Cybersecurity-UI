import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Assignments from "./pages/Assignments";
import Grades from "./pages/Grades";
import Discussion from "./pages/Discussion";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/register";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Private Routes */}
        <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path="courses/:id" element={<PrivateRoute><CourseDetails /></PrivateRoute>} />
        <Route path="assignments" element={<PrivateRoute><Assignments /></PrivateRoute>} />
        <Route path="grades" element={<PrivateRoute><Grades /></PrivateRoute>} />
        <Route path="discussion" element={<PrivateRoute><Discussion /></PrivateRoute>} />
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
