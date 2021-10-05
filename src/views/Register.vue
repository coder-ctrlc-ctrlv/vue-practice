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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: v$.name.$error }"
        >
        <label for="name">Имя</label>
        <small
          v-if="v$.name.$errors.length !== 0"
          class="helper-text invalid"
        >
          {{ nameErrors[v$.name.$errors[0].$validator] }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'

export default {
  name: 'Register',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    email: '',
    password: '',
    minLengthPassword: 6,
    name: '',
    agree: false,
    emailErrors: {
      email: 'Введите корректный email',
      required: 'Поле "Email" не должно быть пустым'
    },
    passwordErrors: {
      minLength: 'Минимальная длина пароля - ',
      required: 'Поле "Пароль" не должно быть пустым'
    },
    nameErrors: {
      required: 'Поле "Имя" не должно быть пустым'
    }
  }),
  validations () {
    return {
      email: { email, required },
      password: { required, minLength: minLength(this.minLengthPassword) },
      name: { required },
      agree: { checked: value => value }
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
        password: this.password,
        name: this.name

      }
      try {
        await this.$store.dispatch('register', formData)
        await this.$router.push('/')
      } catch (e) {
        console.log('Ошибка при регистрации - ' + e)
      }
    }
  },
  created () {
    this.passwordErrors.minLength += this.minLengthPassword
  }
}
</script>

<style scoped>

</style>
