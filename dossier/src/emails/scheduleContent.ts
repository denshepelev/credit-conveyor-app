import { PaymentScheduleElementDTO } from '../dto/paymentScheduleElement.dto.js';
export default function scheduleContent(
  monthlyPayment: number,
  scheduleElementArray: Array<PaymentScheduleElementDTO>,
): string {
  const scheduleElement = (
    num: number,
    date: string,
    payment: number,
    total: number,
    interest: number,
    debt: number,
    remainingDebt: number,
  ): string => {
    return `<tr style = "border: 1px solid #ddd; padding: 5px;">
    <td style = "padding: 10px; text-align: center; font-size: 8px; border-right: 1px solid #ddd;" data-label="#">${num}</td>
    <td style = "padding: 10px; text-align: center; font-size: 8px; border-right: 1px solid #ddd;" data-label="Date">${date}</td>
    <td style = "padding: 10px; text-align: center; font-size: 8px; border-right: 1px solid #ddd;" data-label="Payment">${payment}</td>
    <td style = "padding: 10px; text-align: center; font-size: 8px; border-right: 1px solid #ddd;" data-label="Total">${total}</td>
    <td style = "padding: 10px; text-align: center; font-size: 8px; border-right: 1px solid #ddd;" data-label="Interest">${interest}</td>
    <td style = "padding: 10px; text-align: center; font-size: 8px; border-right: 1px solid #ddd;" data-label="Debt">${debt}</td>
    <td style = "padding: 10px; text-align: center; font-size: 8px; border-right: 1px solid #ddd;" data-label="Rem. debt">${remainingDebt}</td>
  </tr>`;
  };
  const scheduleElementArrayString: Array<string> = [];
  for (let index = 0; index < scheduleElementArray.length; index++) {
    const element = scheduleElementArray[index];
    scheduleElementArrayString.push(
      scheduleElement(
        element.number,
        element.date,
        monthlyPayment,
        element.totalPayment,
        element.interestPayment,
        element.debtPayment,
        element.remainingDebt,
      ),
    );
  }
  return scheduleElementArrayString.join(' ');
}
