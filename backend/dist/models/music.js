"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MusicSchema = new mongoose_1.default.Schema({
    _id: String,
    artists: String,
    danceability: String,
    duration_ms: String,
    name: String,
    year: String,
    rating: String
}, { collection: "MusicLibrary" });
const Music = mongoose_1.default.model("MusicLibrary", MusicSchema);
module.exports = Music;
//# sourceMappingURL=music.js.map