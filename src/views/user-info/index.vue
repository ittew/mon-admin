<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" :loading="printLoading" v-print="printObj">
        {{ $t('msg.userInfo.print') }}
      </el-button>
    </el-card>
    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <!-- 标题 -->
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
        <!-- 头部渲染表格 -->
        <div class="header">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">
              {{ detailData.username }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">
              {{ detailData.gender }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">
              {{ detailData.mobile }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">
              {{ $filters.dateFormat(detailData.openTime) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, index) in detailData.remark"
                :key="index"
              >
                {{ item }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item
              class-name="no-border"
              :label="$t('msg.userInfo.address')"
              :span="2"
            >
              {{ detailData.address }}
            </el-descriptions-item>
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image
            class="avatar"
            :src="detailData.avatar"
            :preview-src-list="[detailData.avatar]"
          ></el-image>
        </div>
        <div class="body">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span>
                    {{ $filters.dateFormat(item.startTime, 'YYYY/MM') }}
                    ----
                    {{ $filters.dateFormat(item.endTime, 'YYYY/MM') }}</span
                  >
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 尾部签名 -->
        <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { getUserDetail } from '@/api/userManage'
import { ref } from 'vue'
// 在组件中获取接口路由传递参数 要使用 路由定义中的 props: true [vue-router Props 传参]
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const detailData = ref({})
// 获取详情数据
const queryUserDetail = async () => {
  detailData.value = await getUserDetail(props.id)
}
queryUserDetail()
// 打印相关
const printLoading = ref(false)
// 创建打印对象
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'mon-admin',
  // 打印前
  beforeOpenCallback() {
    printLoading.value = true
  },
  // 执行打印
  openCallback() {
    printLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    :deep .el-descriptions {
      flex-grow: 1;
    }
    :deep .no-border {
      border-bottom: 0;
    }
    .avatar {
      width: 170px;
      height: 160px;
      box-sizing: border-box;
      padding: 10px 20px;
      border-right: 1px solid #ebeef5;
      border-top: 1px solid #ebeef5;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
