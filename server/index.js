const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
const DB_URL = "mongodb://127.0.0.1:27017/imageBuilder";
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
// DB SCHEMA
const Schema = mongoose.Schema;
const ComponentSchema = new Schema({
  title: String,
  path: String,
});
const ComponentModel = mongoose.model("components", ComponentSchema);

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../image-builder-client/images");
  },
  filename: (req, file, cb) => {
    console.log("STORAGE body", req.body);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/image", upload.single("file"), function (req, res) {
  console.log("API IMAGE STARTET");
  console.log("File", req.file);
  console.log("body", req.body);
  const oldPath = req.file.path;
  const newPath = req.file.path.replace(req.file.originalname);
  fs.renameSync(oldPath, newPath);
  ComponentModel.create(
    { title: req.body.title, path: newPath },
    function (err, instance) {
      if (err) {
        return handleError(err);
      }
    }
  );
  res.json({ message: "File got uploaded" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api/greet", function (req, res) {
  res.json({ message: "greetings" });
});
