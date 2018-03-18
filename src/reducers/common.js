const initialState = {
  lang: 'ja_jp'
}

export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LANG':
      return Object.assign({}, state, {
        lang: action.payload.lang
      })
    default:
      return state
  }
}
