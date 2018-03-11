import request from 'superagent'
import { push } from 'react-router-redux'

export const inputUserData = ( key, value ) => ({
  type: 'INPUT_USER_DATA',
  payload: { key, value }
})

export const inputChallengeData = ( key, value ) => ({
  type: 'INPUT_CHALLENGE_DATA',
  payload: { key, value }
})

export const changeFilter = ( key, value ) => ({
  type: 'CHANGE_FILTER',
  payload: { key, value }
})

export const setUsers = ( users ) => ({
  type: 'SET_USERS',
  payload: { users }
})

export const selectRow = ( user, challenge ) => ({
  type: 'SELECT_ROW',
  payload: { user, challenge }
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

export const editAdminData = (user, challenge, keys) => {
  return dispatch => {
    request
      .get('/tboc/api/edit_user_challenge')
      .query({
        user: user,
        challenge: challenge,
        keys: keys
      })
      .end((err, res) => {
        if (err) return
        if (!res.body.status) {
          window.alert(res.body.msg)
          return
        }
        dispatch(openCloseDialog(false))
        dispatch(loadAllUsers())
      })
  }
}

