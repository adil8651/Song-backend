import { addSong, getSongs, deleteSong } from "../controllers/song.js";
import express from "express";
import multer from "multer";
import auth from "../middlewares/auth.js";
const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = express.Router();
router.post(
  "/addSong",
  auth,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  addSong
);
router.get("/getSongs", getSongs);
router.delete("/deleteSong/:id", auth, deleteSong);
export default router;
