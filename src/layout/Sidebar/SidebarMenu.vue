<template>
  <el-menu
    :uniqueOpened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    router
  >
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-menu>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route.js'
const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  console.log(fRoutes, 'router')
  return generateMenus(fRoutes)
})
const activeMenu = computed(() => {
  const { path } = useRoute()
  return path
})
</script>

<style lang="scss" scoped></style>
