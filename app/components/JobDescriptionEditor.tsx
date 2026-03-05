"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // ✅ Quill 2.x CSS

// 🔹 Dynamic import to disable SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

let Quill: any;

// Only load Quill modules in browser
if (typeof window !== "undefined") {
  Quill = require("react-quill-new").Quill;
  const ImageResize = require("quill-image-resize-module-react").default;
  Quill.register("modules/imageResize", ImageResize);
}

interface JobDescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionEditor({
  value,
  onChange,
}: JobDescriptionEditorProps) {
  // Quill modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    imageResize: {}, // enable image resize
  };

  // Allowed formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    //"bullet",
    "link",
    "image",
  ];

  return (
    <div className="job-description-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write job description here..."
      />
    </div>
  );
}
