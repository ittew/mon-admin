<template>
  <el-dropdown trigger="click" @command="setLangHandle">
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <svg-icon icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: value => {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
const i18n = useI18n()
const store = useStore()
const language = computed(() => store.getters.language)
const setLangHandle = lang => {
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped></style>
