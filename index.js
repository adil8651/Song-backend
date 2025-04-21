import express from "express";
import router from "./app.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import session from "express-session";
import passport from "passport";
import initialize from "./config/passport.js";
import songRoute from "./routes/song.route.js";

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
    secret: "your-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "None",
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", router);
app.use("/api/v1/song", songRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
