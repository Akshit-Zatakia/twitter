const connectToDatabase = require("./config/database");
const express = require("express");
const app = express();
require("dotenv").config();

// authentication
const auth = require("./middleware/auth");

// middleware
app.use(express.json({ extended: false }));

// database
connectToDatabase();

// -------------------- Routes ---------------------------- //

// Private
app.use("/api/cms/users", auth, require("./routes/cms/users"));

// Public
app.use("/api/o/users", require("./routes/o/users"));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
