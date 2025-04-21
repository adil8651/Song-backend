import mongoose from "mongoose";
const songShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  audio: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Song", songShema);
