import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Signup from '../components/signup'
//import { login, inputUserid, inputPasswd, inputData } from '../actions/login'
import { signup, inputSignupData } from '../actions/signup'

function mapStateToProps({ signup }) {
  return {
    /*
    userid: signup.userid,
    passwd: signup.passwd,
    fullname: signup.fullname,
    kananame: signup.kananame,
    phone: signup.phone,
    postal: signup.postal,
    address: signup.address,
    comment: signup.comment,
    */
    userinfo: signup.userinfo,
    errortext: signup.errortext,
    msg: signup.msg
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signup(userinfo) {
      dispatch(signup(userinfo))
    },
    /*
    inputUserid(userid) {
      dispatch(inputUserid(userid))
    },
    inputPasswd(passwd) {
      dispatch(inputPasswd(passwd))
    },
    */
    inputSignupData(key, value) {
      dispatch(inputSignupData(key, value))
    },
    redirectTo(jump) {
      dispatch(push(jump))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)