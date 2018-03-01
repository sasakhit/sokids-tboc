const requiredMessage = 'This field is required'

const initialState = {
  users: [],
  msg: '',
  tab: 'main',
  open: false
}

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_ADMIN_DATA':
      //To Do
      return state
    case 'SET_USERS':
      return Object.assign({}, state, {
        users: action.payload.users
      })
    case 'SET_MSG':
      return Object.assign({}, state, {
        msg: action.payload.msg
      })
    default:
      return state
  }
}
