const jwt = require('jsonwebtoken');

const secret = "uploadsecret";
const expiration = "2h";

module.exports = {
    signEmailToken: function({email}) {
        const payload = {email};
        return jwt.sign ({data: payload}, secret, {expiresIn: expiration});
    },
    signFileToken: function({email, fileId}) {
        const payload = {email, fileId};
        return jwt.sign ({ data: payload}, secret, {expiresIn: expiration});
    },
    signQuestionToken: function({email, QuestionId}) {
        const payload = {email, QuestionId};
        return jwt.sign ({ data: payload}, secret, {expiresIn: expiration});
    },
    signAnswerToken: function({email, AnswerId}) {
        const payload = {email, AnswerId};
        return jwt.sign ({ data: payload}, secret, {expiresIn: expiration});
    }

}