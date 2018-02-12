import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../styles'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = { userid: '', passwd: '', jump: '', msg: '' }
  }

  login () {
    request
      .get('/tboc/api/login')
      .query({
        userid: this.state.userid,
        passwd: this.state.passwd
      })
      .end((err, res) => {
        if (err) return
        const r = res.body
        console.log(r)
        if (r.status && r.token) {
          // Save authentication token in localStorage
          window.localStorage['tboc_id'] = this.state.userid
          window.localStorage['tboc_auth_token'] = r.token
          this.setState({jump: '/home'})
          return
        }
        this.setState({msg: r.msg})
      })
  }
  
  render () {
    if (this.state.jump) {
      return <Redirect to={this.state.jump} />
    }
    const changed = (name, e) => this.setState({[name]: e.target.value})

    const customColumn20 = {width: '20%'};
    const customColumn80 = {width: '80%'};

    return (
      <div>
        <AppBar
          title="TBOC - Log In"
          iconElementRight={<FlatButton label="Sign Up" onClick={e => this.setState({jump: '/signup'})} />}
        />

        <Table><TableBody displayRowCheckbox={false}>
          <TableRow displayBorder={false}>
            <TableRowColumn style={customColumn20}>Email (User ID):</TableRowColumn>
            <TableRowColumn style={customColumn80}>
              <TextField
                name='userid'
                hintText='taro.yamada@boc.org'
                underlineStyle={styles.underlineStyle}
                onChange={e => changed('userid', e)}
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
                onChange={e => changed('passwd', e)}
              />
            </TableRowColumn>
          </TableRow>
        </TableBody></Table>

        <RaisedButton label="Log In" primary={true} onClick={e => this.login()} />
        <p style={styles.error}>{this.state.msg}</p>
        <p>If you register for the first time, please <RaisedButton label="Sign up" primary={true} onClick={e => this.setState({jump: '/signup'})} /></p>

      </div>
    )
  }
}
