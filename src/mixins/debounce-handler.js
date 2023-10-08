export default {
  data () {
    return {
      debounceId: null
    }
  },

  methods: {
    debounceDelay (callback, delay = 700) {
      clearTimeout(this.debounceId)
      this.debounceId = setTimeout(callback, delay)
    }
  }
}