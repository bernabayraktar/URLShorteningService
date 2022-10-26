const express = require("express");
const validUrl = require("valid-url");
const shortId = require("shortid");
const Url = require("./Url");
require("dotenv/config");
const ShortUniqueId = require('short-unique-id');
const router = express.Router();
 
 
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = "http://localhost:5000";
 

  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json({ message: "Invalid base url" });
  }
 
 
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        console.log("Already exists...");
        return res.status(201).json({ data: url });
      } else {
        // create url code
        const uid = new ShortUniqueId({ length: 6 });
        let urlCode = uid();
        let shortUrl = baseUrl + "/" + urlCode;
 
        url = new Url({
          longUrl,
          shortUrl,
          urlCode
        });
 
        console.log("Saving new record...");
        await url.save();
        return res.status(201).json({ data: url });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Some error has occurred" });
    }
  } else {
    return res.status(400).json({ message: "Invalid long url" });
  }
});


router.post("/customshorten", async (req, res) => {
  const { longUrl } = req.body;
  const { customUrl } = req.body;
  const baseUrl = "http://localhost:5000";
 
 
  

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        console.log("Already exists...");
        return res.status(201).json({ data: url });
      } else {
        
        let urlCode = customUrl;
        let shortUrl = baseUrl + "/" + urlCode;
 
        url = new Url({
          longUrl,
          shortUrl,
          urlCode
        });
 
        console.log("Saving new record...");
        await url.save();
        return res.status(201).json({ data: url });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Some error has occurred" });
    }
  } else {
    return res.status(400).json({ message: "Invalid long url" });
  }
});



 
// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
 
    if (url) {
      console.log("Long url found for short url. Redirecting...");
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ message: "No url found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Some error has occurred" });
  }
});
 
module.exports = router;