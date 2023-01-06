<template>
  <div>
    <el-card>
      <el-table :data="allRoles" border style="100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="200"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="assignPermissionHandle(row)"
            >
              {{ $t('msg.role.assignPermissions') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <PerssionDialog
      v-model="showPerssionDialog"
      :roleId="selectRole"
    ></PerssionDialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { roleList } from '@/api/role'
import PerssionDialog from './components/PermissionDialog.vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()

// 分配角色
const selectRole = ref('')
const showPerssionDialog = ref(false)
const assignPermissionHandle = row => {
  showPerssionDialog.value = true
  selectRole.value = row.id
}
// 保证每次打开重新获取用户角色数据
watch(showPerssionDialog, val => {
  if (!val) selectRole.value = ''
})
</script>

<style lang="scss" scoped></style>
