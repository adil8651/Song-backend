import response from "../helper/response.js";
import Song from "../models/song.modal.js";
import { uploadFileToS3, deleteFileFromS3 } from "../helper/uploadToS3.js";

const addSong = async (req, res) => {
  try {
    const { name, artist, album, year, duration, language, genre } = req.body;

    const audioFile = req.files?.audio?.[0];
    const imageFile = req.files?.image?.[0];

    const audio = audioFile ? await uploadFileToS3(audioFile, "audio") : null;
    const image = imageFile ? await uploadFileToS3(imageFile, "images") : null;

    const newSong = new Song({
      name,
      artist,
      album,
      year,
      duration,
      language,
      genre: Array.isArray(genre) ? genre : [genre],
      audio,
      image,
    });

    await newSong.save();
    return response(res, 201, true, "Song saved with S3 files", newSong);
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return response(res, 500, false, "Upload failed", error);
  }
};
const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    return response(res, 200, true, "Songs fetched successfully", songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return response(res, 500, false, "Failed to fetch songs", error);
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (!song) {
      return response(res, 404, false, "Song not found", null);
    }
    if (song.audio) {
      await deleteFileFromS3(song.audio);
    }
    if (song.image) {
      await deleteFileFromS3(song.image);
    }
    await Song.findByIdAndDelete(id);
    return response(res, 200, true, "Song deleted successfully", null);
  } catch (error) {
    console.error("Error deleting song:", error);
    return response(res, 500, false, "Failed to delete song", error);
  }
};

export { addSong, getSongs, deleteSong };
