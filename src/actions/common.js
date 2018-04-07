import { push } from 'react-router-redux'

export const changeLang = ( lang ) => ({
  type: 'CHANGE_LANG',
  payload: { lang }
})

export const resizeScreen = ( width ) => {
  return {
    type: 'RESIZE_SCREEN',
    payload: { width }
  }
}

export const openCloseDrawer = ( drawer ) => {
  return {
    type: 'OPEN_CLOSE_DRAWER',
    payload: { drawer }
  }
}


