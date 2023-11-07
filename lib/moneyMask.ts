function formatMoney(amount: number): string {
  return `R$ ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

export default formatMoney;
