const connectToDatabase = require("./config/database");

const app = require("express")();
require("dotenv").config();

// database
connectToDatabase();

// -------------------- Routes ---------------------------- //

// Private

// Public
app.use("/api/o/users", require("./routes/o/users"));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
