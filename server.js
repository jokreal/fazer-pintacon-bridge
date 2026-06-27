const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const FAZER_TOKEN = process.env.FAZER_TOKEN;

app.get("/", (req, res) => {
  res.send("Fazer → Pintacon Bridge يعمل بنجاح");
});

app.get("/api/balance", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.fzr.cards/public/api/user",
      {
        headers: {
          Authorization: `Bearer ${FAZER_TOKEN}`
        }
      }
    );

    res.json(response.data);
  } catch (e) {
    res.status(500).json({
      error: e.response?.data || e.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Bridge Running...");
});

