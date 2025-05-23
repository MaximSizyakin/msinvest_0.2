import {defineStore, acceptHMRUpdate} from 'pinia';
import {supabase} from "../boot/supabase.js";

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
    ], target: "1400000", current: 0,
  }),

  getters: {
    getTarget() {
      return parseFloat(this.target.replaceAll(' ', ''));
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
        this.updateDataFromDB(data);
        if (error) throw error;
      } catch (error) {
        console.log('Ошибка при загрузке данных из базы данных IMOEX', error.message);
      }
    },

    updateDataFromDB(dbData) {
      this.data.forEach((item, index) => {
        const el = dbData.find((el => el.ticker === item.ticker));
        if (el) {
          this.data[index].coef = el.coef;
          this.data[index].boughtQuantity = el.boughtQuantity;
        } else {
          this.data[index].coef = 1;
          this.data[index].boughtQuantity = 1;
        }
      });
    },

    updateData(data) {
      console.log(data);
    },

    setPlanQuantity(ticker) {
      const idx = this.data.findIndex(i => i.ticker === ticker);
      if (this.data[idx].coef) {
        const qtty = Math.round(this.getTarget * this.data[idx].weight / 100 * this.data[idx].coef / this.data[idx].value);
        this.data[idx].planQuantity = qtty;
        return qtty;
      } else {
        return '-';
      }
    },

    setPlanPrice(ticker) {
      const idx = this.data.findIndex(i => i.ticker === ticker);
      if (this.data[idx].planQuantity) {
        const price = Math.round(this.data[idx].value * this.data[idx].planQuantity);
        this.data[idx].planPrice = price;
        return price;
      } else {
        return '-';
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIMOEXStore, import.meta.hot));
}
