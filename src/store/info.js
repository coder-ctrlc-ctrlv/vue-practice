import { database } from '../main'
import { ref, onValue } from 'firebase/database'

export default {
  state: {
    info: { }
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUserId')
        const infoRef = await ref(database, `users/${uid}/info`)
        onValue(infoRef, (snapshot) => {
          const info = snapshot.val()
          commit('setInfo', info)
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
