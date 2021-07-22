import fetch from './fetch.js'

// // 登录
// export function login (data) {
//   return fetch({
//     url: '',
//     method: 'post',
//     data
//   })
// }
// // 登出
// export function logout () {
//   return fetch({
//     url: '',
//     method: 'post'
//   })
// }
const baseUrl = ''

const orderList = params => {
  return fetch({
    url: `/api/data/${params.category}/${params.limit}/${params.page}`,
    method: 'get',
    params: ''
  })
}

const articleList = params => {
  return fetch({
    url: `/api/search/query/listview/category/Android/count/${params.limit}/page/${params.page}`,
    method: 'get',
    params: ''
  })
}
// ------------------ 开发-----------------

const userLogin = params => {
  return fetch({
    url: baseUrl + '/oauth/token',
    method: 'post',
    data: params
  })
}

const userList = params => {
  return fetch({
    url: baseUrl + '/user/getAllUser',
    method: 'post',
    data: params
  })
}

const userAdd = params => {
  return fetch({
    url: baseUrl + '/user/add',
    method: 'post',
    data: params
  })
}

/**
 * 提交用户注册信息
 * @param params
 */
const postUserInfo = params => {
  return fetch({
    url: '',
    method: 'post',
    data: params
  })
}

/**
 * 验证邮箱 token是否过期
 * @param params
 */
const checkToken = params => {
  return fetch({
    url: '',
    method: 'get',
    params: params
  })
}

const goodsList = params => {
  return fetch({
    url: baseUrl + '/goods/getAllGoods',
    method: 'post',
    params: params
  })
}

const getMenuAll = params => {
  return fetch({
    url: baseUrl + '/menu/getByUserId',
    method: 'get',
    params: ''
  })
}

const addMenu = params => {
  return fetch({
    url: baseUrl + '/menu/add',
    method: 'post',
    data: params
  })
}

const apiList = {
  orderList,
  articleList,
  userLogin,
  userList,
  userAdd,
  postUserInfo,
  checkToken,
  goodsList,
  getMenuAll,
  addMenu
}

export default apiList
