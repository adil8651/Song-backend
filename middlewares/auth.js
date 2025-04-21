import response from "../helper/response.js";
const auth = (req, res, next) => {
  console.log("Auth middleware triggered");
  console.log("Session ID:", req.sessionID);
  console.log("Is Authenticated?", req.isAuthenticated());
  console.log("User:", req.user);

  if (req.isAuthenticated()) {
    return next();
  }

  response(res, 401, false, "Unauthorized", null);
};

export default auth;
