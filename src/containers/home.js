import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Home from '../components/home'
import { addChallenge, inputChallengeData, loadUser, changeTab, openCloseDialog } from '../actions/home'

function mapStateToProps({ home }) {
  return {
    userinfo: home.userinfo,
    challenges: home.challenges,
    newchallenge: home.newchallenge,
    errortext: home.errortext,
    msg: home.msg,
    tab: home.tab,
    open: home.open
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addChallenge(newchallenge) {
      dispatch(addChallenge(newchallenge))
    },
    inputChallengeData(key, value) {
      dispatch(inputChallengeData(key, value))
    },
    loadUser(userid) {
      dispatch(loadUser(userid))
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)