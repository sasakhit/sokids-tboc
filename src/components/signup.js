import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../utils/styles'
import dict from '../utils/dictionary'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Signup extends Component {
  render () {
    const rightButtons = (
      <div>
      <FlatButton label={dict[this.props.lang].langChangeButton} onClick={e => this.props.changeLang(dict[this.props.lang].langChange)} style={styles.appbarButton} />
      <FlatButton label={dict[this.props.lang].login} onClick={e => this.props.redirectTo('/login')} style={styles.appbarButton} />
      </div>
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
        <AppBar title={dict[this.props.lang].signupTitle} iconElementRight={rightButtons} />
        <Table height="70vh"><TableBody displayRowCheckbox={false}>
          <TableRow displayBorder={false}>
            <TableRowColumn style={styles.customColumn20}>{dict[this.props.lang].userid}:</TableRowColumn>
            <TableRowColumn style={styles.customColumn80}>
              <TextField
                name='userid'
                hintText='taro.yamada@boc.org'
                errorText={errorText(this.props.errortext.userid)}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>{dict[this.props.lang].password}:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='passwd'
                type='password'
                errorText={errorText(this.props.errortext.passwd)}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>{dict[this.props.lang].fullname}:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='lastname'
                hintText={dict[this.props.lang].lastname_hint}
                errorText={errorText(this.props.errortext.lastname)}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
                style={styles.nameField}
              />
              <TextField
                name='firstname'
                hintText={dict[this.props.lang].firstname_hint}
                errorText={errorText(this.props.errortext.firstname)}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
                style={styles.nameField}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>{dict[this.props.lang].fullname_kana}:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='lastname_kana'
                hintText={dict[this.props.lang].lastname_kana_hint}
                errorText={errorText(this.props.errortext.lastname_kana)}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
                style={styles.nameField}
              />
              <TextField
                name='firstname_kana'
                hintText={dict[this.props.lang].firstname_kana_hint}
                errorText={errorText(this.props.errortext.firstname_kana)}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
                style={styles.nameField}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>{dict[this.props.lang].phone}:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='phone'
                errorText={errorText(this.props.errortext.phone)}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>{dict[this.props.lang].postal}:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='postal'
                errorText={errorText(this.props.errortext.postal)}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>{dict[this.props.lang].address}:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='address'
                errorText={errorText(this.props.errortext.address)}
                errorStyle={styles.errorStyle}
                fullWidth={true}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>{dict[this.props.lang].comment}:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='comment'
                fullWidth={true}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
        </TableBody></Table>

        <div style={styles.margin20}>
          <RaisedButton label={dict[this.props.lang].signup} primary={true} onClick={e => this.props.signup(this.props.user)} />
          <div style={styles.error}>{msg(this.props.msg)}</div>
        </div>
      </div>
    )
  }
}
