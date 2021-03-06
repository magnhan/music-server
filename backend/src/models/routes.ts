const Music = require("./music");
const Ratings = require("./ratings");
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
const router = express.Router();

router.get("/", async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const skip = Number(req.query.skip) || 0;

  try {
    const posts = await Music.find(
      {},
      {
        _id: 0,
        name: 1,
        artists: 1,
        year: 1,
        duration_ms: 1,
        danceability: 1
      }
    )
      .limit(limit)
      .skip(skip);
    return res.send(posts);
  } 
  catch (error) {
    return res.send(error);
  }
});

router.get("/posts", async (req, res) => {
  const search = req.query.search || "";
  const limit = Number(req.query.limit) || 10;
  const skip = Number(req.query.skip) || 0;

  let min = req.query.min || "1928";
  let max = req.query.max || "2020";

  let sortData;
  if (req.query.sort === "yearsASC") {
    sortData = { year: 1, name: 1, _id: 1 };
  } else if (req.query.sort === "yearsDESC") {
    sortData = { year: -1, name: 1, _id: 1 };
  } else if (req.query.sort === "titleDESC") {
    sortData = { name: -1, year: -1, _id: 1 };
  } else if (req.query.sort === "titleASC") {
    sortData = { name: 1, year: -1, _id: 1 };
  }
  try {
    const posts = await Music.find(
      {
        $or: [
          { year: { $regex: "^" + search, $options: "i" } },
          { name: { $regex: search, $options: "im" } },
          { artists: { $regex: search, $options: "im" } },
        ],
        $and: [{ year: { $gte: min, $lte: max } }],
      },
      {
        _id: 1,
        name: 1,
        artists: 1,
        year: 1,
        duration_ms: 1,
        danceability: 1
      }
    )
      .skip(skip)
      .limit(limit)
      .sort(sortData);
    res.send(posts);
  } catch (e) {
    res.send(e);
  }
});

router.get("/rate", async (req, res) => {
  try {
    const filter = { userId: req.query.userId, songId: req.query.songId };
    console.log(filter);
    const update = { rating: req.query.rating };
    console.log(update);
    let doc = await Ratings.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    doc.save();
    res.send(update);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});
module.exports = router;
