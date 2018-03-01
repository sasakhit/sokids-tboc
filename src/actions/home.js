import request from 'superagent'
import { push } from 'react-router-redux'

export const inputChallengeData = ( key, value ) => ({
  type: 'INPUT_CHALLENGE_DATA',
  key: key,
  payload: { value }
})

export const setUserInfo = ( userinfo ) => ({
  type: 'SET_USER_INFO',
  payload: { userinfo }
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
  type: 'SET_MSG',
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
      dispatch(setUserInfo({
        userid: res.body.user.userid,
        passwd: res.body.user.passwd,
        fullname: res.body.user.fullname,
        kananame: res.body.user.kananame,
        phone: res.body.user.phone,
        postal: res.body.user.postal,
        address: res.body.user.address,
        comment: res.body.user.comment
      }))
      dispatch(setChallenges(res.body.user.challenges))
      /*
      this.setState({
        userid: res.body.user.userid,
        passwd: res.body.user.passwd,
        fullname: res.body.user.fullname,
        kananame: res.body.user.kananame,
        phone: res.body.user.phone,
        postal: res.body.user.postal,
        address: res.body.user.address,
        comment: res.body.user.comment,
        challenges: res.body.user.challenges
      })
      */
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

export const signup = (userinfo) => {
  return dispatch => {
    request
      .get('/tboc/api/signup')
      .query({
        userid: userinfo.userid,
        passwd: userinfo.passwd,
        fullname: userinfo.fullname,
        kananame: userinfo.kananame,
        phone: userinfo.phone,
        postal: userinfo.postal,
        address: userinfo.address,
        comment: userinfo.comment
      })
      .end((err, res) => {
        if (err) return
        const r = res.body
        console.log(r)
        if (r.status && r.token) {
          // Save authentication token in localStorage
          window.localStorage['tboc_id'] = userinfo.userid
          window.localStorage['tboc_auth_token'] = r.token
          dispatch(push('/home'))
          return
        }
        dispatch(setMsg(r.msg))
      })
  }
}
