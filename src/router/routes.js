import Home from '@/components/layout/Home'
import Index from '@/components/views/Index'

const Chart = () => import('@/components/views/Chart')
const NotFound = () => import('@/components/pages/NotFound')
const Register = () => import('@/components/pages/Register')
const E404 = () => import('@/components/pages/E404')
const Icon = () => import('@/components/pages/Icon')
const Login = () => import('@/components/pages/Login')

// user
const UserIndex = () => import('@/components/views/user/Index')
const UserList = () => import('@/components/views/user/UserList')
const UserEdit = () => import('@/components/views/user/UserEdit')

// goods
const GoodsIndex = () => import('@/components/views/goods/Index')
const GoodsList = () => import('@/components/views/goods/GoodsList')
const GoodsEdit = () => import('@/components/views/goods/GoodsEdit')

const Table = () => import('@/components/views/Table')
const UserInfo = () => import('@/components/views/UserInfo')

const List = () => import('@/components/views/List')
const Filter = () => import('@/components/pages/Filter')
const Lock = () => import('@/components/layout/base/Lock')


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: Chart,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/list',
        name: 'list',
        component: List,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: UserInfo,
        icon: 'icon-addpeople_fill',
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/userIndex',
        name: '用户列表',
        component: UserIndex,
        icon: 'icon-addpeople_fill',
        meta: {
          requiresAuth: true // 是否需要登录
        },
        redirect: '/userIndex/userList',
        children: [
          {
            path: 'userList',
            name: '用户列表',
            component: UserList
          },
          {
            path: 'userEdit',
            name: '编辑用户',
            component: UserEdit
          }
        ]
      },
      {
        path: '/table',
        name: 'table',
        component: Table,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/icon',
        name: 'icon',
        component: Icon,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/filter',
        name: 'filter',
        component: Filter,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/notFound',
        name: 'notFound',
        component: NotFound,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/goods',
        name: '商品列表',
        component: GoodsIndex,
        meta: {
          requiresAuth: true // 是否需要登录
        },
        redirect: '/goods/goodsList',
        children: [
          {
            path: 'goodsList',
            name: '商品列表',
            component: GoodsList
          },
          {
            path: 'goodsEdit',
            name: '编辑商品',
            component: GoodsEdit
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/error404',
    name: 'error404',
    component: E404
  },
  {
    path: '/lock',
    name: 'lock',
    component: Lock
  },
  {
    path: '*',
    redirect: '/notFound'
  }
]

export default routes
