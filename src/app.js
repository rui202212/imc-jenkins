const express = require("express");
const { calculateImc, interpretImc } = require("./imc");

const app = express();
app.use(express.json());

app.get("/imc", (req, res) => {
  const { weight, height } = req.query;

  if (!weight || !height) {
    return res
      .status(400)
      .json({ error: "Les paramètres weight et height sont requis" });
  }

  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);

  if (isNaN(weightNum)) {
    return res.status(400).json({ error: "Le poids doit être un nombre" });
  }

  if (isNaN(heightNum)) {
    return res.status(400).json({ error: "La taille doit être un nombre" });
  }

  if (weightNum <= 0 || heightNum <= 0) {
    return res
      .status(400)
      .json({ error: "Le poids et la taille doivent être positifs" });
  }

  const imc = calculateImc(weightNum, heightNum);
  const interpretation = interpretImc(imc);

  res.json({
    imc: imc.toFixed(2),
    interpretation,
  });
});

module.exports = app;
