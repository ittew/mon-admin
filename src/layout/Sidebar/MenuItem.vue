<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <i class="el-icon" v-else><svg-icon :icon="icon"></svg-icon></i>
  <span>{{ title }}</span>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.sub-el-icon {
  font-size: 18px;
}
</style>
