const yearTemplate = [0,3,3,6,1,4,6,2,5,0,3,5];
const leapTemplate = [0,3,4,0,2,5,0,3,6,1,4,6];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeap = (year: number) => {
	let result: boolean = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	return result;
}


const calcJan = (year: number) => {
	let yearOffset: number = year % 400;
	let centuryYears: number = Math.floor(yearOffset / 100);

	// Need century years, to subtract non-leap years. If the requested year is itself such a year, don't include it.
	// Why? (I'll get back to you on that.)
	if (year % 400 > 0 && year % 100 === 0) centuryYears--;
	let leapYears: number = Math.ceil(yearOffset / 4) - centuryYears;

	// Gregorian calendar.
	// 6 is the magic number. It just happens that 6 is the number for January in a % 400 === 0 year.
	let jan: number = 6 + yearOffset + leapYears;

	// Make sure 0 <= jan < 7.
	jan = jan % 7;

	return jan;
}

export const calc12DigitYear = (year: number) => {
	let jan: number = calcJan(year);
	let yearDigits: number[] = [];
	let template: number[] = isLeap(year) ? leapTemplate : yearTemplate;
	yearDigits = template.map(d => (d+jan)%7);
	return yearDigits;
}

export interface MonthData {
  year: number;
  month: number;
  days: number;
  blanks: number;
}
export interface YearObj {
	year: number;
	janDigit: number;
	isLeap: boolean;
  }

export const generateMonthData = (yearData: YearObj) => {
	let { year, janDigit, isLeap } = yearData;
	var template = isLeap ? leapTemplate : yearTemplate;

	let data: Array<MonthData> = [];
	template.forEach((digit, monthNdx) => {
		let month: MonthData = { year, month: monthNdx, days: monthDays[monthNdx], blanks: (digit + 1*janDigit) % 7 };
		data.push(month);
	});
	if (isLeap) data[1].days = 29;

	return data;
}


