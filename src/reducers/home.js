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
  challenges: [],
  newchallenge: {
    challengename: '',
    challengedate: '',
    paymentmethod: '',
    receipt: '',
    comment: ''
  },
  errortext: {
    userid: '',
    passwd: '',
    lastname: '',
    firstname: '',
    lastname_kana: '',
    firstname_kana: '',
    phone: '',
    postal: '',
    address: '',
    challengename: requiredMessage,
    challengedate: requiredMessage,
    paymentmethod: requiredMessage,
    receipt: requiredMessage
  },
  msg: '',
  tab: 'new',
  open: false
}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_USER_DATA':
      const errortext_user = (action.payload.value !== '') ? '' : requiredMessage
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {[action.payload.key]: action.payload.value}),
        errortext: Object.assign({}, state.errortext, {[action.payload.key]: errortext_user})
      })
    case 'INPUT_CHALLENGE_DATA':
      const errortext_challenge = (action.payload.value !== '') ? '' : requiredMessage
      return Object.assign({}, state, {
        newchallenge: Object.assign({}, state.newchallenge, {[action.payload.key]: action.payload.value}),
        errortext: Object.assign({}, state.errortext, {[action.payload.key]: errortext_challenge})
      })
    case 'SET_USER_INFO':
      return Object.assign({}, state, {
        user: action.payload.user
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
    case 'SET_HOME_MSG':
      return Object.assign({}, state, {
        msg: action.payload.msg
      })
    default:
      return state
  }
}
