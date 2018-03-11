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
  challenges: [],
  newchallenge: {
    nameofchallenge: '',
    dateofchallenge: '',
    paymentmethod: '',
    receipt: '',
    comment: ''
  },
  errortext: {
    userid: '',
    passwd: '',
    fullname: '',
    kananame: '',
    phone: '',
    postal: '',
    address: '',
    nameofchallenge: requiredMessage,
    dateofchallenge: requiredMessage,
    paymentmethod: requiredMessage,
    receipt: requiredMessage
  },
  msg: '',
  tab: 'new',
  open: false
}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_CHALLENGE_DATA':
      const errortext_new = (action.payload.value !== '') ? '' : requiredMessage
      return Object.assign({}, state, {
        newchallenge: Object.assign({}, state.newchallenge, {[action.key]: action.payload.value}),
        errortext: Object.assign({}, state.errortext, {[action.key]: errortext_new})
      })
    case 'SET_USER_INFO':
      return Object.assign({}, state, {
        userinfo: action.payload.userinfo
      })
    case 'SET_CHALLENGES':
      return Object.assign({}, state, {
        challenges: action.payload.challenges
      })
    case 'CHANGE_TAB':
      return Object.assign({}, state, {
        tab: action.payload.tab
      })
    case 'OPEN_CLOSE_DIALOG':
      return Object.assign({}, state, {
        open: action.payload.open
      })
    case 'SET_MSG':
      return Object.assign({}, state, {
        msg: action.payload.msg
      })
    default:
      return state
  }
}
