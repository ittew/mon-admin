<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="importExcelHandle">{{
          $t('msg.excel.importExcel')
        }}</el-button>
        <el-button type="success" @click="exportToExcelHandle">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          :label="$t('msg.excel.name')"
          prop="username"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFormat(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="showUserInfo(row._id)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button type="info" size="small" @click="showRoleHandle(row)">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
              $t('msg.excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <ExportDialog v-model:myValue="showDialog" />
    <RoleDialod
      v-model="showRoleDialog"
      :userId="selectUserId"
      @updateRole="getListData"
    />
  </div>
</template>

<script setup>
import { getUserManageList, deleteUser } from '@/api/userManage'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, onActivated, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ExportDialog from './components/ExportDialog.vue'
import RoleDialod from './components/RolesDialog.vue'

const tableData = ref([])
const total = ref(0)
const pageNo = ref(1)
const pageSize = ref(5)
const getListData = async () => {
  const result = await getUserManageList({
    page: pageNo.value,
    size: pageSize.value
  })
  tableData.value = result.list
  total.value = result.total
}
onActivated(getListData)
// 分页大小切换
const handleSizeChange = currentSize => {
  pageSize.value = currentSize
  getListData()
}
// 页码切换
const handleCurrentChange = currentPage => {
  pageNo.value = currentPage
  getListData()
}
// excel导入
const router = useRouter()
const importExcelHandle = () => {
  router.push('/user/import')
}
// 查看员工详情
const showUserInfo = id => {
  router.push(`/user/info/${id}`)
}
// 删除员工
const i18n = useI18n()
const onRemoveClick = row => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    { type: 'warning' }
  )
    .then(async () => {
      await deleteUser(row._id)
      ElMessage.success(i18n.t('msg.excel.removeSuccess'))
      getListData()
    })
    .catch(() => {})
}
// 点击导出
const showDialog = ref(false)
const exportToExcelHandle = () => {
  showDialog.value = true
}
// 分配角色弹窗
const showRoleDialog = ref(false)
const selectUserId = ref('')
const showRoleHandle = row => {
  showRoleDialog.value = true
  selectUserId.value = row._id
}
// 保证每次打开重新获取用户角色数据
watch(showRoleDialog, val => {
  if (!val) selectUserId.value = ''
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    justify-content: center;
  }
}
</style>
