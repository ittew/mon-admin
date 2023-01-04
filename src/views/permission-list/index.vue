<template>
  <div>
    <el-card>
      <el-table
        :data="allPermission"
        style="width: 100%; margin-bottom: 20px"
        border
        default-expand-all
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { permisstionList } from '@/api/role'
import { ref } from 'vue'

/**
 * 权限分级：
 * 1. 一级权限为页面权限
 *  permissionMark 对应 路由名称
 * 2. 二级权限为功能权限
 *  permissionMark 对应 功能权限表
 */
// 所有权限
const allPermission = ref([])
const getPermisstionList = async () => {
  allPermission.value = await permisstionList()
}
getPermisstionList()
</script>

<style lang="scss" scoped></style>
