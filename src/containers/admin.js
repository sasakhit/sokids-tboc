import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Admin from '../components/admin'
import { inputUserData, inputChallengeData, changeFilter, editAdminData, loadAllUsers, selectRow, changeTab, openCloseDialog } from '../actions/admin'

function mapStateToProps({ admin }) {
  return {
    users: admin.users,
    user: admin.user,
    challenge: admin.challenge,
    filter: admin.filter,
    msg: admin.msg,
    tab: admin.tab,
    open: admin.open
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
    editAdminData(user, challenge, keys) {
      dispatch(editAdminData(user, challenge, keys))
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
    redirectTo(jump) {
      dispatch(push(jump))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)