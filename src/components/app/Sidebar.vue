<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpenSidebar}">

    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to=link.url
      custom
      v-slot="{ href, navigate, isExactActive }"
    >
      <li :class="[isExactActive && 'active']">
        <a :href="href" @click="navigate" class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['isOpenSidebar'],
  data: () => ({
    links: [
      { title: 'Счет', url: '/' },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' }
    ]
  })
}
</script>

<style scoped>

</style>
