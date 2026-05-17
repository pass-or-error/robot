// const BASE_URL = 'https://study.duyiedu.com'
// const TOKEN_KEY = 'token'


// // 对于 'Content-Type': 'application/json'和
// // await post('/api/user/reg', userInfo) 引号用来包裹内容

// // const BASE_URL = 'https://study.duyiedu.com'
// // path = '/api/user/reg'
// // return fetch(BASE_URL + path, { headers });
// // 为什么这个可以等效于 'https://study.duyiedu.com/api/user/reg'

// function get(path) {
//   // 请求头是否为空
//   const headers = {}
//   const token = localStorage.getItem(TOKEN_KEY)
//   if (token) {
//     headers.authorization = `Bearer ${token}`;
//   }

//   // 正常情况下 fetch('') 对于下面的url+path本身已经是字符串了
//   return fetch(BASE_URL + path, { headers });
//   // 拼接完毕之后 --- fetch('https://study.duyiedu.com' + '/api/user/reg', { headers });
// }


// function post(path, bodyObj) {
//   // 请求头是否为空
//   const headers = {
//     'Content-Type': 'application/json'
//   }
//   const token = localStorage.getItem(TOKEN_KEY)
//   if (token) {
//     headers.authorization = `Bearer ${token}`;
//   }
//   return fetch(BASE_URL + path, { headers, method: 'POST', body: JSON.stringify(bodyObj) });
// }


// // 用户注册
// async function reg(userInfo) {
//   const resp = await post('/api/user/reg', userInfo)
//   return await resp.json()
// }


// // 用户登录
// async function login(loginInfo) {
//   const resp = await post('/api/user/login', loginInfo)
//   // 获取token 还有下一步动作
//   const result = await resp.json()
//   console.log(result);
//   if (result.code === 0) {
//     const token = resp.headers.get('authorization');
//     localStorage.setItem(TOKEN_KEY, token)
//   }
//   return result
// }

// // 验证账号
// async function exists(loginId) {
//   // ??
//   const resp = await get('/api/user/exists?loginId=' + loginId);
//   return await resp.json()
// }

// // 获得登录的用户信息
// async function proflie() {
//   const resp = await get('/api/user/profile');
//   return await resp.json()
// }

// // 发送消息
// async function sendChat(content) {
//   const resp = await post('/api/chat', content);
//   return await resp.json()
// }

// // 获取聊天记录
// async function getHistory() {
//   const resp = await get('/api/chat/history');
//   return await resp.json()
// }

const API = (function (params) {
  const BASE_URL = 'https://study.duyiedu.com'
  const TOKEN_KEY = 'token'

  function get(path) {
    const token = localStorage.getItem('token')
    const headers = {}
    if (token) {
      headers.authorization = `Bearer ${token}`
    }
    return fetch(BASE_URL + path, { headers })
  }


  function post(path, bodyObj) {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json'
    }
    if (token) {
      headers.authorization = `Bearer ${token}`
    }
    // 请求头的提交方式别忘了
    return fetch(BASE_URL + path, { headers, method: 'POST', body: JSON.stringify(bodyObj) })
  }

  // 注册
  async function reg(regInfo) {
    const resp = await post('/api/user/reg', regInfo)
    return resp.json()
  }

  // 登录
  async function login(loginInfo) {
    const resp = await post('/api/user/login', loginInfo)
    // 把token存入本地
    const token = resp.headers.get('authorization')
    localStorage.setItem(TOKEN_KEY, token)
    return resp.json()
  }

  // 验证账号
  async function exists(loginId) {
    const resp = await get('/api/user/exists?loginId=' + loginId)
    return resp.json()
  }

  // 获取当前登录的用户信息
  async function profile() {
    const resp = await get('/api/user/profile')
    return resp.json()
  }

  // 发送聊天消息
  async function Sendchat(content) {
    // 这里传的是对象！！！
    const resp = await post('/api/chat', { content })
    return resp.json()
  }

  // 获取聊天记录
  async function getHistory() {
    const resp = await get('/api/chat/history')
    return resp.json()
  }

  // 退出登录 
  function loginOut() {
    // 删除token即可
    localStorage.removeItem('token')
  }
  return {
    reg,
    login,
    exists,
    getHistory,
    profile,
    Sendchat,
    loginOut
  }
})()

