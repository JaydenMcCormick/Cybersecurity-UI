import React from "react";
import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  // dummy course data (in real case, you'd fetch using the id)
  const course = {
    name: "Dummy Course Name",
    description: "This is a placeholder for course ID " + id,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{course.name}</h2>
      <p>{course.description}</p>
      <p className="text-sm mt-2 text-gray-500">Course ID: {id}</p>
    </div>
  );
}

export default CourseDetails;
