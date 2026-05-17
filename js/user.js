// // 对某一项表单的登录和注册表单进行验证的通用代码

// class Fieldvalidator {

//   constructor(txtId, FieldvalidatorFunc) {
//     this.input = $('#' + txtId)
//     this.p = this.input.nextElementSibling
//     this.FieldvalidatorFunc = FieldvalidatorFunc

//     // 失去焦点 点击按钮

//     // 箭头函数没有自己的 this它的 this 永远继承 外层作用域的 this --- 这里就是构造的实例
//     /*
//     this.input.onblur = function () {
//        this.validate()
//      }
//        */

//     this.input.onblur = () => {
//       this.validate()
//     }

//   }

//   // 开始验证 --- 验证方法
//   async validate() {
//     const err = await this.FieldvalidatorFunc(this.input.value)
//     if (err) {
//       this.p.innerText = err
//       return false
//     }
//     else {
//       this.p.innerText = ''
//       return true
//     }
//   }

//   static async validate(...validators) {
//     const proms = validators.map((v) => v.validate())
//     const results = await Promise.all(proms)
//     return results.every((r) => r)
//   }
// }



// function test() {
//   Fieldvalidator.validate(loginIdValidator, nicknameValidator, loginPwdValidator, PwdAginValidator).then(((res) => {
//     console.log(res);
//   }))
// }


class Fieldvalidator {
  // construct 基础框架
  constructor(txtId, FieldvalidatorFunc) {
    this.input = $('#' + txtId)
    this.p = this.input.nextElementSibling

    this.FieldvalidatorFunc = FieldvalidatorFunc


    // 失去焦点和点击注册
    this.input.onblur = () => {
      this.validate()
    }
  }

  // 验证方法 --- 独立于construct外边 (方法)
  /**
   * 有错误消息 显示错误消息 返回 false
   * 没有错误消息 返回 true
   * @returns 
   */
  async validate() {
    const err = await this.FieldvalidatorFunc(this.input.value)
    if (err) {
      this.p.innerText = err
      return false
    }
    else {
      this.p.innerText = ''
      return true
    }
  }

  /**
   * 
   * @param  {...any} validate 
   * 对所有的验证器进行检查 --- 静态方法
   */
  static async validate(...validators) {
    const proms = validators.map((v) => v.validate())
    const result = await Promise.all(proms)
    return result.every((r) => r)
  }
}





function test() {
  Fieldvalidator.validate(loginIdValidator, nicknameValidator, loginPwdValidator, PwdAginValidator).then(((res) => {
    console.log(res);
  }))
}