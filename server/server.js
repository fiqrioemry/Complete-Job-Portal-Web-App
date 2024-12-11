const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const services = require("./route");
const { default: mongoose } = require("mongoose");

// env configuration
dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const BASE_CLIENT_URL = process.env.BASE_CLIENT_URL;

// database configuration
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((e) => console.log(e));

//   support configuration
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: BASE_CLIENT_URL,
    credentials: true,
    methods: ["POST", "PUT", "DELETE", "GET"],
    allowedHeaders: ["content-type", "headers"],
  })
);

// route configuration
app.use("/api/auth", services.AuthRoute);
app.use("/api/seeker", services.SeekerRouter);

app.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
