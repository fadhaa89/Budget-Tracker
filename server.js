const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const redText = '\x1b[31m%s\x1b[0m';
require('dotenv').config();

const PORT = process.env.PORT || 3001;
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget";
const MONGODB_ENDPOINT =
  process.env.MONGODB_ENDPOINT ||
  console.log(redText, 'You must have a Mongo Database endpoint.');

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_ENDPOINT, {
  useNewUrlParser: true,
  useFindAndModify: false ,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () =>
  console.log('Connected to MongoDB Endpoint')
);
mongoose.connection.on('error', (err) =>
  console.log(redText, `Mongoose default connection error: ${err}`)
);
// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});