const requiredMessage = 'This field is required'

const initialState = {
  users: [],
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
  challenge: {
    challengename: '',
    challengedate: '',
    paymentmethod: '',
    receipt: '',
    receiptdate: '',
    receiptuser: '',
    receiptmethod: '',
    deliverydate: '',
    deliveryuser: '',
    deliverymethod: '',
    collectiondate: '',
    collectionuser: '',
    comment: ''
  },
  filter: {
    name: '',
    unpaid: false
  },
  msg: '',
  tab: 'users',
  open: false
}

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case 'INPUT_USER_DATA':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {[action.payload.key]: action.payload.value})
      })
    case 'INPUT_CHALLENGE_DATA':
      return Object.assign({}, state, {
        challenge: Object.assign({}, state.challenge, {[action.payload.key]: action.payload.value})
      })
    case 'CHANGE_FILTER':
      return Object.assign({}, state, {
        filter: Object.assign({}, state.filter, {[action.payload.key]: action.payload.value})
      })
    case 'SET_USERS':
      return Object.assign({}, state, {
        users: action.payload.users
      })
    case 'SELECT_ROW':
      return Object.assign({}, state, {
        user: action.payload.user,
        challenge: action.payload.challenge
      })
    case 'CHANGE_TAB':
      return Object.assign({}, state, {
        tab: action.payload.tab
      })
    case 'OPEN_CLOSE_DIALOG':
      return Object.assign({}, state, {
        open: action.payload.open
      })
    case 'SET_ADMIN_MSG':
      return Object.assign({}, state, {
        msg: action.payload.msg
      })
    default:
      return state
  }
}
