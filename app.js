import express from "express";
import response from "./helper/response.js";
import passport from "passport";
import { hashPassword, comparePassword } from "./helper/bcrypt.js";
import User from "./models/user.modal.js";

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return response(res, 401, false, info?.message || "Login failed");

    req.login(user, (err) => {
      if (err) return next(err);
      return response(res, 200, true, "Login successful", user);
    });
  })(req, res, next);
});
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    return response(res, 200, true, "Logout successful");
  });
});
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  return response(res, 201, true, "User created", user);
});
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return response(res, 200, true, "Authenticated user", req.user);
  } else {
    return response(res, 401, false, "Not logged in");
  }
});

export default router;
