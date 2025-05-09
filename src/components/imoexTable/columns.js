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
  {name: 'value', align: 'center', label: 'Цена', field: 'value'}, // должна обновляться, какой интервал?
  {name: 'planQuantity', label: 'Купить акций план', field: 'planQuantity'}, // computed
  {name: 'planPrice', align: 'center', label: 'Стоимость плановая', field: 'planPrice'}, // computed
  {name: 'myWeight', align: 'center', label: 'Мой вес', field: 'myWeight'},
  {name: 'weightQuantity', align: 'center', label: 'Купить акций вес', field: 'weightQuantity'},
  {name: 'weightPrice', align: 'center', label: 'Стоимость весовая', field: 'weightPrice'},
  {name: 'boughtQuantity', align: 'center', label: 'Куплено акций', field: 'boughtQuantity'}, // ручной ввод
  {name: 'boughtPrice', align: 'center', label: 'Стоимость позиции', field: 'boughtPrice'}, // computed
  {name: 'done', align: 'center', label: 'Готовность', field: 'done'},
  {name: 'buy', align: 'center', label: 'Докупить', field: 'buy'},
  {name: 'sell', align: 'center', label: 'Продать', field: 'sell'},
  {name: 'comment', align: 'center', label: 'Комментарий', field: 'comment'},
];

export default columns;
