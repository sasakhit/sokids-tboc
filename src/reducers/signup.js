const requiredMessage = 'required'

const initialState = {
  user: {
    userid: '',
    passwd: '',
    lastname: '',
    firstname: '',
    lastname_kana: '',
    firstname_kana: '',
    phone: '',
    postal: '',
    address: '',
    comment: ''
  },
  errortext: {
    userid: requiredMessage,
    passwd: requiredMessage,
    lastname: requiredMessage,
    firstname: requiredMessage,
    lastname_kana: requiredMessage,
    firstname_kana: requiredMessage,
    phone: requiredMessage,
    postal: requiredMessage,
    address: requiredMessage
  },
  msg: ''
}

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_SIGNUP_DATA':
      const errortext_new = (action.payload.value !== '') ? '' : requiredMessage
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {[action.key]: action.payload.value}),
        errortext: Object.assign({}, state.errortext, {[action.key]: errortext_new})
      })
    case 'SET_SIGNUP_MSG':
      return Object.assign({}, state, {
        msg: action.payload.msg
      })
    default:
      return state
  }
}
