<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            v-model="title"
            id="name"
            type="text"
            :class="{ invalid: v$.title.$error }"
          >
          <label for="name">Название</label>
          <span
            v-if="v$.title.$errors.length !== 0"
            class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
            v-model.number="limit"
            id="limit"
            type="number"
            :class="{ invalid: v$.limit.$error }"
          >
          <label for="limit">Лимит</label>
          <span
            v-if="v$.limit.$errors.length !== 0"
            class="helper-text invalid"
          >
            Минимальная величина {{ v$.limit.minValue.$params.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

export default {
  name: 'CategoryCreate',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    title: '',
    limit: 100
  }),
  validations () {
    return {
      title: { required },
      limit: { minValue: minValue(100) }
    }
  },
  mounted () {
    window.M.updateTextFields()
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 100
        this.v$.$reset()
        this.$message('Категория была создана')
        this.$emit('created', category)
      } catch (e) {
        console.log('Ошибка при создании категории ' + e)
      }
    }
  }
}
</script>

<style scoped>

</style>
