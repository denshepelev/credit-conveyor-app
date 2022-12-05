export function psk(dates: Array<Date>, sum: Array<number>): number {
  /*
   * используется метод приближенного вычисления с точностью до двух знаков после запятой
   * входящие данные: dates - даты платежей
   * входящие данные: sum - суммы платежей
   */
  const m = dates.length; // число платежей

  //Задаем базовый период bp
  const bp = 30;
  //Считаем число базовых периодов в календарном году:
  const cbp = Math.round(365 / bp);

  //заполним массив с количеством дней с даты выдачи до даты к-го платежа
  const days: Array<any> = [];
  for (let k = 0; k < m; k++) {
    days[k] = (dates[k].getTime() - dates[0].getTime()) / (24 * 60 * 60 * 1000);
  }

  //посчитаем Ек и Qк для каждого платежа
  const e = [];
  const q = [];
  for (let k = 0; k < m; k++) {
    e[k] = (days[k] % bp) / bp;
    q[k] = Math.floor(days[k] / bp);
  }

  //Методом перебора начиная с 0 ищем i до максимального приближения с шагом s
  let i = 0;
  let x = 1;
  let x_m = 0;
  const s = 0.000001;
  while (x > 0) {
    x_m = x;
    x = 0;
    for (let k = 0; k < m; k++) {
      x = x + sum[k] / ((1 + e[k] * i) * Math.pow(1 + i, q[k]));
    }
    i = i + s;
  }
  if (x > x_m) {
    i = i - s;
  }

  //считаем ПСК
  const psk = Math.floor(i * cbp * 100 * 1000) / 1000;

  //выводим ПСК
  //console.log("ПСК = " + psk + " %");
  return psk;
}
/* testCode
const dates = [
  new Date("2014-09-01"),
  new Date("2014-10-01"),
  new Date("2014-11-01"),
  new Date("2014-12-01"),
];
const sum = [-100000, 34002.21, 34002.21, 34002.21];

psk(dates, sum);
*/

/* testCode
function addMonths(numOfMonths: number, date: Date): Date {
  const dateCopy = new Date(date.getTime());
  dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);
  return dateCopy;
}

const paymentDates: Array<Date> = [];
const paymentAmounts: Array<number> = [];
paymentDates.push(new Date());
paymentAmounts.push(-100000);

for (let index = 1; index < 11; index++) {
  //const element = array[index];
  paymentDates.push(addMonths(1, paymentDates[index - 1]));
  paymentAmounts.push(11500);
}

console.log(psk(paymentDates, paymentAmounts));
console.log(paymentDates);
console.log(paymentAmounts);
*/
