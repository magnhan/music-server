import mongoose, { Schema } from "mongoose";

const MusicSchema: Schema = new mongoose.Schema(
  {
    _id: String,
    artists: String,
    danceability: String,
    duration_ms: String,
    name: String,
    year: String,
    rating: String
  },
  { collection: "MusicLibrary" }
);

const Music = mongoose.model("MusicLibrary", MusicSchema);
module.exports = Music;
