const utils = {
  div(a: number, b: number): number {
    return Math.floor(a / b);
  },
  remainder(a: number, b: number): number {
    return a - this.div(a, b) * b;
  },
  fixer(digit: number): string {
    return `0${digit}`.slice(-2);
  },
};

export default utils;
