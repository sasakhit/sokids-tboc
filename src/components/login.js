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

//export default function login ({ store }) {
export default class Login extends Component {
  
  //constructor (props) {
  //  super(props)
  //  const { userid, passwd, jump, msg } = store.getState()
  //}

  /*
  constructor (props) {
    super(props)
    const userid = this.props.userid
    const passwd = this.props.passwd
    const jump = this.props.jump
    const msg = this.props.msg
  }
  */

  /*
  loginTBOC () {
    request
      .get('/tboc/api/login')
      .query({
        userid: this.props.userid,
        passwd: this.props.passwd
      })
      .end((err, res) => {
        alert(this.props.userid)
        alert(this.props.passwd)
        if (err) return
        const r = res.body
        console.log(r)
        if (r.status && r.token) {
          // Save authentication token in localStorage
          window.localStorage['tboc_id'] = this.props.userid
          window.localStorage['tboc_auth_token'] = r.token
          //this.setState({jump: '/home'})
          this.props.redirectTo('/home')
          return
        }
        //this.setState({msg: r.msg})
        this.props.setMsg(r.msg)
      })
  }
  */
  
  render () {
    //if (this.props.jump) {
    //  return <Redirect to={this.props.jump} />
    //}
    //const changed = (name, e) => this.setState({[name]: e.target.value})

    const customColumn20 = {width: '20%'};
    const customColumn80 = {width: '80%'};

    return (
      <div>
        <AppBar
          title="TBOC - Log In"
          //iconElementRight={<FlatButton label="Sign Up" onClick={e => this.setState({jump: '/signup'})} />}
          iconElementRight={<FlatButton label="Sign Up" onClick={e => this.props.redirectTo('/signup')} />}
        />

        <Table><TableBody displayRowCheckbox={false}>
          <TableRow displayBorder={false}>
            <TableRowColumn style={customColumn20}>Email (User ID):</TableRowColumn>
            <TableRowColumn style={customColumn80}>
              <TextField
                name='userid'
                hintText='taro.yamada@boc.org'
                underlineStyle={styles.underlineStyle}
                //onChange={e => changed('userid', e)}
                //onChange={e => this.props.inputUserid(e.target.value)}
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
                //onChange={e => changed('passwd', e)}
                //onChange={e => this.props.inputPasswd(e.target.value)}
                onChange={e => this.props.inputData(e.target.name, e.target.value)}
              />
            </TableRowColumn>
          </TableRow>
        </TableBody></Table>

        <RaisedButton label="Log In" primary={true} onClick={e => this.props.login(this.props.userid, this.props.passwd)} />
        <p style={styles.error}>{this.props.msg}</p>
        <p>If you register for the first time, please <RaisedButton label="Sign up" primary={true} onClick={e => this.props.redirectTo('/signup')} /></p>

      </div>
    )
  }
}
