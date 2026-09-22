const Url = require("../models/url.model");

const isValidUrl = (value) => {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
};

const createShortUrl = async (req, res) => {
  try {
    // 1. Get original URL from request body
    const { originalUrl } = req.body;

    // 2. Validate input
    if (!originalUrl || !originalUrl.trim()) {
      return res.status(400).json({
        message: "Original URL is required"
      });
    }

    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({
        message: "Please provide a valid HTTP or HTTPS URL"
      });
    }

    // 3. Generate short code using Nanoid
    const { nanoid } = await import("nanoid");
    const shortCode = nanoid(6);

    // 4. Save URL in MongoDB
    const newUrl = await Url.create({
      originalUrl,
      shortCode
    });

    // 5. Return response
    res.status(201).json({
      message: "Short URL created successfully",
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `http://localhost:5000/${newUrl.shortCode}`
    });

  } catch (error) {
    console.error("Error creating short URL:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  try {
    // 1. Get short code from URL parameters
    const { shortCode } = req.params;

    // 2. Find URL document in MongoDB
    const url = await Url.findOne({ shortCode });

    // 3. Check if URL exists
    if (!url) {
      return res.status(404).json({
        message: "Short URL not found"
      });
    }

    // 4. Increment click count
    url.clicks += 1;
    await url.save();

    // 5. Redirect to original URL
    res.redirect(url.originalUrl);

  } catch (error) {
    console.error("Error redirecting URL:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl
};