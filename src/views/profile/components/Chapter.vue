<template>
  <el-timeline>
    <el-timeline-item
      v-for="{ content, timestamp, id } in chapterData"
      :key="id"
      placement="top"
      :timestamp="timestamp"
    >
      <el-card>
        <h4>{{ content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { chapter } from '@/api/index'
import { ref } from 'vue'
const chapterData = ref([])
const getChapterData = async () => {
  chapterData.value = await chapter()
}
getChapterData()
</script>

<style lang="scss" scoped></style>
