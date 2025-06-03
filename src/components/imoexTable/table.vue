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
        <q-td key="weight" :props="props">{{ props.row.weight }}%</q-td>
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
        <q-td key="myWeight" :props="props">{{ myWeight(props.row) }}%</q-td>
        <q-td key="weightQuantity" :props="props">{{ weightQuantity(props.row) }}</q-td>
        <q-td key="weightPrice" :props="props">{{ weightPrice(props.row) }}</q-td>
        <q-td key="boughtQuantity" :props="props">
          {{ props.row.boughtQuantity }}
        </q-td>
        <q-td key="boughtPrice" :props="props">{{ boughtPrice(props.row) }}</q-td>
        <q-td key="done" :props="props">{{ done(props.row) }}</q-td>
        <q-td key="buy" :props="props">{{ buy(props.row) }}</q-td>
        <q-td key="sell" :props="props">{{ sell(props.row) }}</q-td>
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
        <q-td>8</q-td>
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
  if (row.coef && row.value && !loading) {
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
    // двойной рендеринг из-за расчета totalPlanPrice
    const val = (row.planPrice / totalPlanPrice() * 100).toFixed(2);
    store.setData(row.ticker, {'myWeight': val});
    // остановился здесь
    console.log('here');
    return val;
  }
};

const weightQuantity = (row) => {
  if (row.myWeight && !loading) {
    const val = Math.round(store.getTarget * row.myWeight / row.value / 100);
    store.setData(row.ticker, {'weightQuantity': val});

    return val.toLocaleString();
  }
};

const weightPrice = (row) => {
  if (row.weightQuantity && !loading) {
    const val = Math.round(row.value * row.weightQuantity);
    store.setData(row.ticker, {'weightPrice': val});
    return val.toLocaleString();
  }
};

const boughtPrice = (row) => {
  if (row.boughtQuantity && !loading) {
    const val = Math.round(row.value * row.boughtQuantity);
    store.setData(row.ticker, {'boughtPrice': val});
    return val.toLocaleString();
  }
};

const done = (row) => {
  if (row.boughtQuantity && !loading) {
    const val = (row.boughtQuantity / row.weightQuantity);
    store.setData(row.ticker, {'done': val});

    return val.toLocaleString();
  }
};

const buy = (row) => {
  if (row.boughtPrice && !loading) {
    const val = row.weightPrice - row.boughtPrice;
    return val < 0 ? 0 : val.toLocaleString();
  }
};

const sell = (row) => {
  if (row.boughtPrice && !loading) {
    const val = row.weightPrice - row.boughtPrice;
    return val < 0 ? val.toLocaleString() : 0;
  }
};

</script>

<style scoped>
tr:hover > td {
  background: rgba(0, 0, 0, .03);
}
</style>
