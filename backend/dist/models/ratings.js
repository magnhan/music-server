"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RatingSchema = new mongoose_1.default.Schema({
    userId: String,
    songId: String,
    rating: String,
}, { collection: "MusicRatings" });
const Ratings = mongoose_1.default.model("MusicRatings", RatingSchema);
module.exports = Ratings;
//# sourceMappingURL=ratings.js.map