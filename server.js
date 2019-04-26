const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const config = require('./config/database');
const bodyParser = require('body-parser');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: false
}))

// connect to mongoose
mongoose.connect(config.database, {
  useNewUrlParser: true
});
let db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to mongoose'));


const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// authors route
const authorRouter = require('./routes/authors');
app.use('/authors', authorRouter);

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));