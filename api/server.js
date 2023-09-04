const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const News = require("./modals");
const newsRouter = require("./newsRoutes");
// const compression = require("compression");

dotenv.config({ path: "./config.env" });
const app = express();
// app.use(compression());
app.use(express.json());

app.use(cors());

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection successful! 🤩");
  })
  .catch((err) => console.log(err));

// app.use(express.static(`${__dirname}/public`));

// Routing
app.use("/news", newsRouter);

// Server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
