import React, { useState } from "react";

const Input = () => {
  const [email, setEmail] = useState({ email: "" });
  const [files, setSelectedFiles] = useState([]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {

        const formData = new FormData();
        formData.append("email", email);
        
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        fetch("http://localhost:8000/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
            console.log("Success:", result);
            })
            .catch((error) => {
            console.error("Error:", error);
            });
    }
    
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <form onSubmit={handleSubmit}>
 
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
          <input
          type="file"
          placeholder="Upload File"
          accept=".pdf, .doc, .docx, .txt, .mp4"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Input;
