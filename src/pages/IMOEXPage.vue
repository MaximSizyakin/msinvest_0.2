<template>
  <div class="q-pa-md">

    <Table
      :rows="rows"
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

const imoexIndex = reactive([]);
const getImoexIndex = async () => {
  try {
    await axios.get('https://iss.moex.com/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json?limit=100')
      .then(response => {
        const data = response.data.analytics.data;
        data.forEach((el, idx) => imoexIndex.push({
          index: idx,
          ticker: el[2],
          weight: el[5]
        }));
      });
  } catch (error) {
    console.log(error);
  }
};

const sharesData = reactive([]);
const getSharesValue = async () => {
  try {
    await axios.get('https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json')
      .then(response => {
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

const rows = reactive([]);
const uploadRowsData = () => {
  return imoexIndex.map((el, idx, arr) => {
    const share = sharesData.find(item => item.ticker === el.ticker);
    rows.push({
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
    await getImoexIndex();
    await getSharesValue();
    uploadRowsData();
    loading.value = false;
  }
);
</script>

