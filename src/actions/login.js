import request from 'superagent'
import { push } from 'react-router-redux'

export const inputData = ( key, value ) => ({
  type: 'INPUT_DATA',
  key: key,
  payload: { value }
})

export const setMsg = ( msg ) => ({
  type: 'SET_MSG',
  payload: { msg }
})

export const login = ( userid, passwd ) => {
  return dispatch  => {
    request
      .get('/tboc/api/login')
      .query({
        userid: userid,
        passwd: passwd
      })
      .end((err, res) => {
        if (err) return
        const r = res.body
        console.log(r)
        if (r.status && r.token) {
          // Save authentication token in localStorage
          window.localStorage['tboc_id'] = userid
          window.localStorage['tboc_auth_token'] = r.token

          const jump = (userid === 'admin') ? 'admin' : '/home'
          dispatch(push(jump))
          return
        }
        dispatch(setMsg(r.msg))
      })
  }
}