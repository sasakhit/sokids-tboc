const requiredMessage = 'This field is required'

const initialState = {
  userinfo: {
    userid: '',
    passwd: '',
    fullname: '',
    kananame: '',
    phone: '',
    postal: '',
    address: '',
    comment: ''
  },
  errortext: {
    userid: requiredMessage,
    passwd: requiredMessage,
    fullname: requiredMessage,
    kananame: requiredMessage,
    phone: requiredMessage,
    postal: requiredMessage,
    address: requiredMessage
  },
  msg: ''
}

/*
export const inputData = ( name, value ) => {
  const errortext_new = (e.target.value !== '') ? '' : 'This field is required'
  this.setState({
    [name]: e.target.value,
    errortext: Object.assign({}, this.state.errortext, {
      [name]: errortext_new
    })
  })
}
*/

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_SIGNUP_DATA':
      const errortext_new = (action.payload.value !== '') ? '' : requiredMessage
      return Object.assign({}, state, {
        userinfo: Object.assign({}, state.userinfo, {[action.key]: action.payload.value}),
        errortext: Object.assign({}, state.errortext, {[action.key]: errortext_new})
      })
    case 'SET_MSG':
      return Object.assign({}, state, {
        msg: action.payload.msg
      })
    default:
      return state
  }
}
