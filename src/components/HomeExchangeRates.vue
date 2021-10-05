<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(currency, index) of currencies" :key="index">
            <td>{{ currency }}</td>
            <td>{{ rates[currency].toFixed(3) }}</td>
            <td>{{ correctedDate }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeExchangeRates',
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    correctedDate () {
      const dateFormat = new Date(this.date)
      const options = {}
      options.day = '2-digit'
      options.month = 'long'
      options.year = 'numeric'
      return new Intl.DateTimeFormat('ru-RU', options).format(dateFormat)
    }
  }
}
</script>

<style scoped>

</style>
