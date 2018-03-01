import request from 'superagent'
import { push } from 'react-router-redux'

export const inputAdminData = ( key, value ) => ({
  type: 'INPUT_SIGNUP_DATA',
  key: key,
  payload: { value }
})

export const setUsers = ( users ) => ({
  type: 'SET_USERS',
  payload: { users }
})

export const changeTab = ( tab ) => ({
  type: 'CHANGE_TAB',
  payload: { tab }
})

export const openCloseDialog = ( open ) => ({
  type: 'OPEN_CLOSE_DIALOG',
  payload: { open }
})

export const setMsg = ( msg ) => ({
  type: 'SET_MSG',
  payload: { msg }
})

export const loadAllUsers = () => {
  return dispatch  => {
    request
      .get('/tboc/api/get_allusers')
      .query({})
      .end((err, res) => {
        console.log(err, res)
        if (err) return
        dispatch(setUsers(res.body.users))
      })
  }
}

