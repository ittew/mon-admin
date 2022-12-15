<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <LangSelect class="lang-select" effect="light" />
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svgIcon icon="user" />
        </span>
        <el-input
          :placeholder="$t('msg.login.usernamePlaceholder')"
          name="username"
          v-model="loginForm.username"
        />
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svgIcon icon="password" />
        </span>
        <el-input
          :placeholder="$t('msg.login.passwordPlaceholder')"
          :type="passwordType"
          name="password"
          v-model="loginForm.password"
        />
        <span class="show-pwd" @click="changeType">
          <svgIcon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- login button -->
      <el-button
        type="primary"
        @click="loginHandle"
        :loading="loading"
        style="width: 100%; margin-bottom: 30px"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import LangSelect from '@/components/LangSelect'
import { ref, computed } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: computed(() => i18n.t('msg.login.usernameRule'))
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
// 处理密码框显示状态
const passwordType = ref('password')
const changeType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
// 处理登录逻辑
const loading = ref(false)
const loginFormRef = ref(null)
const store = useStore()
const router = useRouter()
const loginHandle = () => {
  loginFormRef.value.validate(valid => {
    if (!valid) return
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(res => {
        router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      .el-input__wrapper {
        background: transparent;
        width: 100%;
        box-shadow: none;
        &.is-focus {
          box-shadow: none;
        }
      }
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;
    line-height: 36px;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .lang-select {
    position: absolute;
    top: 6px;
    right: 0;
    background-color: #fff;
    font-size: 20px;
    padding: 3px;
    border-radius: 4px;
    cursor: pointer;
  }
  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;
  }
}
</style>
