export default {
  methods: {
    async redirectTo (route, { query, params } = {}) {
      try {
        await this.$router.push({
          name: route,
          query: query,
          params: params
        })
      } catch (e) {}
    },
    async setRouteParam (route, query, params = {}) {
      try {
        await this.$router.replace({
          name: route,
          query: query,
          params: params
        })
      } catch (e) {}
    }
  }
}