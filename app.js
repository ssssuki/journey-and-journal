const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors"); // cors require

const db = require("./db/connection");

const indexRouter = require("./routes/index");
const user = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const searches = require("./routes/searches");
const likes = require("./routes/likes");

const app = express();

// cors middleware usage
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", user(db));
app.use("/api", posts(db));
app.use("/api", comments(db));
app.use("/api", likes(db));
app.use("/api", searches(db));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
