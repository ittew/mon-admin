<template>
  <el-dropdown trigger="click" @command="setThemeHandle" v-bind="$attrs">
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon icon="change-theme" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{
          $t('msg.theme.themeColorChange')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div>
    <SelectColor v-model="selectColorVisible" />
  </div>
</template>

<script setup>
import SelectColor from './SelectColor'
import { ref } from 'vue'
const selectColorVisible = ref(false)
const setThemeHandle = () => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
