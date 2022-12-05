const loanCalculator = (
  totalRate: number,
  totalAmount: number,
  term: number
): number => {
  const rateProportion: number = totalRate / 100 / 12;
  const monthlyPayment: number =
    Math.round(
      totalAmount *
        (rateProportion +
          rateProportion / (Math.pow(1 + rateProportion, term) - 1)) *
        100
    ) / 100;
  return monthlyPayment;
};
export { loanCalculator };
