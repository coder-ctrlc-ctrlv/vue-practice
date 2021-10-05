<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: v$.email.$error }"
        >
        <label for="email">Email</label>
        <small
          v-if="v$.email.$errors.length !== 0"
          class="helper-text invalid"
        >
          {{ emailErrors[v$.email.$errors[0].$validator] }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: v$.password.$error }"
        >
        <label for="password">Пароль</label>
        <small
          v-if="v$.password.$errors.length !== 0"
          class="helper-text invalid"
        >
          {{ passwordErrors[v$.password.$errors[0].$validator] }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import messages from '../utils/messages'

export default {
  name: 'Login',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    email: '',
    password: '',
    minLengthPassword: 6,
    emailErrors: {
      email: 'Введите корректный email',
      required: 'Поле "Email" не должно быть пустым'
    },
    passwordErrors: {
      minLength: 'Минимальная длина пароля - ',
      required: 'Поле "Пароль" не должно быть пустым'
    }
  }),
  validations () {
    return {
      email: { email, required },
      password: { required, minLength: minLength(this.minLengthPassword) }
    }
  },
  methods: {
    async onSubmit () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        await this.$router.push('/')
      } catch (e) {
        console.log('Ошибка при авторизации - ' + e)
      }
    }
  },
  created () {
    this.passwordErrors.minLength += this.minLengthPassword
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  }
}
</script>

<style scoped>

</style>
