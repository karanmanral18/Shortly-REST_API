const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
// const config = require("../config/db");
// const base = "http://localhost:5000";
const base = "https://shortly86505.herokuapp.com";
const Url = require("../models/Url");

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post("/shorten", async (req, res) => {
  console.log("[Inside post start]");

  const { longUrl } = req.body;
  // const baseUrl = config.get("baseURL");
  const baseUrl = base;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      console.log("[Inside post server error]");
      res.status(500).json("Server error");
    }
  } else {
    console.log("[Inside post invalid long url]");
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;
