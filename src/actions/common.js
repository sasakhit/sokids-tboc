import { push } from 'react-router-redux'

export const changeLang = ( lang ) => ({
  type: 'CHANGE_LANG',
  payload: { lang }
})
