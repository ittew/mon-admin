<template>
  <div>个人信息 {{ $t('msg.login.title') }}</div>
  <el-pagination
    :page-size="100"
    layout="total, prev, pager, next"
    :total="1000"
  />
</template>

<script setup></script>

<style lang="scss" scoped></style>
