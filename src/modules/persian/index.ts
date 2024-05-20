import utils from "./utils";

const gregorianMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const persianMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

class PersianDate {
  public static toGregorian(date: string): string {
    const [year, month, day] = date.split("-").map(Number);

    const pYear: number = year - 979;
    const pMonth: number = month - 1;
    const pDay: number = day - 1;

    let pDayNo: number =
      365 * pYear +
      Math.floor(pYear / 33) * 8 +
      Math.floor(((pYear % 33) + 3) / 4);
    for (let i = 0; i < pMonth; ++i) {
      pDayNo += persianMonth[i];
    }
    pDayNo += pDay;
    let gDayNo: number = pDayNo + 79;
    let gYear: number = 1600 + 400 * Math.floor(gDayNo / 146097);
    gDayNo = gDayNo % 146097;
    let leap = true;
    if (gDayNo >= 36525) {
      gDayNo--;
      gYear += 100 * Math.floor(gDayNo / 36524);
      gDayNo = gDayNo % 36524;
      if (gDayNo >= 365) {
        gDayNo++;
      } else {
        leap = false;
      }
    }
    gYear += 4 * Math.floor(gDayNo / 1461);
    gDayNo %= 1461;
    if (gDayNo >= 366) {
      leap = false;
      gDayNo--;
      gYear += Math.floor(gDayNo / 365);
      gDayNo = gDayNo % 365;
    }
    let i: number;
    for (i = 0; gDayNo >= gregorianMonth[i] + Number(i == 1 && leap); i++) {
      gDayNo -= gregorianMonth[i] + Number(i == 1 && leap);
    }
    const gMonth: number = i + 1;
    const gDay: number = gDayNo + 1;

    return `${gYear}-${utils.fixer(gMonth)}-${utils.fixer(gDay)}`;
  }

  public static toPersian(date: string): string {
    const [year, month, day] = date.split("-").map(Number);

    let gDayNo: number, pDayNo: number;

    let i: number;

    const gYear = year - 1600;
    const gMonth = month - 1;
    const gDay = day - 1;

    gDayNo =
      365 * gYear +
      utils.div(gYear + 3, 4) -
      utils.div(gYear + 99, 100) +
      utils.div(gYear + 399, 400);

    for (i = 0; i < gMonth; ++i) gDayNo += gregorianMonth[i];

    // leap and after february
    if (
      gMonth > 1 &&
      ((gYear % 4 == 0 && gYear % 100 != 0) || gYear % 400 == 0)
    ) {
      ++gDayNo;
    }
    gDayNo += gDay;

    pDayNo = gDayNo - 79;

    const pNormalizedPosition = utils.div(pDayNo, 12053);
    pDayNo = utils.remainder(pDayNo, 12053);

    let pYear = 979 + 33 * pNormalizedPosition + 4 * utils.div(pDayNo, 1461);
    pDayNo = utils.remainder(pDayNo, 1461);

    if (pDayNo >= 366) {
      pYear += utils.div(pDayNo - 1, 365);
      pDayNo = utils.remainder(pDayNo - 1, 365);
    }

    for (i = 0; i < 11 && pDayNo >= persianMonth[i]; ++i) {
      pDayNo -= persianMonth[i];
    }

    const pMonth = i + 1;
    const pDay = pDayNo + 1;

    return `${pYear}-${utils.fixer(pMonth)}-${utils.fixer(pDay)}`;
  }
}

export { PersianDate };
