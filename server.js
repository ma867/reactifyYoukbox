// /server.js
require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
// const Link = require("./models/link");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json()); // req.body
app.use((req, res, next) => {
  res.locals.data = {};
  next();
});
app.use(logger("dev"));
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// app.use("/api/links", require("./routes/api/links"));

app.use(require("./config/checkToken"));
/*
app.use('/api', routes) <====== Finish code once you got it
*/
app.use("/api/users", require("./routes/api/users"));
app.use("/api/songs", require("./routes/api/songs"))
app.use("/api/playlists", require("./routes/api/playlists"))

// app.get('/api/test', (req,res)=>{
//     res.send("working")
// })

app.listen(PORT, () => {
  console.log(`I am listening on ${PORT}`);
});
