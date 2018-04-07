import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Login from '../components/login'
import { login, inputData } from '../actions/login'
import { changeLang, openCloseDrawer } from '../actions/common'

function mapStateToProps({ login, common }) {
  return {
    userid: login.userid,
    passwd: login.passwd,
    msg: login.msg,
    lang: common.lang,
    drawer: common.drawer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login(userid, passwd) {
      dispatch(login(userid, passwd))
    },
    inputData(key, value) {
      dispatch(inputData(key, value))
    },
    changeLang(lang) {
      dispatch(changeLang(lang))
    },
    openCloseDrawer(drawer) {
      dispatch(openCloseDrawer(drawer))
    },
    redirectTo(jump) {
      dispatch(push(jump))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)