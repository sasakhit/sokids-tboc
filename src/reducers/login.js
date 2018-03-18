const initialState = {
  userid: '',
  passwd: '',
  msg: ''
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_DATA':
      return Object.assign({}, state, {
        [action.key]: action.payload.value
      })
    case 'SET_LOGIN_MSG':
      return Object.assign({}, state, {
        msg: action.payload.msg
      })
    default:
      return state
  }
}
