const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const urlsRoute = require("./src/routes/urls");
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5174",
  })
);

app.use("/users", userRoutes);
app.use("/", urlsRoute);

app.get("/test", (req, res) => {
  return res.json("server run");
});

app.listen(3000);
