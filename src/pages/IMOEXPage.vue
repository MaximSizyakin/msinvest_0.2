<template>
  <div class="q-pa-md">
    <!--      :rows="IMOEXData"-->
    <Table
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
import {useIMOEXStore} from "../stores/imoex-store.js";

const store = useIMOEXStore();

const loading = ref(false);

// Получаем индекс (тикер и вес эмитента)
const IMOEXIndex = [];
const getIMOEXIndex = async () => {
  try {
    await axios.get('https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json?limit=100')
      .then(response => {
        const data = response.data.analytics.data;
        data.forEach((el) => IMOEXIndex.push({
          ticker: el[2],
          weight: el[5]
        }));
      });
  } catch (error) {
    console.log(error);
  }
};

// Получаем данные эмитентов (тикер, название и стоимость)
const sharesData = [];
const getSharesData = async () => {
  try {
    await axios.get('https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json')
      .then(response => {
        // Тут пока дата закрытия. Можно переделать на текущую.
        const data = response.data.securities.data;
        data.forEach((el, idx) => sharesData.push(
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

// Определаем структуру данных для таблицы
const IMOEXData = [];
const setIMOEXData = () => {
  return IMOEXIndex.map((el, idx, arr) => {
    const share = sharesData.find(item => item.ticker === el.ticker);
    IMOEXData.push({
      index: idx,
      ticker: el.ticker,
      weight: el.weight,
      name: share.name,
      value: share.value
    });
  });
};

onMounted(async () => {
    loading.value = true;
    await getIMOEXIndex();
    await getSharesData();
    setIMOEXData();
    store.setInitialData(IMOEXData);
    await store.fetchIMOEXDatabase();
    loading.value = false;
  }
);
</script>

