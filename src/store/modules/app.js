import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      state.language = lang
      setItem(LANG, lang)
    },
    addTagsViewList (state, tag) {
      const isFind = state.tagsViewList.find(item => item.path === tag.path)
      if (isFind) return // 处理重复路由
      state.tagsViewList.push(tag)
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    // 修改指定 tag 修改 title
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - 1)
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(0, payload.index)
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - 1)
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  actions: {}
}
