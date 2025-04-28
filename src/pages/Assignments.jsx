import React, { useState } from "react";

function Assignments() {
  const [expanded, setExpanded] = useState(null);
  const [files, setFiles] = useState({});
  const [messages, setMessages] = useState({});

  const assignments = [
    { id: 1, title: "Project Proposal", course: "CEN 4721", due: "April 25th 2025" },
    { id: 2, title: "SQL Query Lab", course: "COP 3710", due: "April 29th 2025" },
    { id: 3, title: "Assignment #5", course: "CEN 4610", due: "May 2nd 2025" },
    { id: 4, title: "Final project Assign.", course: "CEN 4710", due: "May 10th 2025" },
  ];

  const handleFileChange = (e, id) => {
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    let errorMessages = [];

    if (selectedFiles.length > 3) {
      errorMessages.push("You can only upload up to 3 files.");
    }

    selectedFiles.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        errorMessages.push(`${file.name} has an unsupported file type.`);
      } else if (file.size > maxFileSize) {
        errorMessages.push(`${file.name} exceeds the 5MB size limit.`);
      } else {
        validFiles.push(file);
      }
    });

    if (errorMessages.length > 0) {
      setMessages((prev) => ({ ...prev, [id]: errorMessages.join(" ") }));
    } else {
      setMessages((prev) => ({ ...prev, [id]: "" }));
    }

    setFiles((prev) => ({ ...prev, [id]: validFiles }));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    if (!files[id] || files[id].length === 0) {
      setMessages((prev) => ({ ...prev, [id]: "Please select at least one valid file." }));
      return;
    }

    try {
      const uploadResults = await Promise.all(
        files[id].map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("assignment_id", id);

          const response = await fetch("http://localhost:8000/upload/", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Upload failed for ${file.name}`);
          }

          return await response.json();
        })
      );

      const uploadedNames = uploadResults.map((res) => res.original_filename).join(", ");
      setMessages((prev) => ({ ...prev, [id]: `Uploaded: ${uploadedNames}` }));
      setFiles((prev) => ({ ...prev, [id]: [] }));
    } catch (err) {
      console.error("Upload error:", err);
      setMessages((prev) => ({ ...prev, [id]: "Upload failed. Please try again." }));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      <ul className="space-y-4">
        {assignments.map((item) => (
          <li key={item.id} className="border rounded shadow-sm bg-white p-4">
            <div className="cursor-pointer" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.course}</div>
                  <div className="text-sm text-red-500">Due: {item.due}</div>
                </div>
                <button className="text-sm text-blue-600 underline">
                  {expanded === item.id ? "Hide" : "Upload Assignment"}
                </button>
              </div>
            </div>

            {expanded === item.id && (
              <form onSubmit={(e) => handleSubmit(e, item.id)} className="mt-4 space-y-3">
                <input
                  type="file"
                  accept=".doc,.docx"
                  multiple
                  onChange={(e) => handleFileChange(e, item.id)}
                  className="w-full border px-3 py-2 rounded"
                />

                {files[item.id]?.length > 0 && (
                  <ul className="text-sm text-green-600 list-disc list-inside">
                    {files[item.id].map((file, i) => (
                      <li key={i}>{file.name}</li>
                    ))}
                  </ul>
                )}

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>

                {messages[item.id] && (
                  <p className={`text-sm mt-1 ${messages[item.id].startsWith("Uploaded") ? "text-blue-700" : "text-red-600"}`}>
                    {messages[item.id]}
                  </p>
                )}
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assignments;
