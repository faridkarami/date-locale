import { gregorianToPersianDate } from '../src';

describe('gregorianToPersian', () => {
  it('should convert 1992-10-24 to 1371-08-02', () => {
    expect(gregorianToPersianDate('1992-10-24')).toBe('1371-08-02');
  });
});
