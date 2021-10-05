<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p
          v-for="(currency, index) of currencies"
          :key="index"
          class="currency-line"
        >
          <span>
            {{ getMoneyUser(currency)}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeUserMoney',
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    baseCurrency () {
      return this.$store.getters.info.money / this.rates.RUB / this.rates.EUR
    }
  },
  methods: {
    getCurrency (currency) {
      return Math.floor(this.baseCurrency * this.rates[currency])
    },
    getMoneyUser (currency) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: currency
      }).format(this.getCurrency(currency))
    }
  }
}
</script>

<style scoped>

</style>
