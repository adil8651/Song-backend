import response from "../helper/response";

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  response(res, 401, false, "Unauthorized", null);
};

export default auth;
