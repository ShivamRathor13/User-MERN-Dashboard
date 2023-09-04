const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const News = require("./../modals");

dotenv.config({ path: "./config.env" });

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
    console.log(con.connections);
    console.log("DB connection successful! 🤩");
  })
  .catch((err) => console.log(err));

const newsdata = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8"));
// console.log(newsdata);

const importData = async () => {
  try {
    await News.create(newsdata);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await News.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
// console.log(process.argv);
