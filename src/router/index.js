import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index.vue'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import store from '@/store'

// 私有路由表
export const privateRoutes = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]
// 私有路由表
// const privateRoutes = [
//   {
//     path: '/user',
//     component: layout,
//     redirect: '/user/manage',
//     meta: {
//       title: 'user',
//       icon: 'personnel'
//     },
//     children: [
//       {
//         path: '/user/manage',
//         component: () => import('@/views/user-manage/index'),
//         name: 'userManage',
//         meta: {
//           title: 'userManage',
//           icon: 'personnel-manage'
//         }
//       },
//       {
//         path: '/user/role',
//         component: () => import('@/views/role-list/index'),
//         name: 'roleList',
//         meta: {
//           title: 'roleList',
//           icon: 'role'
//         }
//       },
//       {
//         path: '/user/permission',
//         component: () => import('@/views/permission-list/index'),
//         name: 'permissionList',
//         meta: {
//           title: 'permissionList',
//           icon: 'permission'
//         }
//       },
//       {
//         path: '/user/info/:id',
//         name: 'userInfo',
//         component: () => import('@/views/user-info/index'),
//         meta: {
//           title: 'userInfo'
//         },
//         props: true
//       },
//       {
//         path: '/user/import',
//         name: 'import',
//         component: () => import('@/views/import/index'),
//         meta: {
//           title: 'excelImport'
//         }
//       }
//     ]
//   },
//   {
//     path: '/article',
//     component: layout,
//     redirect: '/article/ranking',
//     meta: {
//       title: 'article',
//       icon: 'article'
//     },
//     children: [
//       {
//         path: '/article/ranking',
//         component: () => import('@/views/article-ranking/index'),
//         name: 'articleRanking',
//         meta: {
//           title: 'articleRanking',
//           icon: 'article-ranking'
//         }
//       },
//       {
//         path: '/article/:id',
//         component: () => import('@/views/article-detail/index'),
//         name: 'articleDetail',
//         meta: {
//           title: 'articleDetail'
//         }
//       },
//       {
//         path: '/article/create',
//         component: () => import('@/views/article-create/index'),
//         name: 'articleCreate',
//         meta: {
//           title: 'articleCreate',
//           icon: 'article-create'
//         }
//       },
//       {
//         path: '/article/editor/:id',
//         name: 'articleEditor',
//         component: () => import('@/views/article-create/index'),
//         meta: {
//           title: 'articleEditor'
//         }
//       }
//     ]
//   }
// ]

// 公共路由表
export const publicRoutes = [
  {
    path: '/',
    redirect: '/profile',
    component: layout,
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile'),
        meta: {
          title: 'profile',
          icon: 'personnel-info'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'All',
    redirect: '/404'
  }
]

export function resetRouter() {
  if (store.getters.userInfo && store.getters.userInfo.permission && store.getters.userInfo.permission.menus) {
    const menus = store.getters.userInfo.permission && store.getters.userInfo.permission.menus
    menus.forEach(menu => {
      router.removeRoute(menu)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
