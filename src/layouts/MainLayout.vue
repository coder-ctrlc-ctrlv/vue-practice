<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else class="app-main-layout">
      <Navbar @click-toggle-btn="changeStateSidebar"/>
      <Sidebar :isOpenSidebar="isOpenSidebar"/>
      <main class="app-content" :class="{full : !isOpenSidebar}">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/app/Sidebar'
import Navbar from '../components/app/Navbar'

export default {
  name: 'MainLayout',
  data: () => ({
    isOpenSidebar: true
  }),
  methods: {
    changeStateSidebar () {
      this.isOpenSidebar = !this.isOpenSidebar
    }
  },
  computed: {
    loading () {
      return !Object.keys(this.$store.getters.info).length
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Sidebar, Navbar
  }
}
</script>

<style scoped>

</style>
