<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closeDialog"
  >
    <el-tree
      ref="treeRef"
      show-checkbox
      default-expand-all
      node-key="id"
      check-strictly
      :data="allPermisstion"
      :props="{ children: 'children', label: 'permissionName' }"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">
          {{ $t('msg.universal.cancel') }}
        </el-button>
        <el-button type="primary" :loading="loading" @click="confirmHandle">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  permisstionList,
  rolePermisstion,
  distributePermission
} from '@/api/role'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
// 权限列表
const allPermisstion = ref([])
const getPermisstionList = async () => {
  allPermisstion.value = await permisstionList()
}
getPermisstionList()
const loading = ref(false)
const closeDialog = () => {
  loading.value = false
  emits('update:modelValue', false)
}
const i18n = useI18n()
const confirmHandle = async () => {
  loading.value = true
  const permissions = treeRef.value.getCheckedKeys()
  await distributePermission({ roleId: props.roleId, permissions })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closeDialog()
}
// 当前角色权限
const treeRef = ref(null)
const selectedKeys = ref([])
const getRolePermisstion = async () => {
  selectedKeys.value = await rolePermisstion(props.roleId)
  treeRef.value.setCheckedKeys(selectedKeys.value)
}
watch(
  () => props.roleId,
  val => {
    if (val) getRolePermisstion()
  }
)
</script>

<style lang="scss" scoped></style>
