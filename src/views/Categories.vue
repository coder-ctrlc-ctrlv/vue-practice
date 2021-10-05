<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit :categories="categories"/>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'

export default {
  name: 'Categories',
  data: () => ({
    categories: [],
    loading: true
  }),
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    }
  },
  async mounted () {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
    } catch (e) {
      console.log('Ошибка при получении категорий ' + e)
    }
  },
  components: {
    CategoryEdit, CategoryCreate
  }
}
</script>

<style scoped>

</style>
