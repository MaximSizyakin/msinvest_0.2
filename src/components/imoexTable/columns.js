const columns = [
  {
    name: 'count',
    required: true,
    label: '#',
    align: 'left',
    field: row => row.index + 1,
  },
  {name: 'ticker', align: 'center', label: 'Тикер', field: 'ticker', sortable: true}, // yes
  {name: 'name', align: 'center', label: 'Название', field: 'name'}, // yes
  {name: 'weight', align: 'center', label: 'Вес', field: 'weight', sortable: true}, // yes
  {name: 'coef', align: 'center', label: 'Коэф-нт', field: 'coef'}, // подумать
  {name: 'value', align: 'center', label: 'Цена', field: 'value'}, // должна обновляться, какой интервал?
  {name: 'sharesToBuy', align: 'center', label: 'Акций купить', field: 'sharesToBuy'}, // computed
  {name: 'priceValue', align: 'center', label: 'Стоимость', field: 'priceValue'}, // computed
  {name: 'sharesBought', align: 'center', label: 'Куплено акций', field: 'sharesBought'}, // ручной ввод
  {name: 'sharesBoughtValue', align: 'center', label: 'Куплено сумма', field: 'sharesBoughtValue'}, // computed
  {name: 'done', align: 'center', label: 'Готовность', field: 'done'}, // сomputed
];

export default columns;
