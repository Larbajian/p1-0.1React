import React, { useState } from "react";
import Auth from "../utils/auth";
//import Input from "./input";

const Output = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({ question: "" });
  const [answer, setAnswer] = useState({ answer: "" });

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(question);

    /*
     emailTokenValidity = Auth.isTokenExpired(emailToken);
    if (emailTokenValidity) {
        console.log("Token expired");
    } 
    if (!emailTokenValidity) {
    console.log("Token valid"); 
    } 
    */

    const questionData = new questionData();
    questionData.append("question", question);
    questionToken = Auth.generateToken(
      { email, questionId: question.id },
      "2h"
    );
    console.log(questionToken);

    try {
      setLoading(true);
      const response = await fetch("/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question }),
      });
      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        setAnswer(data.answer);
        answerToken = Auth.generateToken({ email, answerId: answer.id }, "2h");
        console.log(answerToken);
      }
      setQuestion("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Uploads Successful!</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask your question here"
              value={question}
              onChange={handleQuestionChange}
            />
            <button type="submit">Ask</button>
          </form>
        </div>
      )}

      {loading ? (
        <div> Loading Answer... </div>
      ) : (
        <div>
          {answer && (
            <div>
              <h3>Answer:</h3>
              <p>{answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Output;
