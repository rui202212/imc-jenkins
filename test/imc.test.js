const request = require("supertest");
const app = require("../src/app");
const { calculateImc, interpretImc } = require("../src/imc");

describe("IMC Calculation", () => {
  describe("calculateImc function", () => {
    it("should calculate IMC correctly", () => {
      expect(calculateImc(70, 1.75)).toBeCloseTo(22.86);
      expect(calculateImc(70, 175)).toBeCloseTo(22.86); // test avec taille en cm
    });
  });

  describe("interpretImc function", () => {
    it('should return "Dénutrition !!" for IMC < 18.5', () => {
      expect(interpretImc(16)).toBe("Dénutrition !!");
    });

    it('should return "Normal." for 18.5 <= IMC < 25', () => {
      expect(interpretImc(20)).toBe("Normal.");
      expect(interpretImc(24.9)).toBe("Normal.");
    });

    it('should return "Surpoids." for 25 <= IMC < 30', () => {
      expect(interpretImc(26)).toBe("Surpoids.");
      expect(interpretImc(29.9)).toBe("Surpoids.");
    });

    it('should return "Obésité !!" for IMC >= 30', () => {
      expect(interpretImc(30)).toBe("Obésité !!");
      expect(interpretImc(35)).toBe("Obésité !!");
    });
  });

  describe("GET /imc", () => {
    it("should return 400 if weight or height is missing", async () => {
      const response = await request(app).get("/imc");
      expect(response.statusCode).toBe(400);
    });

    it("should return 400 if weight or height is not a number", async () => {
      const response = await request(app).get("/imc?weight=abc&height=170");
      expect(response.statusCode).toBe(400);
    });

    it("should return correct IMC and interpretation", async () => {
      const response = await request(app).get("/imc?weight=70&height=1.75");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("imc");
      expect(response.body).toHaveProperty("interpretation");
      expect(parseFloat(response.body.imc)).toBeCloseTo(22.86);
      expect(response.body.interpretation).toBe("Normal.");
    });

    it("should work with height in cm", async () => {
      const response = await request(app).get("/imc?weight=70&height=175");
      expect(response.statusCode).toBe(200);
      expect(parseFloat(response.body.imc)).toBeCloseTo(22.86);
    });
  });
});
// This code is a test suite for the IMC (Indice de Masse Corporelle) calculation functionality.
// It includes unit tests for the `calculateImc` and `interpretImc` functions, as well as integration tests for the `/imc` endpoint of the Express application.
