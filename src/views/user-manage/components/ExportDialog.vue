<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="myValue"
    @close="closeDialog"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" :loading="loading" @click="confirmHandle">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { watchSwitchLang } from '@/i18n'
import { getAllUserManageList } from '@/api/userManage'
import { USER_RELATIONS } from '@/constant/dictionary.js'
import { dateFormat } from '@/filters'

// 接收参数
defineProps({
  myValue: {
    type: Boolean,
    required: true
  }
})
// 事件注册
const emits = defineEmits(['update:myValue'])
const loading = ref(false)
const confirmHandle = async () => {
  loading.value = true
  // 请求所有员工数据
  const users = (await getAllUserManageList()).list
  console.log(users)
  // 格式化数据
  const data = formatJson(USER_RELATIONS, users)
  console.log(data)
  // 动态导入工具包
  const excel = await import('@/utils/Export2Excel')
  // excel 导出
  excel.export_json_to_excel({
    header: Object.keys(USER_RELATIONS), // 表头
    data, // excel 数据 二维数组
    filename: excelName.value || exportDefaultName, // 文件名称
    autoWidth: true, // 是否自动列宽
    bookType: 'xlsx' // 文件类型
  })
  setTimeout(() => {
    closeDialog()
  }, 300)
}
// 关闭弹窗
const closeDialog = () => {
  loading.value = false
  emits('update:myValue', false)
}
// 指定默认文件名
const i18n = useI18n()
const excelName = ref('')
let exportDefaultName = i18n.t('msg.excel.defaultName')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})
// 将数组转化成二维数组
const formatJson = (headers, rows) => {
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map(item => {
    return Object.keys(headers).map(key => {
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map(role => role.title))
      }
      // 时间特殊处理
      if (headers[key] === 'openTime') {
        return dateFormat(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
