interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExercises: number[], target: number): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(day => day > 0).length;
  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average < target * 0.5) {
    rating = 1;
    ratingDescription = 'You need to work harder';
  }
  else if (average < target) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  }
  else {
    rating = 3;
    ratingDescription = 'Great job, you met your target!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));