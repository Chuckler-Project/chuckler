const express = require("express");
const WebSocket = require("ws");
const path = require("path");
const http = require("http");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const PORT = process.env.PORT;
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const crypto = require("crypto");
const sharp = require("sharp");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const jwt = require("jsonwebtoken");
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
// s3.config.credentials({"region":bucketRegion})
// Routers
const jokeRouter = require("./routes/jokeRouter");
const userRouter = require("./routes/userRouter");
const matchRouter = require("./routes/matchRouter");
const websocketRouter = require("./routes/websocketsRouter");
const db = require("../db/db");

// create the express server
const app = express();
const server = http.createServer(app);

// parse incoming json
app.use(express.json());
app.use(cookieParser());
// serve static files from the build file
app.use(express.static("build"));

// routers
app.use("/api/user", userRouter);

app.use("/api/joke", jokeRouter);

app.use("/api/match", matchRouter);

app.post("/api/posts", upload.single("image"), async (req, res) => {
  const { id } = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  console.log("req.file", req.file);
  const imageName = randomImageName();
  const buffer = await sharp(req.file.buffer).resize(400, 500).toBuffer(); // resizes picture
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);
  await db.query("UPDATE users SET user_picture = $1 WHERE id=$2", [
    imageName,
    id,
  ]);
  return res.status(200).send({});
});
app.get("/api/posts", async (req, res) => {
  const { id } = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const pictureResult = await db.query(
    "SELECT user_picture from users where id=$1",
    [id]
  );
  const picture = pictureResult.rows[0]["user_picture"];
  console.log(picture);
  const getObjectParams = {
    Bucket: bucketName,
    Key: picture,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  console.log(url);
  res.status(200).send(url);
});

// catch-all route handler
app.use((req, res) => {
  res.status(404).send("!!Page not found!!");
});

// global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// set up the server to handle websocket connections
const wss = new WebSocket.WebSocketServer({ server });

wss.on("connection", (socket, request) => {
  websocketRouter(socket, request, wss);
});

// set up the server to listen for http requests
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
module.exports = app;
