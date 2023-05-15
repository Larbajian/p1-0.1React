import React, { useState } from "react";
import Auth from "../utils/auth";
import Output from "./output";

const Input = () => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    files: [],
  });

  const { email, files } = formState;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      if (files.length > 0) {
        setLoading(true);
        const formData = new FormData();
        formData.append("email", email);
        const emailToken = Auth.generateToken({ email }, "2h");
        console.log(emailToken);

        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
          const docToken = Auth.generateToken(
            { email, fileId: files[i].id },
            "2h"
          );
          console.log(docToken);
        }
        await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("Success:", result);
          });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setFormState({
      email: "",
      files: [],
    });
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="file"
          placeholder="Upload File"
          value={files}
          accept=".pdf, .doc, .docx, .txt, .mp4"
          onChange={handleChange}
        />
        <button type="submit">Upload</button>
        {loading ? <div>Uploading!</div> : <Output />}
      </form>
    </div>
  );
};

export default Input;
