<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme.js'

const store = useStore()
generateNewStyle(store.getters.mainColor).then(newStyleText => {
  writeNewStyle(newStyleText)
})
// const newStyleText = await generateNewStyle(store.getters.mainColor)
// writeNewStyle(newStyleText)
</script>

<style lang="scss"></style>
