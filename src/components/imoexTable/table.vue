<template>
  <div class="q-pa-md">
    <q-input
      filled
      v-model="store.target"
      prefix="₽"
      mask="### ### ### ### ###"
      reverse-fill-mask
      debounce="500"
      :rules="[val => !!val || 'Не может быть пустым']"
      style="max-width: 200px"
    />
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
    :rows="store.data"
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
        <q-td key="coef" :props="props">{{ props.row.coef }}
          <q-popup-edit
            v-model.number="props.row.coef"
            v-slot="scope"
            :validate="val => val !== '' && val >= 0">
            <q-input
              type="number"
              v-model.number="scope.value"
              @keyup.enter="scope.set"
              @change="onCoefUpdate(props.row.ticker, scope.value)"
              :rules="[
                val => val !== '' || 'Не может быть пустым',
                val => val >= 0 || 'Не может быть меньше 0',
              ]"
              dense autofocus
            />
          </q-popup-edit>
        </q-td>
        <q-td key="value" :props="props">{{ props.row.value.toLocaleString() }}</q-td>
        <q-td key="planQuantity" :props="props">{{ planQuantity(props.row) }}</q-td>
        <q-td key="planPrice" :props="props">{{ planPrice(props.row) }}</q-td>
        <q-td key="myWeight" :props="props">{{ myWeight(props.row) }}</q-td>
        <q-td key="weightQuantity" :props="props"></q-td>
        <q-td key="weightPrice" :props="props"></q-td>
        <q-td key="boughtQuantity" :props="props">
          {{ props.row.boughtQuantity }}
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
          {{ totalPlanPrice()?.toLocaleString() }}
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
import {useIMOEXStore} from "../../stores/imoex-store.js";

const store = useIMOEXStore();

const {loading} = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});

let totalPlanPrice = () => {
  if (store.data.length > 0 && !loading) return store.getTotalPlanPrice;
};

const onCoefUpdate = (ticker, value) => {
  if (value >= 0 && value !== '') {
    store.updateDBData(ticker, {coef: value});
  }
};

const planQuantity = (row) => {
  if (row.coef && !loading) {
    const val = Math.round(store.getTarget * row.weight / 100 * row.coef / row.value);
    store.setData(row.ticker, {'planQuantity': val});
    return val.toLocaleString();
  }
};

const planPrice = (row) => {
  if (row.planQuantity && !loading) {
    const val = Math.round(row.value * row.planQuantity);
    store.setData(row.ticker, {'planPrice': val});
    return val.toLocaleString();
  }
};

const myWeight = (row) => {
  if (row.planPrice && !loading) {
    const val = (row.planPrice / totalPlanPrice() * 100).toFixed(2);
    store.setData(row.ticker, {'myWeight': val});
    console.log('here');
    return val;
  }
};

</script>

<style scoped>
tr:hover > td {
  background: rgba(0, 0, 0, .03);
}
</style>
