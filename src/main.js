import { createApp } from 'vue'
import VuelidatePlugin from '@vuelidate/core'
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'

import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDO7jEBYEaB0dDaq3wYkCnRp4RaXciRrsc',
  authDomain: 'vue-practice-test.firebaseapp.com',
  projectId: 'vue-practice-test',
  storageBucket: 'vue-practice-test.appspot.com',
  messagingSenderId: '568851297782',
  appId: '1: 568851297782: веб: 99fe3dbf2dfbdc1357c3d7',
  measurementId: 'G-C2HP8RYZXM'
}

let app
initializeApp(firebaseConfig)
const auth = getAuth()
const database = getDatabase()
onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App)
    app.use(store).use(router).use(VuelidatePlugin).use(messagePlugin).mount('#app')
    app.component('Loader', Loader)
  }
})

export { auth, database }
