import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../styles'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Login extends Component {
  render () {
    return (
      <div>
        <AppBar
          title="TBOC - Log In"
          iconElementRight={<FlatButton label="Sign Up" onClick={e => this.props.redirectTo('/signup')} />}
        />

        <Table><TableBody displayRowCheckbox={false}>
          <TableRow displayBorder={false}>
            <TableRowColumn style={styles.customColumn20}>Email (User ID):</TableRowColumn>
            <TableRowColumn style={styles.customColumn80}>
              <TextField
                name='userid'
                hintText='taro.yamada@boc.org'
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Password:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='passwd'
                type='password'
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
        </TableBody></Table>

        <div style={styles.margin20}>
          <RaisedButton label="Log In" primary={true} onClick={e => this.props.login(this.props.userid, this.props.passwd)} />
          <p style={styles.error}>{this.props.msg}</p>
          If you register for the first time, please <RaisedButton label="Sign up" primary={true} onClick={e => this.props.redirectTo('/signup')} />
        </div>

      </div>
    )
  }
}
