<template>
  <UploadExcel :onSuccess="onSuccess" />
</template>

<script setup>
import { userBatchImport } from '@/api/userManage'
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS } from '@/constant/dictionary.js'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const i18n = useI18n()
// 数据解析成功之后的回调
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}
// 处理数据字段对应
const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userInfo = {}
    Object.keys(item).forEach(key => {
      // 处理 excel 导入 2019/9/9 解析时间会出现错误
      if (
        USER_RELATIONS[key] === 'openTime' &&
        String(item[key]).indexOf('-') < 0
      ) {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
/**
 * 解析 excel 导入的时间格式
 */
const formatDate = numb => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() + ''
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  )
}
</script>

<style lang="scss" scoped></style>
