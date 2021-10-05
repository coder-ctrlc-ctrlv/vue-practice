import { ref, push, set, child, get } from 'firebase/database'
import { database } from '../main'

export default {
  actions: {
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUserId')
        const categoriesRef = await ref(database, `/users/${uid}/categories`)
        const categoryRef = await push(categoriesRef)
        await set(categoryRef, {
          title: title,
          limit: limit
        })
        return { title, limit, id: categoryRef.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUserId')
        const categoriesRef = await ref(database)
        return get(child(categoriesRef, `/users/${uid}/categories`)).then((snapshot) => {
          const categories = snapshot.val() || {}
          return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
        }).catch((error) => {
          commit('setError', error)
          throw error
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
