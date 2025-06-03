const columns = [
  {
    name: 'count',
    required: true,
    label: '#',
    align: 'center',
    field: row => row.index + 1,
  },
  {name: 'ticker', align: 'left', label: 'Тикер', field: 'ticker', sortable: true}, // yes
  {name: 'name', align: 'left', label: 'Название', field: 'name'}, // yes
  {name: 'weight', label: 'Вес', field: 'weight', sortable: true}, // yes
  {name: 'coef', align: 'center', label: 'Коэф-нт', field: 'coef'}, // подумать
  {name: 'value', label: 'Цена', field: 'value'}, // должна обновляться, какой интервал?
  {name: 'planQuantity', label: 'Купить акций план', field: 'planQuantity'}, // computed
  {name: 'planPrice', label: 'Стоимость плановая', field: 'planPrice'}, // computed
  {name: 'myWeight', label: 'Мой вес', field: 'myWeight'},
  {name: 'weightQuantity', label: 'Купить акций вес', field: 'weightQuantity'},
  {name: 'weightPrice', label: 'Стоимость весовая', field: 'weightPrice'},
  {name: 'boughtQuantity', label: 'Куплено акций', field: 'boughtQuantity'}, // ручной ввод
  {name: 'boughtPrice', label: 'Стоимость позиции', field: 'boughtPrice'}, // computed
  {name: 'done', label: 'Готовность', field: 'done'},
  {name: 'buy', label: 'Докупить', field: 'buy'},
  {name: 'sell', label: 'Продать', field: 'sell'},
  {name: 'comment', align: 'center', label: 'Комментарий', field: 'comment'},
];

export default columns;
