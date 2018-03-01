import request from 'superagent'
import { push } from 'react-router-redux'

/*
export const inputUserid = ( userid ) => ({
  type: 'INPUT_USERID',
  payload: { userid }
})

export const inputPasswd = ( passwd ) => ({
  type: 'INPUT_PASSWD',
  payload: { passwd }
})
*/

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
          //this.setState({jump: '/home'})
          dispatch(push('/home'))
          return
        }
        //this.setState({msg: r.msg})
        dispatch(setMsg(r.msg))
      })
  }
}