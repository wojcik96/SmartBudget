export function adjustAmountBasedOnType(amount: number, type: string): number {
  const numericAmount = Math.abs(Number(amount));

  return type.toLowerCase() === 'income' ? numericAmount : -numericAmount;
}
