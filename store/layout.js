// store/layout.js
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore({
  id: 'layout-store',
  state: () => ({
    isLoading: false,
    messenger: []
    /* Exemplo:
    {
      message: '',
      type: 0 // 0 para erro e 1 para sucesso
    }
    */
  }),
  actions: {
    toggleLoading(bool) {
      this.isLoading = bool
    },
    setMessage(message) {
      this.messenger.push(message)
    },
    clearMessages() {
      this.messenger.length = 0
    }
  },
  getters: {
    getLoader(state) {
      return state.isLoading
    },
    getMessages(state) {
      return state.messenger
    }
  }
})
