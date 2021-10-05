<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="currentCategory">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model="title"
            :class="{ invalid: v$.title.$error }"
          >
          <label for="name">Название</label>
          <span v-if="v$.title.$errors.length !== 0" class="helper-text invalid">TITLE</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{ invalid: v$.limit.$error }"
          >
          <label for="limit">Лимит</label>
          <span v-if="v$.limit.$errors.length !== 0" class="helper-text invalid">LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'

export default {
  name: 'CategoryEdit',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    currentCategory: null
  }),
  validations () {
    return {
      title: { required },
      limit: { minValue: minValue(100) }
    }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      console.log('найс')
      // try {
      //   const category = await this.$store.dispatch('createCategory', {
      //     title: this.title,
      //     limit: this.limit
      //   })
      //   this.title = ''
      //   this.limit = 100
      //   this.v$.$reset()
      //   this.$message('Категория была создана')
      //   this.$emit('created', category)
      // } catch (e) {
      //   console.log('Ошибка при создании категории ' + e)
      // }
    }
  },
  mounted () {
    this.select = window.M.FormSelect.init(this.$refs.select)
    window.M.updateTextFields()
  },
  unmounted () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>

</style>
