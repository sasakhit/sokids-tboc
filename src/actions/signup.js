import request from 'superagent'
import { push } from 'react-router-redux'

export const inputSignupData = ( key, value ) => ({
  type: 'INPUT_SIGNUP_DATA',
  key: key,
  payload: { value }
})

export const setMsg = ( msg ) => ({
  type: 'SET_MSG',
  payload: { msg }
})

export const signup = (userinfo) => {
  return dispatch  => {
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
