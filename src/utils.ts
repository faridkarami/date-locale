export const constants = {
  daysInMonth: {
    gregorian: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    persian: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
  },
};

export const separator = (dateString: string): number[] => {
  const symbols = ['-', '/'];
  const splitter = symbols.find((item) => dateString.includes(item)) || '';
  return dateString.split(splitter).map(Number);
};

export const format = (input: number): string =>
  input.toString().padStart(2, '0');

export const div = (a: number, b: number): number => Math.floor(a / b);

export const remainder = (a: number, b: number): number => a - div(a, b) * b;
