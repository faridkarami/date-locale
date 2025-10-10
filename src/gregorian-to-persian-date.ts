import { constants, separator, format, div, remainder } from './utils';

export const gregorianToPersianDate = (dateString: string): string => {
  const [y, m, d] = separator(dateString);
  let gregorianDayNo =
    365 * (y - 1600) +
    div(y - 1600 + 3, 4) -
    div(y - 1600 + 99, 100) +
    div(y - 1600 + 399, 400);

  for (let i = 0; i < m - 1; ++i)
    gregorianDayNo += constants.daysInMonth.gregorian[i];

  if (m > 2 && ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0)) {
    gregorianDayNo++;
  }

  gregorianDayNo += d - 1;

  let persianDayNo = gregorianDayNo - 79;
  const cycles = div(persianDayNo, 12053);
  persianDayNo = remainder(persianDayNo, 12053);

  let persianYear = 979 + 33 * cycles + 4 * div(persianDayNo, 1461);
  persianDayNo = remainder(persianDayNo, 1461);

  if (persianDayNo >= 366) {
    persianYear += div(persianDayNo - 1, 365);
    persianDayNo = remainder(persianDayNo - 1, 365);
  }

  let month = 0;
  while (month < 11 && persianDayNo >= constants.daysInMonth.persian[month]) {
    persianDayNo -= constants.daysInMonth.persian[month++];
  }

  return `${persianYear}-${format(month + 1)}-${format(persianDayNo + 1)}`;
};
