import variables from '@/styles/variables.module.scss'
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  hasUserInfo: state => JSON.stringify(state.user.userInfo) !== '{}',
  cssVar: () => variables,
  sidebarOpened: state => state.app.sidebarOpened
}
export default getters