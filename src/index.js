const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const route = require("./routes/index");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
db.connectToDb();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

route(app);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running port ${PORT}`);
});
