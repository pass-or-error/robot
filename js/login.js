

// 验证器这块不管密码是否正确 只有在登录之后才能验证
const loginIdValidator = new Fieldvalidator('txtLoginId', async function (val) {
  if (!val) {
    return '请填写账号'
  }
})


const loginPwdValidator = new Fieldvalidator('txtLoginPwd', async function (val) {
  if (!val) {
    return '请填写密码'
  }
})

const form = $('.user-form')
form.onsubmit = async function (e) {
  e.preventDefault()
  const result = await Fieldvalidator.validate(
    loginIdValidator,
    loginPwdValidator,
  )
  if (!result) {
    return
  }
  const resp = await API.login(
    {
      loginId: loginIdValidator.input.value,
      loginPwd: loginPwdValidator.input.value
    }
  )

  if (resp.code === 0) {
    alert('登录成功,点击确认进入主页面')
    location.href = './index.html'

  }
  else {
    alert('账号或密码错误,请检查')
    loginPwdValidator.input.value = ''
  }

}


