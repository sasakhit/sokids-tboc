import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../utils/styles'
import dict from '../utils/dictionary'
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
    const rightButtons = (
      <div>
      <FlatButton label={dict[this.props.lang].langChangeButton} onClick={e => this.props.changeLang(dict[this.props.lang].langChange)} style={styles.appbarButton} />
      <FlatButton label={dict[this.props.lang].signup} onClick={e => this.props.redirectTo('/signup')} style={styles.appbarButton} />
      </div>
    )

    const msg = (msg) => {return (msg === "Authentication Error") ? dict[this.props.lang].autherror : msg}

    return (
      <div>
        <AppBar
          title={dict[this.props.lang].loginTitle}
          iconElementRight={rightButtons}
        />

        <Table><TableBody displayRowCheckbox={false}>
          <TableRow displayBorder={false}>
            <TableRowColumn style={styles.customColumn20}>{dict[this.props.lang].userid}:</TableRowColumn>
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
            <TableRowColumn>{dict[this.props.lang].password}:</TableRowColumn>
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
