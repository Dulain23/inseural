import express from "express";

const router = express.Router();

const getRisk = async (req, res, next) => {
    const { gender, age, height, weight, children, smoker } = req.body;

    // Calculate BMI (Body Mass Index)
    const bmi = weight / ((height / 100) ** 2);

    // Start risk score
    let risk = 0;

    // 1. Age factor
    if (age <= 30) {
        risk += 1;  // Young, less risky
    } else if (age <= 45) {
        risk += 3;  // Mid-age, moderately risky
    } else if (age <= 60) {
        risk += 5;  // Older, more risky
    } else {
        risk += 7;  // Very old, high risk
    }

    // 2. BMI factor (according to WHO BMI categories)
    if (bmi < 18.5) {
        risk += 2;  // Underweight, slightly risky
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        risk += 1;  // Normal weight, lowest risk
    } else if (bmi >= 25 && bmi <= 29.9) {
        risk += 3;  // Overweight, moderate risk
    } else {
        risk += 5;  // Obese, higher risk
    }

    // 3. Gender factor
    if (gender === 'male') {
        risk += 1;  // Males might have a slightly higher base risk
    }

    // 4. Smoking factor
    if (smoker.toLowerCase() === 'yes') {
        risk += 2;  // Smoking increases risk significantly
    }

    // 5. Children factor
    if (children > 0) {
        risk += children * 0.5;  // Each child adds a small amount of risk
    }

    // Ensure risk is within bounds of 1 to 10
    risk = Math.round(Math.min(Math.max(risk, 1), 10)); // Clamp between 1 and 10 and round


    return res.status(200).json({ message: "Risk Evaluation Success - Score Obtained.", risk });
};

router.post('/risk', getRisk);

export default router;