import mongoose, { Schema, Document, Mongoose } from "mongoose";

const RatingSchema: Schema = new mongoose.Schema(
  {
    userId: String,
    songId: String,
    rating: String,
  },
  { collection: "MusicRatings" }
);

const Ratings = mongoose.model("MusicRatings", RatingSchema);
module.exports = Ratings;
