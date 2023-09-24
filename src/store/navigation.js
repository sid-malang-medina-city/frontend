import { defineStore } from 'pinia'

export const navigationStore = defineStore('NavigationStore', {
  state: () => {
    return {
      isCollapse: false
    }
  },

  actions: {
    toggleNavigationBar () {
      this.isCollapse = !this.isCollapse
    }
  }
})
