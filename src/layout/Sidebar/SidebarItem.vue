<template>
  <el-submenu v-if="route.children.length" :index="route.path">
    <template #title>
      <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
    </template>
    <SidebarItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    />
  </el-submenu>
  <el-menu-item :index="route.path" v-else>
    <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
