import React from "react";

function Grades() {
  const grades = [
    { course: "CEN 4721", grade: "92%" },
    { course: "COP 4710", grade: "87%" },
    { course: "COP 4610", grade: "90%" },
    { course: "COP 3710", grade: "80%" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Grades</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Course</th>
            <th className="p-2 text-left">Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{item.course}</td>
              <td className="p-2 font-semibold">{item.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grades;







  