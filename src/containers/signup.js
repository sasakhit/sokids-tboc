import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Signup from '../components/signup'
import { signup, inputSignupData } from '../actions/signup'
import { changeLang, openCloseDialog, openCloseDrawer } from '../actions/common'

function mapStateToProps({ signup, common }) {
  return {
    user: signup.user,
    errortext: signup.errortext,
    msg: signup.msg,
    lang: common.lang,
    open: common.open,
    drawer: common.drawer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signup(user) {
      dispatch(signup(user))
    },
    inputSignupData(key, value) {
      dispatch(inputSignupData(key, value))
    },
    changeLang(lang) {
      dispatch(changeLang(lang))
    },
    openCloseDialog(open) {
      dispatch(openCloseDialog(open))
    },
    openCloseDrawer(drawer) {
      dispatch(openCloseDrawer(drawer))
    },
    redirectTo(jump) {
      dispatch(push(jump))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)