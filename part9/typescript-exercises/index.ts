import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target)) ||
      daily_exercises.some(day => isNaN(Number(day)))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const result = calculateExercises(daily_exercises.map(Number), Number(target));
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
