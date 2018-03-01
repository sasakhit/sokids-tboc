import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Login from '../components/login'
//import { login, inputUserid, inputPasswd, inputData } from '../actions/login'
import { login, inputData } from '../actions/login'

function mapStateToProps({ login }) {
  return {
    userid: login.userid,
    passwd: login.passwd,
    msg: login.msg
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login(userid, passwd) {
      dispatch(login(userid, passwd))
    },
    /*
    inputUserid(userid) {
      dispatch(inputUserid(userid))
    },
    inputPasswd(passwd) {
      dispatch(inputPasswd(passwd))
    },
    */
    inputData(key, value) {
      dispatch(inputData(key, value))
    },
    redirectTo(jump) {
      dispatch(push(jump))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)