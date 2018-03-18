import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Home from '../components/home'
import { addChallenge, updateUserData, inputUserData, inputChallengeData, loadUser, changeTab, openCloseDialog } from '../actions/home'
import { changeLang } from '../actions/common'

function mapStateToProps({ home, common }) {
  return {
    user: home.user,
    challenges: home.challenges,
    newchallenge: home.newchallenge,
    errortext: home.errortext,
    msg: home.msg,
    tab: home.tab,
    open: home.open,
    lang: common.lang
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addChallenge(newchallenge) {
      dispatch(addChallenge(newchallenge))
    },
    updateUserData(user, keys) {
      dispatch(updateUserData(user, keys))
    },
    inputUserData(key, value) {
      dispatch(inputUserData(key, value))
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
    changeLang(lang) {
      dispatch(changeLang(lang))
    },
    redirectTo(jump) {
      dispatch(push(jump))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)