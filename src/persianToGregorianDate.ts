import { constants, separator, format } from './utils';

export const persianToGregorianDate = (dateString: string): string => {
  const regex = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
  if (!regex.test(dateString)) {
    throw new Error('Invalid date format. Use YYYY/MM/DD or YYYY-MM-DD.');
  }

  const [y, m, d] = separator(dateString);
  const year = y - 979;
  const month = m - 1;
  const day = d - 1;

  let persianDayNo =
    365 * year + Math.floor(year / 33) * 8 + Math.floor(((year % 33) + 3) / 4);

  for (let i = 0; i < month; ++i)
    persianDayNo += constants.daysInMonth.persian[i];

  persianDayNo += day;

  let gregorianDayNo = persianDayNo + 79;
  let gregorianYear = 1600 + 400 * Math.floor(gregorianDayNo / 146097);
  gregorianDayNo %= 146097;

  let leap = true;
  if (gregorianDayNo >= 36525) {
    gregorianDayNo--;
    gregorianYear += 100 * Math.floor(gregorianDayNo / 36524);
    gregorianDayNo %= 36524;

    if (gregorianDayNo >= 365) gregorianDayNo++;
    else leap = false;
  }

  gregorianYear += 4 * Math.floor(gregorianDayNo / 1461);
  gregorianDayNo %= 1461;

  if (gregorianDayNo >= 366) {
    leap = false;
    gregorianDayNo--;
    gregorianYear += Math.floor(gregorianDayNo / 365);
    gregorianDayNo %= 365;
  }

  let monthIndex = 0;
  while (
    gregorianDayNo >=
    constants.daysInMonth.gregorian[monthIndex] + +(monthIndex === 1 && leap)
  ) {
    gregorianDayNo -=
      constants.daysInMonth.gregorian[monthIndex] + +(monthIndex === 1 && leap);
    monthIndex++;
  }

  return `${gregorianYear}-${format(monthIndex + 1)}-${format(
    gregorianDayNo + 1
  )}`;
};
