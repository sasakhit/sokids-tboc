import request from 'superagent'
import { push } from 'react-router-redux'
import { openCloseDialog } from './common'

export const inputSignupData = ( key, value ) => ({
  type: 'INPUT_SIGNUP_DATA',
  key: key,
  payload: { value }
})

export const setMsg = ( msg ) => ({
  type: 'SET_SIGNUP_MSG',
  payload: { msg }
})

export const signup = (user) => {
  return dispatch  => {
    request
      .get('/tboc/api/signup')
      .query({
        userid: user.userid,
        passwd: user.passwd,
        lastname: user.lastname,
        firstname: user.firstname,
        lastname_kana: user.lastname_kana,
        firstname_kana: user.firstname_kana,
        phone: user.phone,
        postal: user.postal,
        address: user.address,
        signupdate: (new Date()).toString()
      })
      .end((err, res) => {
        if (err) return
        const r = res.body
        console.log(r)
        if (r.status && r.token) {
          // Save authentication token in localStorage
          window.localStorage['tboc_id'] = user.userid
          window.localStorage['tboc_auth_token'] = r.token
          dispatch(push('/home'))
          return
        }
        dispatch(openCloseDialog(false))
        dispatch(setMsg(r.msg))
      })
  }
}
