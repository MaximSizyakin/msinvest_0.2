import {defineStore, acceptHMRUpdate} from 'pinia';

export const useIMOEXStore = defineStore('IMOEX', {
  state: () => ({
    tableData: [],
    something: ''
  }),

  getters: {},

  actions: {
    // Разрываем реактивность между props и store
    loadInitialData(array) {
      this.tableData = JSON.parse(JSON.stringify(array));
    },
    loadData(field, value) {
      this.tableData.forEach((item) => {
        item[field] = value;
      });
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIMOEXStore, import.meta.hot));
}
