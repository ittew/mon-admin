<template>
  <div>
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="onToggle"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

// 监听变化
const changeHandle = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 设置监听器
onMounted(() => {
  screenfull.on('change', changeHandle)
})

// 移除监听器
onUnmounted(() => {
  screenfull.on('change', changeHandle)
})
</script>

<style lang="scss" scoped></style>
