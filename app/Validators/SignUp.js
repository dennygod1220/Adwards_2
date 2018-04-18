'use strict'

class SignUp {
  get rules () {
    return {
      // validation rules
      'username' : 'required|unique:users',
      'email':'required|unique:users',
      'password':'required'
    }
  }

  async fails(errorMessages){
    this.ctx.session.withErrors(errorMessages)
    .flashAll()

    return this.ctx.response.redirect('back')
  }

  get messages(){
    return {
      'required':'The {{field}} is required....',
    }
  }

}

module.exports = SignUp
