<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
    </div>
    <input
      type="file"
      ref="excelUpload"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <UploadFilled style="width: 30px; height: 30px" />
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import XLSX from 'xlsx'

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  onSuccess: Function
})
const loading = ref(false)
const excelUpload = ref(null)
const handleUpload = () => {
  excelUpload.value.click()
}
const handleChange = e => {
  const file = e.target.files
  const rawFile = file[0]
  if (!rawFile) return
  upload(rawFile)
}
const handleDrop = e => {
  if (loading.value) return
  const files = e.dataTransfer.files
  if (!files.length) {
    ElMessage.error('必须上传一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx , .xls, .csv 格式')
    return false
  }
  upload(rawFile)
}
const handleDragover = e => {
  e.dataTransfer.dropEffect = 'copy'
}
// 触发上传事件
const upload = rawFile => {
  excelUpload.value.value = null
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}
// 读取数据（异步）
const readerData = rawFile => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 读取完成时触发
    reader.onload = e => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一行表格（工作簿）名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取Sheet1第一张表格的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析表头数据
      const header = getHeaderRow(worksheet)
      console.log(header)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      console.log(results)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. 关闭loading
      loading.value = false
      // 9. 异步完成 成功回调
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}
// 获取表头数据
const getHeaderRow = sheet => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  for (C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    let hdr = 'UNKNOWN' + C
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}
// 根据导入内容 生成数据
const generateData = excelData => {
  props.onSuccess && props.onSuccess(excelData)
}
// isExcel
const isExcel = file => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .drop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
  }
}
</style>
