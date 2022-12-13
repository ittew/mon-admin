<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}

const icon = computed(() =>
  store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
)
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  cursor: pointer;
  line-height: 46px;
  transition: background 0.5s;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .hamburger {
    width: 16px;
    height: 16px;
  }
}
</style>
