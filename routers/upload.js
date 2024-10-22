const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

router.post("/upload", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ mes: "No file were uploaded" });

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTemp(file.tempFilePath);
      return res.status(400).json({ mes: "size is up to 1MB" });
    }
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTemp(file.tempFilePath);
      return res.status(400).json({ mes: "File formate is incorrect" });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;
        removeTemp(file.tempFilePath);
        res.json({ public_id: result.publib_id, url: result.secure_url });
      }
    );
  } catch (err) {
    res.status(500).json({ mes: err.message });
  }
});

router.post("/destory", (req, res) => {
  try {
    const { publib_id } = req.body;
    if (!public_id) return res.status(400).json({ mes: "No image selected" });
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if(err) throw err

        res.json({mes:"Image Delete successfully!"})
    });
  } catch (err) {
    return res.status(500).json({ mes: err.message });
  }
});

removeTemp = (path) => {
  fs.ulink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
