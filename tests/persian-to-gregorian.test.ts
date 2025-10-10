import { persianToGregorianDate } from '../src';

describe('persianToGregorian', () => {
  it('should convert 1371-08-02 to 1992-10-24', () => {
    expect(persianToGregorianDate('1371-08-02')).toBe('1992-10-24');
  });
});
