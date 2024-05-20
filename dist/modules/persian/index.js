"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersianDate = void 0;
const utils_1 = require("./utils");
const gregorianMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const persianMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
class PersianDate {
    static toGregorian(date) {
        const [year, month, day] = date.split("-").map(Number);
        const pYear = year - 979;
        const pMonth = month - 1;
        const pDay = day - 1;
        let pDayNo = 365 * pYear +
            Math.floor(pYear / 33) * 8 +
            Math.floor(((pYear % 33) + 3) / 4);
        for (let i = 0; i < pMonth; ++i) {
            pDayNo += persianMonth[i];
        }
        pDayNo += pDay;
        let gDayNo = pDayNo + 79;
        let gYear = 1600 + 400 * Math.floor(gDayNo / 146097);
        gDayNo = gDayNo % 146097;
        let leap = true;
        if (gDayNo >= 36525) {
            gDayNo--;
            gYear += 100 * Math.floor(gDayNo / 36524);
            gDayNo = gDayNo % 36524;
            if (gDayNo >= 365) {
                gDayNo++;
            }
            else {
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
        let i;
        for (i = 0; gDayNo >= gregorianMonth[i] + Number(i == 1 && leap); i++) {
            gDayNo -= gregorianMonth[i] + Number(i == 1 && leap);
        }
        const gMonth = i + 1;
        const gDay = gDayNo + 1;
        return `${gYear}-${utils_1.default.fixer(gMonth)}-${utils_1.default.fixer(gDay)}`;
    }
    static toPersian(date) {
        const [year, month, day] = date.split("-").map(Number);
        let gDayNo, pDayNo;
        let i;
        const gYear = year - 1600;
        const gMonth = month - 1;
        const gDay = day - 1;
        gDayNo =
            365 * gYear +
                utils_1.default.div(gYear + 3, 4) -
                utils_1.default.div(gYear + 99, 100) +
                utils_1.default.div(gYear + 399, 400);
        for (i = 0; i < gMonth; ++i)
            gDayNo += gregorianMonth[i];
        if (gMonth > 1 &&
            ((gYear % 4 == 0 && gYear % 100 != 0) || gYear % 400 == 0)) {
            ++gDayNo;
        }
        gDayNo += gDay;
        pDayNo = gDayNo - 79;
        const pNormalizedPosition = utils_1.default.div(pDayNo, 12053);
        pDayNo = utils_1.default.remainder(pDayNo, 12053);
        let pYear = 979 + 33 * pNormalizedPosition + 4 * utils_1.default.div(pDayNo, 1461);
        pDayNo = utils_1.default.remainder(pDayNo, 1461);
        if (pDayNo >= 366) {
            pYear += utils_1.default.div(pDayNo - 1, 365);
            pDayNo = utils_1.default.remainder(pDayNo - 1, 365);
        }
        for (i = 0; i < 11 && pDayNo >= persianMonth[i]; ++i) {
            pDayNo -= persianMonth[i];
        }
        const pMonth = i + 1;
        const pDay = pDayNo + 1;
        return `${pYear}-${utils_1.default.fixer(pMonth)}-${utils_1.default.fixer(pDay)}`;
    }
}
exports.PersianDate = PersianDate;
