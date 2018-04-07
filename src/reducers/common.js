const initialState = {
  lang: 'ja_jp',
  width: typeof window === 'object' ? window.innerWidth : null,
  drawer: false
}

export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LANG':
      return Object.assign({}, state, {
        lang: action.payload.lang
      })
    case 'RESIZE_SCREEN':
      return Object.assign({}, state, {
        width: action.payload.width,
      })
    case 'OPEN_CLOSE_DRAWER':
      return Object.assign({}, state, {
        drawer: action.payload.drawer
      })
    default:
      return state
  }
}
