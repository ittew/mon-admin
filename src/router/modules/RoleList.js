import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/roleList',
      component: () => import('@/views/role-list/index'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
