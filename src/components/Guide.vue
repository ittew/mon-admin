<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="startGuide" />
    </el-tooltip>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from '@/utils/steps'
import { watchSwitchLang } from '@/i18n'

const i18n = useI18n()
let driver = null

onMounted(() => initGuide())
// 引导文字的国际化
watchSwitchLang(() => initGuide())
const initGuide = () => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    animate: false, // 无动画 可以解决白色背景问题 但没有动画效果
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    doneBtnText: i18n.t('msg.guide.finish')
  })
}
const startGuide = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style scoped></style>
