<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="currrentUserRoles">
      <el-checkbox
        v-for="{ title, id } in allRoleList"
        :key="id"
        :label="title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { userRoles, updateRoles } from '@/api/userManage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])
const closed = () => {
  emits('update:modelValue', false)
}
const i18n = useI18n()
const onConfirm = async () => {
  const roles = currrentUserRoles.value.map(title => {
    return allRoleList.value.find(role => role.title === title)
  })
  await updateRoles(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  emits('updateRole')
  closed()
}
const allRoleList = ref([])
// 获取所有角色
const getRoleList = async () => {
  allRoleList.value = await roleList()
}
getRoleList()
// 当前用户角色
const currrentUserRoles = ref([])
const getUsersRoles = async () => {
  const res = await userRoles(props.userId)
  currrentUserRoles.value = res.role.map(item => item.title)
}
// 防止 userId 初始值 为空 调用接口报错
watch(
  () => props.userId,
  val => {
    if (val) getUsersRoles()
  }
)
</script>

<style lang="scss" scoped></style>
