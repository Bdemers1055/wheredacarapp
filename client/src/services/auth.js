const auth = {
  isAuthenticated() {
    return true;
  },
  login(email, password) {
    console.log("signing in");
  },
  signout() {
    console.log("signing out");
  },
  signup(email, password) {
    console.log("signing up");
  },
  getUserInfo() {
    console.log("user information");
  },
  getToken() {
    console.log("token things");
  }
};

export default auth;
