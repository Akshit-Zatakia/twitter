const connectToDatabase = require("./config/database");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// cors configuration
var corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// authentication
const auth = require("./middleware/auth");

// middleware
app.use(express.json({ extended: false }));
app.use(cors(corsOption));

// database
connectToDatabase();

// -------------------- Routes ---------------------------- //

// Private
app.use("/api/cms/users", auth, require("./routes/cms/users"));
app.use("/api/cms/post", auth, require("./routes/cms/post"));
app.use("/api/cms/auth", auth, require("./routes/cms/auth"));

// Public
app.use("/api/o/users", require("./routes/o/users"));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
