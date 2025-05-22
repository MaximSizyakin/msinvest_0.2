import {defineStore, acceptHMRUpdate} from 'pinia';
import {supabase} from "../boot/supabase.js";

export const useIMOEXStore = defineStore('IMOEX', {
  state: () => ({
    data: [
      // {
      //   "index": 0,
      //   "ticker": "AFKS",
      //   "weight": 0.46,
      //   "name": "АФК \"Система\" ПАО ао",
      //   "value": 14.828
      //   "coef":1.25,
      //    "boughtQuantity":7
      // }
    ],
    target: 1400000,
    current: 0,
  }),

  getters: {
    // getPlanQuantity: (state) => (ticker) => {
    //   const idx = state.localData.find(i => i.ticker === ticker).index;
    //   if (state.databaseData.length > 0 && state.databaseData[idx]?.coef) {
    //     return Math.round(state.target * state.localData[idx].weight / 100 * state.databaseData[idx].coef / state.localData[idx].value);
    //   } else {
    //     return 0;
    //   }
    // }
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
        this.updateData(data);
        if (error) throw error;
      } catch (error) {
        console.log('Ошибка при загрузке данных из базы данных IMOEX', error.message);
      }
    },

    updateData(dbData) {
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
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIMOEXStore, import.meta.hot));
}
