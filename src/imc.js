function calculateImc(weight, height) {
  const heightInMeters = height > 10 ? height / 100 : height; // if height is in cm, convert to meters
  return weight / (heightInMeters * heightInMeters);
}

function interpretImc(imc) {
  if (imc < 18.5) {
    return "Dénutrition !!";
  } else if (imc < 25) {
    return "Normal.";
  } else if (imc < 30) {
    return "Surpoids.";
  } else {
    return "Obésité !!";
  }
}

module.exports = { calculateImc, interpretImc };
