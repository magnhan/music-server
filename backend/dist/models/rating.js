"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RatingSchema = new mongoose_1.default.Schema({
    _id: String,
    rating: String
}, { collection: "MusicLibrary" });
const Rating = mongoose_1.default.model("MusicLibrary", RatingSchema);
module.exports = Rating;
//# sourceMappingURL=rating.js.map