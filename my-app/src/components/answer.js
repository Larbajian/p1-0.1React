const data = await response.json();
setAnswer(data.answer);
Auth.generateToken(answer);