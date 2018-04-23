import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../utils/styles'
import properties from '../utils/properties'
import dict from '../utils/dictionary'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import ActionLanguage from 'material-ui/svg-icons/action/language'
import ContentCreate from 'material-ui/svg-icons/content/create'

export default class Login extends Component {
  render () {
    const rightButtons = (
      <FlatButton label={dict[this.props.lang].langChangeButton} onClick={e => this.props.changeLang(dict[this.props.lang].langChange)} />
    )

    const msg = (msg) => {return (msg === "Authentication Error") ? dict[this.props.lang].autherror : msg}

    return (
      <div>
        <Drawer
          docked={false}
          open={this.props.drawer}
          onRequestChange={() => this.props.openCloseDrawer(false)}
        >
          <MenuItem
            onClick={e => {this.props.redirectTo('/signup'); this.props.openCloseDrawer(false)}}
            primaryText={dict[this.props.lang].signup}
            leftIcon={<ContentCreate />} />
          <MenuItem
            onClick={e => {this.props.changeLang(dict[this.props.lang].langChange); this.props.openCloseDrawer(false)}}
            primaryText={dict[this.props.lang].langChangeButton}
            leftIcon={<ActionLanguage />} />
        </Drawer>
        <AppBar
          title = {dict[this.props.lang].loginTitle}
          style={styles.appbar}
          onLeftIconButtonClick={() => this.props.openCloseDrawer(true)}
        />
        <div style={styles.margin20}>
          <TextField
            {...properties.textFieldProps}
            name='userid'
            floatingLabelText={dict[this.props.lang].userid}
            hintText='taro.yamada@boc.org'
            onChange={e => this.props.inputData(e.target.name, e.target.value)}
          /><br />
          <TextField
            {...properties.textFieldProps}
            name='passwd'
            floatingLabelText={dict[this.props.lang].password}
            type='password'
            onChange={e => this.props.inputData(e.target.name, e.target.value)}
          />
        </div>

        <div style={styles.margin20}>
          <RaisedButton label={dict[this.props.lang].login} primary={true} onClick={e => this.props.login(this.props.userid, this.props.passwd)} />
          {msg(this.props.msg).split("<br>").map((m, i) => (<p key={i} style={styles.error}>{m}</p>))}
          {dict[this.props.lang].toSignupBefore}
          <RaisedButton label={dict[this.props.lang].signup} primary={true} onClick={e => this.props.redirectTo('/signup')} style={styles.margin10} />
          {dict[this.props.lang].toSignupAfter}
        </div>

      </div>
    )
  }
}
