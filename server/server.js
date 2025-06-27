import express from "express"; // similar with springboot
import cors from "cors"; // frontend access backend
import dotenv from "dotenv";
import multer from "multer"; // Import multer, storing files from users
import chat from "./chat.js";

dotenv.config() // use the content in .env

const app = express();

app.use(cors());

// configure multer
const storage = multer.diskStorage({
    destination: function (req, File, cb) {
        cb(null, "uploads/")
    },

    filename: function (req, file, cb) {
        cb(null, "nextAI" + file.originalname);
    },
})

const upload = multer({
    storage: storage
})

const PORT = 5001;

let filePath;

// Considering you want to use RESTFul or GraphQL
// RESTFUL: - what does the API do? you should be able to describe it in one sentence.
// GET/POST/DELETE/PATCH
// status code： 200,401,404,500
// input payload? param?
// output

// POST /upload
app.post("/upload", upload.single("file"), (req, res) => {

    filePath = req.file.path;
    res.send(filePath + "upload sucessfully.");
});


// GET /chat
app.get("/chat", async (req, res) => {
    const resp = await chat(req.query.question, filePath);
    res.send(resp.text);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})