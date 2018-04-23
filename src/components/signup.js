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
import ActionLaunch from 'material-ui/svg-icons/action/launch'
import ActionLanguage from 'material-ui/svg-icons/action/language'

export default class Signup extends Component {
  render () {
    const rightButtons = (
      <FlatButton label={dict[this.props.lang].langChangeButton} onClick={e => this.props.changeLang(dict[this.props.lang].langChange)} />
    )

    const errorText = (error) => { return (error === "required") ? dict[this.props.lang].required : error }

    const msg = (msg) => {
      switch(msg) {
        case 'Please input all the required fields':
          return dict[this.props.lang].inputAll
          break
        case 'The userid already exists':
          return dict[this.props.lang].alreadyExists
          break
        case 'DB Error':
          return dict[this.props.lang].dbError
          break
        default:
          return msg
          break
      }
    }

    return (
      <div>
        <Drawer
          docked={false}
          open={this.props.drawer}
          onRequestChange={() => this.props.openCloseDrawer(false)}
        >
          <MenuItem
            onClick={e => {this.props.redirectTo('/login'); this.props.openCloseDrawer(false)}}
            primaryText={dict[this.props.lang].login}
            leftIcon={<ActionLaunch />} />
          <MenuItem
            onClick={e => {this.props.changeLang(dict[this.props.lang].langChange); this.props.openCloseDrawer(false)}}
            primaryText={dict[this.props.lang].langChangeButton}
            leftIcon={<ActionLanguage />} />
        </Drawer>
        <AppBar
          title={dict[this.props.lang].signupTitle}
          style={styles.appbar}
          onLeftIconButtonClick={() => this.props.openCloseDrawer(true)}
        />
        <div style={styles.margin20}>
          <div style={styles.flexRow}>
            <TextField
              {...properties.textFieldProps}
              name='userid'
              floatingLabelText={dict[this.props.lang].userid}
              hintText='taro.yamada@boc.org'
              errorText={errorText(this.props.errortext.userid)}
              onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
            />
          </div><br />
          <div style={styles.flexRow}>
            <TextField
              {...properties.textFieldProps}
              name='passwd'
              floatingLabelText={dict[this.props.lang].password}
              type='password'
              errorText={errorText(this.props.errortext.passwd)}
              onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
            />
          </div><br />
          <div style={styles.flexRow}>
            <TextField
              {...properties.textFieldProps}
              name='lastname'
              floatingLabelText={dict[this.props.lang].lastname}
              hintText={dict[this.props.lang].lastname_hint}
              errorText={errorText(this.props.errortext.lastname)}
              onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              style={styles.nameField}
            />
            <TextField
              {...properties.textFieldProps}
              name='firstname'
              floatingLabelText={dict[this.props.lang].firstname}
              hintText={dict[this.props.lang].firstname_hint}
              errorText={errorText(this.props.errortext.firstname)}
              onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              style={styles.nameField}
            />
          </div><br />
          <div style={styles.flexRow}>
            <TextField
              {...properties.textFieldProps}
              name='lastname_kana'
              floatingLabelText={dict[this.props.lang].lastname_kana}
              hintText={dict[this.props.lang].lastname_kana_hint}
              errorText={errorText(this.props.errortext.lastname_kana)}
              onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              style={styles.nameField}
            />
            <TextField
              {...properties.textFieldProps}
              name='firstname_kana'
              floatingLabelText={dict[this.props.lang].firstname_kana}
              hintText={dict[this.props.lang].firstname_kana_hint}
              errorText={errorText(this.props.errortext.firstname_kana)}
              onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              style={styles.nameField}
            />
          </div><br />
          <div style={styles.flexRow}>
            <TextField
              {...properties.textFieldProps}
              name='phone'
              floatingLabelText={dict[this.props.lang].phone}
              errorText={errorText(this.props.errortext.phone)}
              onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
            />
          </div><br />
          <div style={styles.flexRow}>
            <TextField
              {...properties.textFieldProps}
              name='postal'
              floatingLabelText={dict[this.props.lang].postal}
              errorText={errorText(this.props.errortext.postal)}
              onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
            />
          </div><br />
          <div style={styles.flexRow}>
            <TextField
              {...properties.textFieldProps}
              name='address'
              floatingLabelText={dict[this.props.lang].address}
              errorText={errorText(this.props.errortext.address)}
              fullWidth={true}
              onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
            />
          </div><br />
          <div style={styles.flexRow}>
            <TextField
              {...properties.textFieldProps}
              name='comment'
              floatingLabelText={dict[this.props.lang].comment}
              fullWidth={true}
              onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div style={styles.margin20}>
          <RaisedButton label={dict[this.props.lang].signup} primary={true} onClick={e => this.props.signup(this.props.user)} />
          <div style={styles.error}>{msg(this.props.msg)}</div>
        </div>
      </div>
    )
  }
}
