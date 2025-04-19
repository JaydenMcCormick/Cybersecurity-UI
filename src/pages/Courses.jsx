import React from "react";
import { Link } from "react-router-dom";

function Courses() {
  const courses = [
    { name: "Human Computer Interaction", code: "CEN 4721" },
    { name: "Database Systems", code: "COP 4710" },
    { name: "Operating Systems", code: "COP 4610" },
    { name: "Intro to Data Engineering", code: "COP 3710" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold">{course.name}</h3>
            <p className="text-sm text-gray-600">{course.code}</p>
            <Link
              to={`/courses/${course.id}`}
              className="mt-2 inline-block px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;

