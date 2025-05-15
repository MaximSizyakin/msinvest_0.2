<template>
  <div class="q-pa-md">
    <q-input
      filled
      v-model.number="store.target"
      prefix="₽"
      :rules="[val => !!val || 'Не может быть пустым']"
      style="max-width: 200px"
    />
    <!--      mask="### ### ### ###"-->
    <!--      reverse-fill-mask-->
    <!--      debounce="1000"-->
    <q-input
      filled
      disable
      v-model="store.current"
      prefix="₽"
      mask="### ### ### ###"
      reverse-fill-mask
      style="max-width: 200px"
    />
  </div>

  <q-table
    title="Таблица соответствия индекса Мосбиржи"
    :rows="rows"
    :columns="columns"
    row-key="ticker"
    dense
    no-data-label="Нет данных. Попробуйте позже."
    :loading="loading"
    :rows-per-page-options="[0]"
    hide-pagination
    loading-label="Загрузка данных."
    separator="cell"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          style="font-weight: bold; text-wrap: wrap; text-align: center"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="count" :props="props">{{ props.row.index + 1 }}</q-td>
        <q-td key="ticker" :props="props">{{ props.row.ticker }}</q-td>
        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
        <q-td key="weight" :props="props">{{ props.row.weight }}</q-td>
        <q-td key="coef" :props="props">
          <!--          {{ tableData[props.row.index].coef }}-->
        </q-td>
        <!--          <q-popup-edit v-model="props.row.coef" v-slot="scope">-->
        <!--            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="console.log(props.row)"/>-->
        <!--          </q-popup-edit>-->

        <q-td key="value" :props="props">{{ props.row.value.toFixed(2) }}</q-td>
        <q-td key="planQuantity" :props="props">
          {{ store.getPlanQuantity(props.row.ticker) }}
          <!--          {{ getPlanQuantity(props.row).toLocaleString() }}-->
        </q-td>
        <q-td key="planPrice" :props="props">
          <!--          {{ getPlanPrice(props.row).toLocaleString() }}-->
        </q-td>
        <q-td key="myWeight" :props="props"></q-td>
        <q-td key="weightQuantity" :props="props"></q-td>
        <q-td key="weightPrice" :props="props"></q-td>
        <q-td key="boughtQuantity" :props="props">
          <!--          {{ tableData[props.row.index].boughtQuantity }}-->
        </q-td>
        <q-td key="boughtPrice" :props="props"></q-td>
        <q-td key="done" :props="props"></q-td>
        <q-td key="buy" :props="props"></q-td>
        <q-td key="sell" :props="props"></q-td>
        <q-td key="comment" :props="props"></q-td>
      </q-tr>
    </template>

    <template v-slot:bottom-row="props">
      <q-tr style="text-align: center">
        <q-td>1</q-td>
        <q-td>2</q-td>
        <q-td>3</q-td>
        <q-td>
<!--          {{ totalWeight }}-->
        </q-td>
        <q-td>5</q-td>
        <q-td>6</q-td>
        <q-td>7</q-td>
        <q-td>
          <!--          {{ totalPlanPrice }}-->
        </q-td>
        <q-td>9</q-td>
        <q-td>10</q-td>
        <q-td>11</q-td>
        <q-td>12</q-td>
        <q-td>13</q-td>
        <q-td>14</q-td>
        <q-td>15</q-td>
        <q-td>16</q-td>
        <q-td>17</q-td>
      </q-tr>
    </template>

  </q-table>
</template>
<script setup>
import columns from "./columns";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useIMOEXStore} from "../../stores/imoex-store.js";
import {supabase} from "../../boot/supabase.js";

const store = useIMOEXStore();

// Определение входных параметров компонента таблицы
const {rows, loading} = defineProps({
  rows: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// Загрузка входных параметров компонента таблицы в хранилище
// watch(
//   () => rows,
//   () => {
//     store.loadLocalData(rows);
//   },
//   {deep: true}
// );

// Загрузка данных из базы данных в хранилище
onMounted(() => {
  store.fetchIMOEXDatabase();
});

// const planQuantity = computed(() => (ticker) => {
//   const idx = store.localData.find(i => i.ticker === ticker).index;
//   if (store.databaseData.length > 0 && store.databaseData[idx]?.coef) {
//     return Math.round(target.value * store.localData[idx].weight / 100 * store.databaseData[idx].coef / store.localData[idx].value);
//   } else {
//     return 0;
//   }
// });

// const planQuantity = (ticker) => {
//   const idx = store.localData.find(i => i.ticker === ticker).index;
//   if (store.databaseData.length > 0 && store.databaseData[idx]?.coef) {
//     return Math.round(target.value * store.localData[idx].weight / 100 * store.databaseData[idx].coef / store.localData[idx].value);
//   } else {
//     return 0;
//   }
// };

// const getPlanQuantity = (row) => {
//   const el = tableData.find(i => i.ticker === row.ticker);
//   const qtty = Math.round(target.value * row.weight / 100 * el.coef / row.value);
//   el.planQuantity = qtty;
//   return qtty;
// };
//
// const getPlanPrice = (row) => {
//   const el = tableData.find(i => i.ticker === row.ticker);
//   const price = Math.round(row.value * el.planQuantity);
//   el.planPrice = price;
//   return price;
// };

// const totalWeight = computed(() => {
//   let data = null;
//   rows.forEach(i => data += i.weight);
//   return Math.round(data);
// });

// const totalPlanPrice = computed(() => {
//   let data = null;
//   tableData.forEach(i => data += i.planPrice);
//   return Math.round(data);
// });


</script>

<style scoped>
tr:hover > td {
  background: rgba(0, 0, 0, .03);
}
</style>
