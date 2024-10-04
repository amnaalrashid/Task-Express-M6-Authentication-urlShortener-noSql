const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./database");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const path = require("path");
const passport = require("passport");
const { localStrategy, JwtStrategy } = require("./middlewares/passport");

//init

dotenv.config();
connectDb();
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", JwtStrategy);
//routes
app.use("/api/urls", urlRoutes);
app.use("/api/auth", userRoutes);
app.use(userRoutes);

//notFoundHAndler
app.use(notFoundHandler);

//errorHandler
app.use(errorHandler);

//starting
app.listen(3000, () => {
  console.log("The application is running on localhost: 3000");
});

// Example of a protected route
app.get(
  "/protected-route",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  }
);
