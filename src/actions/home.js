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

export const setUser = ( user ) => ({
  type: 'SET_USER_INFO',
  payload: { user }
})

export const setChallenges = ( challenges ) => ({
  type: 'SET_CHALLENGES',
  payload: { challenges }
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
  type: 'SET_HOME_MSG',
  payload: { msg }
})

export const loadUser = (userid) => {
  return dispatch  => {
  request
    .get('/tboc/api/get_user')
    .query({userid: userid})
    .end((err, res) => {
      console.log(err, res)
      if (err) return
      dispatch(setUser({
        _id: res.body.user._id,
        userid: res.body.user.userid,
        passwd: '',
        lastname: res.body.user.lastname,
        firstname: res.body.user.firstname,
        lastname_kana: res.body.user.lastname_kana,
        firstname_kana: res.body.user.firstname_kana,
        phone: res.body.user.phone,
        postal: res.body.user.postal,
        address: res.body.user.address,
        comment: res.body.user.comment
      }))
      dispatch(setChallenges(res.body.user.challenges))
    })
  }
}

export const addChallenge = (newchallenge) => {
  return dispatch => {
    request
      .get('/tboc/api/add_challenge')
      .query({
        userid: window.localStorage.tboc_id,
        token: window.localStorage.tboc_auth_token,
        challenge: newchallenge
      })
      .end((err, res) => {
        if (err) return
        if (!res.body.status) {
          window.alert(res.body.msg)
          return
        }
        //this.setState({open: false, tab: 'history'})
        dispatch(openCloseDialog(false))
        dispatch(changeTab('history'))
        dispatch(loadUser(window.localStorage.tboc_id))
      })
  }
}

export const updateUserData = (user, keys) => {
  return dispatch => {
    request
      .get('/tboc/api/update_user_challenge')
      .query({
        userid: window.localStorage.tboc_id,
        token: window.localStorage.tboc_auth_token,
        user: user,
        challenge: null,
        keys: keys
      })
      .end((err, res) => {
        if (err) return
        if (!res.body.status) {
          window.alert(res.body.msg)
          return
        }
        dispatch(openCloseDialog(false))
        dispatch(changeTab('profile'))
        if (res.body.user.userid !== window.localStorage.tboc_id) window.localStorage.tboc_id = res.body.user.userid
        dispatch(loadUser(window.localStorage.tboc_id))
      })
  }
}
