<template>
  <div class="q-pa-md">
    <q-input
      filled
      v-model.number="target"
      prefix="₽"
      mask="### ### ### ###"
      reverse-fill-mask
      debounce="1000"
      :rules="[val => !!val || 'Не может быть пустым']"
      style="max-width: 200px"
    />
    <q-input
      filled
      disable
      v-model="current"
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

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="count" :props="props">{{ props.row.index + 1 }}</q-td>
        <q-td key="ticker" :props="props">{{ props.row.ticker }}</q-td>
        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
        <q-td key="weight" :props="props">{{ props.row.weight }}</q-td>
        <q-td key="coef" :props="props"></q-td>
        <!--          <q-popup-edit v-model="props.row.coef" v-slot="scope">-->
        <!--            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="console.log(props.row)"/>-->
        <!--          </q-popup-edit>-->

        <q-td key="value" :props="props">{{ props.row.value }}</q-td>
        <q-td key="planQuantity" :props="props">
          {{ (target * props.row.weight / 100 * 1 / props.row.value).toFixed(0) }}
        </q-td>
        <!--        Как обратиться к полю выше?-->
        <q-td key="planPrice" :props="props" ref="itemRefs">100</q-td>
        <q-td key="myWeight"></q-td>
        <q-td key="weightQuantity"></q-td>
        <q-td key="weightPrice"></q-td>
        <q-td key="boughtQuantity"></q-td>
        <q-td key="boughtPrice"></q-td>
        <q-td key="done"></q-td>
        <q-td key="buy"></q-td>
        <q-td key="sell"></q-td>
        <q-td key="comment"></q-td>
      </q-tr>
    </template>

    <template v-slot:bottom-row="props">
      <q-tr style="text-align: center">
        <q-td>1</q-td>
        <q-td>2</q-td>
        <q-td>3</q-td>
        <q-td>4</q-td>
        <q-td>{{ totalWeight }}</q-td>
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

<!--Таблица получает данные из страницы и делает свои расчеты внутри-->

<script setup>
import columns from "./columns";
import {computed, onMounted, ref, useTemplateRef, watch} from "vue";

const target = ref(1400000);

const itemRefs = ref([]);
onMounted(() => console.log(itemRefs.value));

const current = ref();

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

const totalWeight = computed(() => {
  let data = null;
  rows.forEach(i => data += i.weight);
  return Math.round(data);
});
</script>

<style scoped>
tr:hover > td {
  background: rgba(0, 0, 0, .03);
}
</style>
