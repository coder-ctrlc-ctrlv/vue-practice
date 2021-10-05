import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { auth, database } from '../main'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Авторизация выполнена')
        })
        .catch((error) => {
          commit('setError', error)
          throw error
        })
    },
    getUserId () {
      const user = auth.currentUser
      return user ? user.uid : null
    },
    async register ({ dispatch, commit }, { email, password, name }) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Регистрация выполнена')
        })
        .catch((error) => {
          commit('setError', error)
          throw error
        })
      const uid = await dispatch('getUserId')
      await set(await ref(database, `/users/${uid}/info`), {
        money: 10000,
        name: name
      })
    },
    async logout ({ dispatch, commit }) {
      await signOut(auth)
        .then(() => {
          commit('clearInfo')
          console.log('Выход выполнен')
        }).catch((error) => {
          throw error
        })
    }
  }
}
