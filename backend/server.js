const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());

app.get("/api-key", (req, res) => {
  const apiKey = process.env.API_KEY;
  res.json({ apiKey });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(process.env.API_KEY);
});
