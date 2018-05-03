import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Admin from '../components/admin'
import { inputUserData, inputChallengeData, changeFilter, updateAdminData, loadAllUsers, selectRow, changeTab } from '../actions/admin'
import { changeLang, openCloseDialog, openCloseDrawer } from '../actions/common'

function mapStateToProps({ admin, common }) {
  return {
    users: admin.users,
    user: admin.user,
    challenge: admin.challenge,
    filter: admin.filter,
    msg: admin.msg,
    tab: admin.tab,
    open: common.open,
    lang: common.lang,
    drawer: common.drawer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputUserData(key, value) {
      dispatch(inputUserData(key, value))
    },
    inputChallengeData(key, value) {
      dispatch(inputChallengeData(key, value))
    },
    changeFilter(key, value) {
      dispatch(changeFilter(key, value))
    },
    updateAdminData(user, challenge, keys) {
      dispatch(updateAdminData(user, challenge, keys))
    },
    loadAllUsers() {
      dispatch(loadAllUsers())
    },
    selectRow(user, challenge) {
      dispatch(selectRow(user, challenge))
    },
    changeTab(tab) {
      dispatch(changeTab(tab))
    },
    openCloseDialog(open) {
      dispatch(openCloseDialog(open))
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin)