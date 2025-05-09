<template>
  <div class="q-pa-md">

    <Table
      :rows="rowsData"
      :loading="loading"
    />

  </div>
</template>

<!--Страница должна только получать данные и передавать в таблицу.-->
<!--А таблица уже должна на основе этих данных расчитывать и выводить информацию.-->

<script setup>
import axios from "axios";
import {ref, onMounted, reactive} from "vue";
import Table from '../components/imoexTable/table.vue';

const loading = ref(false);

// Получаем индекс (тикер и вес э)
const imoexIndex = reactive([]);
const getImoexIndex = async () => {
  try {
    await axios.get('https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json?limit=100')
      .then(response => {
        const data = response.data.analytics.data;
        data.forEach((el) => imoexIndex.push({
          ticker: el[2],
          weight: el[5]
        }));
      });
  } catch (error) {
    console.log(error);
  }
};

// Получаем данные эмитента (тикер, название и стоимость)
const emitentsData = reactive([]);
const getSharesData = async () => {
  try {
    await axios.get('https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json')
      .then(response => {
        // Тут пока дата закрытия. Можно переделать на текущую.
        const data = response.data.securities.data;
        data.forEach((el, idx) => emitentsData.push(
          {
            ticker: el[0],
            name: el[9],
            value: el[3]
          }
        ));
      });
  } catch (error) {
    console.log(error);
  }
};

// Передавать весь массив или каждый пропс отдельно?
const rowsData = reactive([]);
const writeRowsData = () => {
  return imoexIndex.map((el, idx, arr) => {
    const emitent = emitentsData.find(item => item.ticker === el.ticker);
    rowsData.push({
      index: idx,
      ticker: el.ticker,
      weight: el.weight,
      name: emitent.name,
      value: emitent.value
    });
  });
};

onMounted(async () => {
    loading.value = true;
    await getImoexIndex();
    await getSharesData();
    writeRowsData();
    loading.value = false;
  }
);
</script>

