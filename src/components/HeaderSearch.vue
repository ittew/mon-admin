<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      placeholder="Search"
      default-first-option
      :remote-method="querySearch"
      remote
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { filterRoutes } from '@/utils/route'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { getRoutesData } from './FuseData.js'
import { watchSwitchLang } from '@/i18n'

const isShow = ref(false)

// 检索的路由数据源
const router = useRouter()
let searchPool = computed(() => getSearchData())
// getRouteData
const getSearchData = () => {
  const routes = filterRoutes(router.getRoutes())
  return getRoutesData(routes)
}
// el-select 实例
const headerSearchSelectRef = ref(null)
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

// 搜索
const search = ref('')
const searchOptions = ref([])
const querySearch = query => {
  searchOptions.value = query ? fuse.search(query) : []
}
// 关闭 search
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
  search.value = ''
}
// 监听 search 打开 处理 close事件
watch(isShow, val => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 选中回调
const onSelectChange = val => {
  onClose()
  router.push(val.path)
}

// 搜索框相关
let fuse = null
const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // name：搜索的键  weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)
// 处理 搜索内容的 国际化
watchSwitchLang(() => {
  searchPool = computed(() => getSearchData())
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 20px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
    :deep .el-input .el-input__wrapper {
      box-shadow: none !important;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
