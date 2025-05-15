import {defineStore, acceptHMRUpdate} from 'pinia';
import {supabase} from "../boot/supabase.js";

export const useIMOEXStore = defineStore('IMOEX', {
  state: () => ({
    localData: [
      // {
      //   "index": 0,
      //   "ticker": "AFKS",
      //   "weight": 0.46,
      //   "name": "АФК \"Система\" ПАО ао",
      //   "value": 14.828
      // }
    ],
    databaseData: [
      // {
      //   "id":0,
      //   "created_at":"2025-05-13T11:27:32.934169+00:00",
      //   "ticker":"AFKS",
      //   "coef":1.25,
      //   "boughtQuantity":7
      // }
    ],
    target: 1400000,
    current: 0,
  }),

  getters: {
    getPlanQuantity: (state) => (ticker) => {
      const idx = state.localData.find(i => i.ticker === ticker).index;
      if (state.databaseData.length > 0 && state.databaseData[idx]?.coef) {
        return Math.round(state.target * state.localData[idx].weight / 100 * state.databaseData[idx].coef / state.localData[idx].value);
      } else {
        return 0;
      }
    }
  },

  actions: {
    // Разрываем реактивность между props и store
    loadLocalData(array) {
      try {
        this.localData = JSON.parse(JSON.stringify(array));
        console.log('rows loaded');
      } catch (error) {
        console.log('Ошибка при загрузке данных биржы', error.message);
      }
    },
    addLocalData(data) {
      // если добавлять данные из БД сразу в основной массив
      // что будет с реактивностью props?
    },
    async fetchIMOEXDatabase() {
      try {
        let {data, error} = await supabase.from('IMOEXTable').select('*');
        this.databaseData = data;
        console.log('supabase loaded');
        if (error) throw error;
      } catch (error) {
        console.log('Ошибка при загрузке данных из базы данных IMOEX', error.message);
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIMOEXStore, import.meta.hot));
}
