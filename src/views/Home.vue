<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"/>
    <div v-else class="row">
      <HomeUserMoney :rates="exchangeRates.rates" />
      <HomeExchangeRates
        :rates="exchangeRates.rates"
        :date="exchangeRates.date"
      />
    </div>
  </div>
</template>

<script>
import HomeExchangeRates from '../components/HomeExchangeRates'
import HomeUserMoney from '../components/HomeUserMoney'

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    exchangeRates: null
  }),
  async mounted () {
    this.exchangeRates = await this.$store.dispatch('fetchExchangeRates')
    this.loading = false
  },
  methods: {
    async refresh () {
      this.loading = true
      this.exchangeRates = await this.$store.dispatch('fetchExchangeRates')
      this.loading = false
    }
  },
  components: {
    HomeUserMoney, HomeExchangeRates
  }
}
</script>
