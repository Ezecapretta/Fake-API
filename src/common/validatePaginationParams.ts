export const validatePaginationParams = (
  skip: any,
  take: any,
): { skip: number; take: number } => {
  const parsedSkip = +skip;
  const parsedTake = +take;

  console.log(parsedSkip, parsedTake);
  // Valida que skip y Take sean números
  if (isNaN(parsedSkip) || isNaN(parsedTake)) {
    throw new Error('Parameters "skip" and "Take" must be numbers');
  }

  // Valida que skip y Take sean enteros positivos
  if (!Number.isInteger(parsedSkip) || !Number.isInteger(parsedTake)) {
    throw new Error('Parameters "skip" and "Take" must be positive integers');
  }

  return { skip: parsedSkip, take: parsedTake };
};
