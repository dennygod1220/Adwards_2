'use strict'

class guestinfo {
  get rules () {
    return {
      // validation rules
      'store_id':'required',
      'date': 'required',
      'time': 'required',
      'guest_name': 'required',
      'cell_phone': 'required',
      'birthday': 'required',
      'email': 'required|email',

      'guest_invoice': 'required',
      'guest_size': 'required',
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

module.exports = guestinfo
