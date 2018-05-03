import { push } from 'react-router-redux'

export const changeLang = ( lang ) => ({
  type: 'CHANGE_LANG',
  payload: { lang }
})

export const resizeScreen = ( width ) => ({
    type: 'RESIZE_SCREEN',
    payload: { width }
})

export const openCloseDialog = ( open ) => ({
  type: 'OPEN_CLOSE_DIALOG',
  payload: { open }
})

export const openCloseDrawer = ( drawer ) => ({
    type: 'OPEN_CLOSE_DRAWER',
    payload: { drawer }
})


