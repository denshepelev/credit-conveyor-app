export default function scheduleBuilder(scheduleContent: string): string {
  return `<div style = "text-align: center; display: inline-block; background-color: #fff; padding: 2rem 2rem; color: #000;">
  <table style = "border: 1px solid #ccc; width: 100%; margin:0; padding:0; border-collapse: collapse; border-spacing: 0;">
    <thead>
      <tr style = "border: 1px solid #ddd; padding: 5px;">
        <th style = "color: #fff; background-color: #161A39; text-transform: uppercase; font-size: 8px; letter-spacing: 1px;">#</th>
        <th style = "color: #fff; background-color: #161A39; text-transform: uppercase; font-size: 8px; letter-spacing: 1px;">Date</th>
        <th style = "color: #fff; background-color: #161A39; text-transform: uppercase; font-size: 8px; letter-spacing: 1px;">Payment</th>
        <th style = "color: #fff; background-color: #161A39; text-transform: uppercase; font-size: 8px; letter-spacing: 1px;">Total</th>
        <th style = "color: #fff; background-color: #161A39; text-transform: uppercase; font-size: 8px; letter-spacing: 1px;">Interest</th>
        <th style = "color: #fff; background-color: #161A39; text-transform: uppercase; font-size: 8px; letter-spacing: 1px;">Debt</th>
        <th style = "color: #fff; background-color: #161A39; text-transform: uppercase; font-size: 8px; letter-spacing: 1px;">Rem. debt</th>
      </tr>
    </thead>
    <tbody>
      ${scheduleContent}
    </tbody>
</table>
</div>`;
}
