import request from '@/utils/request'

/**
 * 登录
 * @param {*} data
 * @returns promsie
 */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns promsie
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}

/**
 * 获取介绍信息
 * @returns promsie
 */
export const feature = () => {
  return request({
    url: '/user/feature'
  })
}

/**
 * 获取章节模块信息
 * @returns promsie
 */
export const chapter = () => {
  return request({
    url: '/user/chapter'
  })
}
