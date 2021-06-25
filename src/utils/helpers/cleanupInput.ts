export const restrictNumberWithinRange = (inputNumber: number, maxNumber: number, minNumber: number) => {
  if (inputNumber > maxNumber) {
    return maxNumber;
  }
  if (inputNumber < minNumber) {
    return minNumber;
  } else {
    return inputNumber;
  }
};
