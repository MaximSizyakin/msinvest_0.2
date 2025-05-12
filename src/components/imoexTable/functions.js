function getPlanQuantity(row) {
  const el = tableData.find(i => i.ticker === row.ticker);
  const qtty = Math.round(target.value * row.weight / 100 * 1 / row.value);
  el.planQuantity = qtty;
  return qtty;
}

export {
  getPlanQuantity
};
