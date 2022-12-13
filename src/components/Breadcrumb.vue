<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{
          item.meta.title
        }}</span>
        <span class="redirect" @click="onLinkClick(item)" v-else>{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// 获取路由表数据
const route = useRoute()
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    item => item.meta && item.meta.title
  )
}
// 监听路由变化 实时获取路由表
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  { immediate: true }
)
// 面包屑跳转
const router = useRouter()
const onLinkClick = item => {
  router.push(item.path)
}
// 面包屑 hover 高亮
const store = useStore()
const linkHoverColor = store.getters.cssVar.menuBg
</script>

<style lang="scss" scoped>
.breadcrumb {
  :deep .no-redirect {
    color: #97a8be !important;
  }
  .redirect {
    cursor: pointer;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
}
// 面包屑 动画
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-leave-active {
  position: absolute;
}
</style>
