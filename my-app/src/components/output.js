import React, { useState } from "react";

const Output = () => {
//***const [loading, setLoading] = useState(false);
const [question, setQuestion] = useState({ question: "" });
const [answer, setAnswer] = useState({ answer: "" });

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = new questionData();
    questionData.append("question", question);

    try {
      const response = await fetch("/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
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

      {answer && (
        <div>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Output;
