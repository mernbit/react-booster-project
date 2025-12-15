const app = require("./app/app");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connectDB = require("./db/db");
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});
