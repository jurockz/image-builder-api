const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");

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
    cb(null, "../client/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ dest: "../client/images" });

app.post("/api/image", upload.single("file"), function (req, res) {
  console.log("API IMAGE STARTET");
  console.log("File", req.file);
  console.log("body", req.body);
  ComponentModel.create(
    { title: req.body.title, path: "/.../image" },
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
