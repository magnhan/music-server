"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Music = require("./music");
const Ratings = require("./ratings");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit) || 10;
    const skip = Number(req.query.skip) || 0;
    try {
        const posts = yield Music.find({}, {
            _id: 0,
            name: 1,
            artists: 1,
            year: 1,
            duration_ms: 1,
            danceability: 1
        })
            .limit(limit)
            .skip(skip);
        return res.send(posts);
    }
    catch (error) {
        return res.send(error);
    }
}));
router.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search || "";
    const limit = Number(req.query.limit) || 10;
    const skip = Number(req.query.skip) || 0;
    let min = req.query.min || "1928";
    let max = req.query.max || "2020";
    let sortData;
    if (req.query.sort === "yearsASC") {
        sortData = { year: 1, name: 1 };
    }
    else if (req.query.sort === "yearsDESC") {
        sortData = { year: -1, name: 1 };
    }
    else if (req.query.sort === "titleDESC") {
        sortData = { name: 1, year: -1 };
    }
    else if (req.query.sort === "titleASC") {
        sortData = { name: -1, year: -1 };
    }
    try {
        const posts = yield Music.find({
            $or: [
                { year: { $regex: "^" + search, $options: "i" } },
                { name: { $regex: search, $options: "im" } },
                { artists: { $regex: search, $options: "im" } },
            ],
            $and: [{ year: { $gte: min, $lte: max } }],
        }, {
            _id: 1,
            name: 1,
            artists: 1,
            year: 1,
            duration_ms: 1,
            danceability: 1
        })
            .skip(skip)
            .limit(limit)
            .sort(sortData);
        res.send(posts);
    }
    catch (e) {
        res.send(e);
    }
}));
router.get("/rate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { userId: req.query.userId, songId: req.query.songId };
        console.log(filter);
        const update = { rating: req.query.rating };
        console.log(update);
        let doc = yield Ratings.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true,
        });
        doc.save();
        res.send(update);
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
}));
module.exports = router;
//# sourceMappingURL=routes.js.map