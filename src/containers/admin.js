import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Admin from '../components/admin'
import { inputAdminData, setUsers, loadAllUsers, changeTab, openCloseDialog } from '../actions/admin'

function mapStateToProps({ admin }) {
  return {
    users: admin.users,
    msg: admin.msg,
    tab: admin.tab,
    open: admin.open
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputAdminData(key, value) {
      dispatch(inputAdminData(key, value))
    },
    loadAllUsers() {
      dispatch(loadAllUsers())
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