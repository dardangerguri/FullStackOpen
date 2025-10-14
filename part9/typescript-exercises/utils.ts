export const isNotNumber = (value: any): boolean => {
  return isNaN(Number(value));
}

export const parseBmiArgs = (args: string[]): { height: number, weight: number } => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNotNumber(height) || isNotNumber(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  return { height, weight };
}

export const parseExerciseArgs = (args: string[]): { target: number, dailyExercises: number[] } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyExercises = args.slice(3).map(arg => Number(arg));

  if (isNotNumber(target) || dailyExercises.some(isNotNumber)) {
    throw new Error('Provided values were not numbers!');
  }

  return { target, dailyExercises };
}

export const logError = (error: unknown): void => {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.error(errorMessage);
  return;
}
