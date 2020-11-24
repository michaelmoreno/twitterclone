require("dotenv").config();
const express = require("express");
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
// const session = require("express-session");
// const methodOverride = require("method-override");
/////////////////////////////////////////////////////
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const methodOverride = require("method-override");
mongoose.Promise = global.Promise;

// app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());

const corsOptions = {
  origin: "https://twittrrr.herokuapp.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// };

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const tweetsController = require("./controllers/tweets.js");
app.use("/tweets", tweetsController);

const usersController = require("./controllers/users.js");
app.use("/users", usersController);
///
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});
mongoose.connection.on("disconnected", () => {
  console.log("disconnected");
});

app.listen(PORT, () => {
  console.log("Listening on", PORT);
});
