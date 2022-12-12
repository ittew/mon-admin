import { login, getUserInfo } from '@/api/index'
import md5 from 'md5'
import { getItem, removeAllItem, setItem } from '../../utils/storage'
import { TOKEN } from '../../constant/index'
import router from '../../router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(data => {
            this.commit('user/setToken', data.token)
            setTimeStamp() // 记录登录时间
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async getUserInfo() {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 退出登录
     * 1. 清理用户数据  用户信息 和 token
     * 2. 清理掉权限相关配置
     * 3. 跳转到登录页
     */
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
