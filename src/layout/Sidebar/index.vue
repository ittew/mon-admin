<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="32"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      ></el-avatar>
      <p class="logo-title" v-if="$store.getters.sidebarOpened">mon-admin</p>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue'
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  :deep .el-avatar {
    --el-avatar-bg-color: none;
  }
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    white-space: nowrap;
  }
}
</style>
