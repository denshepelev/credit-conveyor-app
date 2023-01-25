export default function creditTermBuilder(
  amount: number,
  term: number,
  rate: number,
  psk: number,
  insurance: boolean,
  salary: boolean,
): string {
  return `<div style = "text-align: center; display: inline-block; background-color: #fff; padding: 2rem 2rem; color: #000;">
    <table style = "border: 1px solid #ccc; width: 100%; margin:0; padding:0; border-collapse: collapse; border-spacing: 0;">
      <thead>
        <tr style = "border: 1px solid #ddd; padding: 5px;">
          <th style = "color: #fff; padding: 10px; background-color: #161A39; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Amount</th>
          <th style = "color: #fff; padding: 10px; background-color: #161A39; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Term</th>
          <th style = "color: #fff; padding: 10px; background-color: #161A39; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Rate</th>
          <th style = "color: #fff; padding: 10px; background-color: #161A39; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">psk</th>
          <th style = "color: #fff; padding: 10px; background-color: #161A39; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Insurance</th>
          <th style = "color: #fff; padding: 10px; background-color: #161A39; text-transform: uppercase; font-size: 10px; letter-spacing: 1px;">Salary</th>
        </tr>
      </thead>
      <tbody>
    <tr style = "border: 1px solid #ddd; padding: 5px;">
    <td style = "padding: 10px; text-align: center; font-size: 12px; border-right: 1px solid #ddd;" data-label="Amount">${amount}</td>
    <td style = "padding: 10px; text-align: center; font-size: 14px; border-right: 1px solid #ddd;" data-label="Term">${term}</td>
    <td style = "padding: 10px; text-align: center; font-size: 14px; border-right: 1px solid #ddd;" data-label="Rate">${rate}</td>
    <td style = "padding: 10px; text-align: center; font-size: 12px; border-right: 1px solid #ddd;" data-label="psk">${psk}</td>
    <td style = "padding: 10px; text-align: center; font-size: 14px; border-right: 1px solid #ddd;" data-label="Insurance">${insurance}</td>
    <td style = "padding: 10px; text-align: center; font-size: 14px; border-right: 1px solid #ddd;" data-label="Salary">${salary}</td>
  </tr>
  </tbody>
  </table>
  </div>`;
}
