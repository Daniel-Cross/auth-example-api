require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());
app.use(cors());

const userRouter = require("./route/user");
app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
