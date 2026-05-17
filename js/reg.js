// 验证器
const loginIdValidator = new Fieldvalidator('txtLoginId', async function (val) {
  if (!val) {
    return '请填写账号'
  }

  const res = await API.exists(val)
  if (res.data) {
    return '改账号已被占用,请选择其他的账号'
  }
})

const nicknameValidator = new Fieldvalidator('txtNickname', async function (val) {
  if (!val) {
    return '请填写昵称'
  }
})


const loginPwdValidator = new Fieldvalidator('txtLoginPwd', async function (val) {
  if (!val) {
    return '请填写密码'
  }

})

const PwdAginValidator = new Fieldvalidator('txtLoginPwdConfirm', async function (val) {
  if (!val) {
    return '请再次填写并确认密码'
  }
  if (val !== loginPwdValidator.input.value) {
    return '两次密码不一致'
  }
})


const form = $('.user-form')
form.onsubmit = async function (e) {
  e.preventDefault()
  // 拿到结果
  const result = await Fieldvalidator.validate(
    loginIdValidator,
    loginPwdValidator,
    PwdAginValidator,
    nicknameValidator
  )
  if (!result) {
    return
  }
  const resp = await API.reg(
    {
      loginId: loginIdValidator.input.value,
      loginPwd: loginPwdValidator.input.value,
      nickname: nicknameValidator.input.value
    }
  )
  if (resp.code === 0) {
    location.href = '../html/login.html'
  }
}