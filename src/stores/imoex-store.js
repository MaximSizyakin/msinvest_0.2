import {defineStore, acceptHMRUpdate} from 'pinia';
import {supabase} from "../boot/supabase.js";
import {computed} from "vue";

export const useIMOEXStore = defineStore('IMOEX', {
  state: () => ({
    data: [// {
      //   "index": 0,
      //   "ticker": "AFKS",
      //   "weight": 0.46,
      //   "name": "АФК \"Система\" ПАО ао",
      //   "value": 14.828
      //   "coef":1.25,
      //    "boughtQuantity":7
      // }
    ],
    target: "1400000",
    current: 0,
  }),

  getters: {
    getTarget() {
      return parseFloat(this.target.replaceAll(' ', ''));
    },

    getTotalWeight() {
      let sum = null;
      this.data.forEach(i => {
        if (i.weight) sum += i.weight;
      });
      return Math.round(sum * 100) / 100;
    },

    getTotalPlanPrice() {
      let sum = null;
      this.data.forEach(i => {
        if (i.planPrice) sum += i.planPrice;
      });
      return Math.round(sum);
    },
  },

  actions: {
    setInitialData(array) {
      try {
        // Разрываем реактивность
        this.data = JSON.parse(JSON.stringify(array));
      } catch (error) {
        console.log('Ошибка при загрузке данных биржы', error.message);
      }
    },

    async fetchIMOEXDatabase() {
      try {
        let {data, error} = await supabase.from('IMOEXTable').select('*');
        this.syncDataWithDB(data);
        if (error) throw error;
      } catch (error) {
        console.log('Ошибка при загрузке данных из базы данных IMOEX', error.message);
      }
    },

    syncDataWithDB(dbData) {
      this.data.forEach((item, index) => {
        const el = dbData.find((el => el.ticker === item.ticker));
        if (el) {
          this.data[index].coef = el.coef;
          this.data[index].boughtQuantity = el.boughtQuantity;
        } else {
          this.data[index].coef = 1;
          this.data[index].boughtQuantity = 1;
          this.insertDBData(item);
        }
      });
    },

    async insertDBData(payload) {
      console.log('payload', payload);
      const {data, error} = await supabase
        .from('IMOEXTable')
        .insert([
          {ticker: payload.ticker, coef: payload.coef, boughtQuantity: payload.boughtQuantity},
        ]);
    },

    async updateDBData(ticker, payload) {
      try {
        const {data, error} = await supabase
          .from('IMOEXTable')
          .update(payload)
          .eq('ticker', ticker)
          .select();
        if (error) throw error;
      } catch (error) {
        console.log('Ошибка при обновлении базы данных IMOEX', error.message);
      }
    },

    getIndexByTicker(ticker) {
      return this.data.findIndex(i => i.ticker === ticker);
    },

    setData(ticker, payload) {
      const idx = this.getIndexByTicker(ticker);
      Object.assign(this.data[idx], payload);
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIMOEXStore, import.meta.hot));
}
