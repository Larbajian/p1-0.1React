import decode from 'jwt-decode';
import jwt from "jsonwebtoken";

class AuthService {
constructor() {
    this.secretKey = "uploadsecret";
}
//generateToken(payload, expiresIn): Generates a JWT token by signing the provided payload using the secret key and setting an expiration time.
generateToken(payload, expiresIn) {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      //decoded exp is in sec and date.now in mili sec so
      //date.now must be / by 1000 to compare correct timing
      localStorage.removeItem("id_token");
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }
//This method is an example implementation of user authentication. It takes a username and password as input parameters. Inside the method, it checks if the provided credentials are valid
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

export default new AuthService();
