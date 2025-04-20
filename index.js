import express from "express";
import router from "./app.js";
import cors from "cors";
import connectDB from "./config/db.js";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import initialize from "./config/passport.js";

dotenv.config();
const app = express();
const port = 3000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initialize(passport);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
