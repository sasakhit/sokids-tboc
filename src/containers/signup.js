import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Signup from '../components/signup'
import { signup, inputSignupData } from '../actions/signup'

function mapStateToProps({ signup }) {
  return {
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
    inputSignupData(key, value) {
      dispatch(inputSignupData(key, value))
    },
    redirectTo(jump) {
      dispatch(push(jump))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)