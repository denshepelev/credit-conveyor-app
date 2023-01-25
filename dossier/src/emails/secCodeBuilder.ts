export default function secCodeBuilder(code: string): string {
  return `<div style="-webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    color: #333;
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    box-sizing: border-box;">
  <div style="-webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 50px;
    line-height: 1.42857143;
    box-sizing: border-box;
    border: 3px solid transparent;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fcf8e3;
    border-color: #faebcc;
    color: #8a6d3b;
    text-align: center;">
    <strong>${code}</strong>
  </div>
</div>`;
}
