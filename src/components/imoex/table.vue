<template>
  <q-table
    title="Таблица соответствия индекса Мосбиржи"
    :rows="rows"
    :columns="columns"
    row-key="name"
    dense
    :pagination="pagination"
    rows-per-page-label="Записей на странице"
    :rows-per-page-options="[10, 20, 50, 100]"
    :pagination-label="(s, e, t) => (s + '-' + e + ' из ' + t)"
    no-data-label="Нет данных. Попробуйте позже."
    :loading="loading"
    loading-label="Загрузка данных."
    separator="cell"
  >

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="count" :props="props">{{ props.row.index + 1 }}</q-td>
        <q-td key="ticker" :props="props">{{ props.row.ticker }}</q-td>
        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
        <q-td key="weight" :props="props">{{ props.row.weight }}</q-td>
        <q-td key="coef" :props="props">{{ props.row.coef }}
          <q-popup-edit v-model="props.row.coef" v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="console.log(props.row)"/>
          </q-popup-edit>
        </q-td>
        <q-td key="value" :props="props">{{ props.row.value }}</q-td>
        <q-td key="sharesToBuy" :props="props">{{ props.row.sharesToBuy }}</q-td>
        <q-td key="priceValue" :props="props">{{ props.row.priceValue }}</q-td>
        <q-td key="sharesBought" :props="props">{{ props.row.sharesBought }}</q-td>
        <q-td key="sharesBoughtValue" :props="props">{{ props.row.sharesBoughtValue }}</q-td>
        <q-td key="done" :props="props">{{ props.row.done }}</q-td>
      </q-tr>
    </template>

    <template v-slot:bottom-row="props">
      <q-tr style="text-align: center">
        <q-td></q-td>
        <q-td key="ticker" :props="props">2</q-td>
        <q-td></q-td>
        <q-td></q-td>
        <q-td>{{ totalWeight }}</q-td>
        <q-td>6</q-td>
        <q-td>7</q-td>
        <q-td>8</q-td>
        <q-td>9</q-td>
        <q-td>10</q-td>
        <q-td>11</q-td>
      </q-tr>
    </template>

  </q-table>
</template>

<script setup>
import columns from "./columns";
import {computed, onMounted} from "vue";

const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const pagination = {
  sortBy: 'ticker',
  descending: false,
  page: 1,
  rowsPerPage: 10
};

const totalWeight = computed(() => {
  let data = null;
  props.rows.forEach(i => data += i.weight);
  return Math.round(data);
});

onMounted(() => {
});

</script>

<style scoped>
tr:hover > td {
  background: rgba(0, 0, 0, .03);
}
</style>
