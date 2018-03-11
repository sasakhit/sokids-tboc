import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../styles'
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
    return (
      <div>
        <AppBar
          title="TBOC - Sign Up"
          iconElementRight={<FlatButton label="Log In" onClick={e => this.props.redirectTo('/login')} />}
        />
        <Table height="70vh"><TableBody displayRowCheckbox={false}>
          <TableRow displayBorder={false}>
            <TableRowColumn style={styles.customColumn20}>Email (User ID):</TableRowColumn>
            <TableRowColumn style={styles.customColumn80}>
              <TextField
                name='userid'
                hintText='taro.yamada@boc.org'
                errorText={this.props.errortext.userid}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Password:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='passwd'
                type='password'
                errorText={this.props.errortext.passwd}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Full Name:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='fullname'
                hintText='山田　太郎'
                errorText={this.props.errortext.fullname}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Name (Kana):</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='kananame'
                hintText='ヤマダ　タロウ'
                errorText={this.props.errortext.kananame}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Phone:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='phone'
                errorText={this.props.errortext.phone}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Postal:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='postal'
                errorText={this.props.errortext.postal}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Address:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='address'
                errorText={this.props.errortext.address}
                errorStyle={styles.errorStyle}
                fullWidth={true}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputSignupData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Comment:</TableRowColumn>
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
          <RaisedButton label="Sign Up" primary={true} onClick={e => this.props.signup(this.props.userinfo)} />
          <div style={styles.error}>{this.props.msg}</div>
        </div>
      </div>
    )
  }
}
