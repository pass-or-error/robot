// (async function () {
//   // 1. 判断用户是否登录 true - index false - login
//   // ？ 怎么判断呢 --- 通过经验证的token
//   const resp = await API.profile()
//   console.log(resp);
//   const user = resp.data

//   if (!user) {
//     alert('请登录账号！！！')
//     location.href = '../html/login.html'
//     return
//   }

//   // location.href = '../html/index.html'

//   // 这样所有的工作都只能在else里面实现 不好
//   /**
//    * else {
//     // 对应的ID和昵称渲染上
//     $('#nickname').innerText = user.nickname
//     $('#loginId').innerText = user.loginId


//     doms: {

//     }

//     function addChat() {
//       const div = $$$('div')
//       div.class.add('.chat-item')

//       const img = $$$('img')
//       img.class.add('.chat-avatar')
//       img.src = '../'
//     }

//   }
//    */


//   const doms = {
//     aside: {
//       nickname: $('#nickname'),
//       loginId: $('#loginId')
//     },
//     chatContainer: $('.chat-container'),
//     close: $('.close'),
//     input: $('#txtMsg')
//   }


//   // 退出登录
//   doms.close.onclick = function () {
//     API.loginOut()
//     location.href = '../html/login.html'
//   }


//   setUserInfo()
//   function setUserInfo() {
//     doms.aside.nickname.innerText = user.nickname
//     doms.aside.loginId.innerText = user.loginId
//   }

//   function addChat(chatInfo) {
//     const div = $$$('div')
//     div.classList.add('chat-item')
//     if (chatInfo.from) {
//       div.classList.add('me')
//     }


//     const img = $$$('img')
//     img.className = 'chat-avatar'
//     img.src = chatInfo.from ? 'asset/avatar.png' : 'asset/robot-avatar.jpg'

//     const content = $$$('div')
//     content.className = 'chat-content'
//     content.innerText = chatInfo.content

//     const date = $$$('div')
//     date.className = 'chat-date'
//     date.innerText = formatDate(chatInfo.createdAt)

//     div.appendChild(img)
//     div.appendChild(content)
//     div.appendChild(date)
//     doms.chatContainer.appendChild(div)

//   }

//   function formatDate(timestamp) {
//     const date = new Date()
//     const year = date.getFullYear()
//     const month = (date.getMonth() + 1).toString().padStart(2, '0')
//     const day = date.getDate().toString().padStart(2, '0')
//     const hour = date.getHours().toString().padStart(2, '0')
//     const minute = date.getMinutes().toString().padStart(2, '0')
//     const second = date.getSeconds().toString().padStart(2, '0')

//     return `${year}-${month}-${day} ${hour}:${minute}:${second}`
//   }

//   // 滚到最新的消息处
//   function scrollBottom() {
//     doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
//   }
//   // 查询历史记录

//   await History()
//   async function History() {
//     const resp = await API.getHistory()
//     // console.log(resp.data);
//     for (const result of resp.data) {
//       addChat(result)
//     }
//     scrollBottom()
//     // console.log(doms.chatContainer.scrollHeight);
//   }

//   async function sendMsg() {
//     const content = doms.input.value.trim()
//     if (!content) {
//       return
//     }
//     // 先让用户看到自己发的消息
//     addChat({
//       from: user.loginId,
//       to: null,
//       createdAt: Date.now(),
//       content
//     })
//     scrollBottom()

//     // 等待服务器响应
//     const resp = await API.Sendchat(content)
//     addChat({
//       from: null,
//       to: user.loginId,
//       ...resp.data
//     })
//     scrollBottom()
//   }

//   // 提交表单
//   const form = $('.msg-container')
//   // console.log(form);
//   form.onsubmit = function (e) {
//     e.preventDefault()
//     sendMsg()
//     doms.input.value = ''
//   }
//   window.sendMsg = sendMsg
// })()

(async function () {
  //  1. 验证用户是否登录
  const resp = await API.profile()
  console.log(resp);
  const user = resp.data
  if (resp.code !== 0) {
    alert('请登录')
    location.href = './login.html'
  }


  const doms = {
    aside: {
      nickname: $('#nickname'),
      loginId: $('#loginId')
    },
    chatContainer: $('.chat-container'),
    close: $('.close'),
    Msginput: $('#txtMsg')
  }

  // 2. 退出登录
  doms.close.onclick = async function () {
    await API.loginOut()
    location.href = './html/login.html'
  }


  // 3. 把Id和昵称渲染上去
  setUserMsg()
  function setUserMsg() {
    nickname.innerText = user.nickname
    loginId.innerText = user.loginId
  }

  // 4. 创建发送方与接收方的对话盒子

  function addChat(chatInfo) {
    const div = $$$('div')
    div.classList.add('chat-item')
    if (chatInfo.from) {
      div.classList.add('me')
    }

    const img = $$$('img')
    img.className = 'chat-avatar'
    img.src = chatInfo.from ? 'asset/avatar.png' : 'asset/robot-avatar.jpg'

    const content = $$$('div')
    content.className = 'chat-content'
    content.innerText = chatInfo.content

    const date = $$$('div')
    date.className = 'chat-date'
    date.innerText = formatDate(chatInfo.createdAt)

    div.appendChild(img)
    div.appendChild(content)
    div.appendChild(date)
    doms.chatContainer.appendChild(div)

  }

  // 格式化时间
  function formatDate(timestamp) {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }

  formatDate()

  // 5. 获取历史记录
  await getHistory()
  async function getHistory() {
    const resp = await API.getHistory()
    for (const result of resp.data) {
      addChat(result)
    }
    scrollBottom()
  }

  // 让滚轮滚到最后
  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
  }

  async function sendChat() {
    const msg = doms.Msginput.value.trim()
    if (!msg) {
      return
    }
    // 先让用户看到自己发的消息
    addChat({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      // 注意这里的写法
      content: msg
    })
    scrollBottom()

    // 等待服务器的响应
    const resp = await API.Sendchat(msg)
    addChat({
      from: null,
      to: user.loginId,
      ...resp.data
    })
    scrollBottom()

  }

  const form = $('.msg-container')
  form.onsubmit = function (e) {
    e.preventDefault()
    sendChat()
    doms.Msginput.value = ''
  }
  window.sendChat = sendChat

})()



