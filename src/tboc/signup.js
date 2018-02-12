import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../styles'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
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
  constructor (props) {
    super(props)
    this.state = {
      userid: '',
      passwd: '',
      fullname: '',
      kananame: '',
      phone: '',
      postal: '',
      address: '',
      comment: '',
      errortext: {
        userid: 'This field is required',
        passwd: 'This field is required',
        fullname: 'This field is required',
        kananame: 'This field is required',
        phone: 'This field is required',
        postal: 'This field is required',
        address: 'This field is required'
      },
      jump: '',
      msg: ''
    }
  }

  signup () {
    request
      .get('/tboc/api/signup')
      .query({
        userid: this.state.userid,
        passwd: this.state.passwd,
        fullname: this.state.fullname,
        kananame: this.state.kananame,
        phone: this.state.phone,
        postal: this.state.postal,
        address: this.state.address,
        comment: this.state.comment
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

    const changed = (name, e) => {
      const errortext_new = (e.target.value !== '') ? '' : 'This field is required'
      this.setState({
        [name]: e.target.value,
        errortext: Object.assign({}, this.state.errortext, {
          [name]: errortext_new
        })
      })
    }
    const customColumn20 = {width: '20%'};
    const customColumn80 = {width: '80%'};

    return (
      <div>
        <AppBar
          title="TBOC - Sign Up"
          iconElementRight={<FlatButton label="Log In" onClick={e => this.setState({jump: '/login'})} />}
        />
        <Table><TableBody displayRowCheckbox={false}>
          <TableRow displayBorder={false}>
            <TableRowColumn style={customColumn20}>Email (User ID):</TableRowColumn>
            <TableRowColumn style={customColumn80}>
              <TextField
                name='userid'
                hintText='taro.yamada@boc.org'
                errorText={this.state.errortext.userid}
                errorStyle={styles.errorStyle}
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
                errorText={this.state.errortext.passwd}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => changed('passwd', e)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Full Name:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='fullname'
                hintText='山田　太郎'
                errorText={this.state.errortext.fullname}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => changed('fullname', e)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Name (Kana):</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='kananame'
                hintText='ヤマダ　タロウ'
                errorText={this.state.errortext.kananame}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => changed('kananame', e)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Phone:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='phone'
                errorText={this.state.errortext.phone}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => changed('phone', e)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Postal:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='postal'
                errorText={this.state.errortext.postal}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => changed('postal', e)}
              />
            </TableRowColumn>
          </TableRow>
          <TableRow displayBorder={false}>
            <TableRowColumn>Address:</TableRowColumn>
            <TableRowColumn>
              <TextField
                name='address'
                errorText={this.state.errortext.address}
                errorStyle={styles.errorStyle}
                fullWidth={true}
                underlineStyle={styles.underlineStyle}
                onChange={e => changed('address', e)}
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
                onChange={e => changed('comment', e)}
              />
            </TableRowColumn>
          </TableRow>
        </TableBody></Table>

        <RaisedButton label="Sign Up" primary={true} onClick={e => this.signup()} />
        <div style={styles.error}>{this.state.msg}</div>
      </div>
    )
  }
}
