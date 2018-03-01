import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../styles'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import {Tabs, Tab} from 'material-ui/Tabs'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Dialog from 'material-ui/Dialog';

export default class Admin extends Component {

  componentWillMount () {
    if (!window.localStorage.tboc_auth_token) {
      window.alert('Please login first')
      this.props.redirectTo('/login')
      return
    }

    this.props.loadAllUsers()
  }

  handleOpen () {
    this.props.openCloseDialog(true)
  }

  handleClose () {
    this.props.openCloseDialog(false)
  }

  logout () {
    // Remove authentication token in localStorage
    window.localStorage.removeItem('tboc_id')
    window.localStorage.removeItem('tboc_auth_token')
    this.props.redirectTo('/login')
  }

  zeroFill (number) {
    const s = '00' + number
    return s.substr(s.length - 2, 2)
  }

  dateFormat (date) {
    if (date == null) return ''
    const d = new Date(date)
    return [d.getFullYear(), this.zeroFill(d.getMonth() + 1), this.zeroFill(d.getDate())].join( '-' )
  }

  render () {
    const challengeRows = (challenges) => {
      challenges.map(challenge =>
      <TableRow>
        <TableRowColumn>{this.dateFormat(challenge.dateofchallenge)}</TableRowColumn>
        <TableRowColumn>{challenge.nameofchallenge}</TableRowColumn>
        <TableRowColumn>{challenge.paymentmethod}</TableRowColumn>
        <TableRowColumn>{challenge.receipt}</TableRowColumn>
        <TableRowColumn>{challenge.comment}</TableRowColumn>
      </TableRow>
      )
      }

    const challengeTable = (challenges) => {
      <div>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Challenge Name</TableHeaderColumn>
              <TableHeaderColumn>Payment Method</TableHeaderColumn>
              <TableHeaderColumn>Receipt Required</TableHeaderColumn>
              <TableHeaderColumn>Comment</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {challengeRows(challenges)}
          </TableBody>
        </Table>
      </div>
    }

    const challengeTable2 = (
      <div>
              <Table>
                <TableHeader displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Date</TableHeaderColumn>
                    <TableHeaderColumn>Challenge Name</TableHeaderColumn>
                    <TableHeaderColumn>Payment Method</TableHeaderColumn>
                    <TableHeaderColumn>Receipt Required</TableHeaderColumn>
                    <TableHeaderColumn>Comment</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                <TableRowColumn>A</TableRowColumn>
                <TableRowColumn>B</TableRowColumn>
                <TableRowColumn>C</TableRowColumn>
                <TableRowColumn>D</TableRowColumn>
                <TableRowColumn>E</TableRowColumn>
                </TableBody>
              </Table>
            </div>
    )

    const users = this.props.users.map(user =>
      <TableRow>
        <TableRowColumn>{user.userid}</TableRowColumn>
        <TableRowColumn>{user.fullname}</TableRowColumn>
        <TableRowColumn>{user.kananame}</TableRowColumn>
        <TableRowColumn>{user.phone}</TableRowColumn>
        <TableRowColumn>{user.postal}</TableRowColumn>
        <TableRowColumn>{user.address}</TableRowColumn>
        <TableRowColumn>{user.comment}</TableRowColumn>
      </TableRow>
    )

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={e => this.handleClose()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={e => this.addChallenge()}
      />,
    ];
  

    const customColumn20 = {width: '20%'};
    const customColumn80 = {width: '80%'};

    return (
      <div>
        <AppBar
          title={"TBOC - Admin"}
          iconElementRight={<FlatButton label="Log Out" onClick={e => this.logout()} />}
        />

            <div>
              <Table>
                <TableHeader displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>User ID</TableHeaderColumn>
                    <TableHeaderColumn>Full Name</TableHeaderColumn>
                    <TableHeaderColumn>Kana Name</TableHeaderColumn>
                    <TableHeaderColumn>Phone</TableHeaderColumn>
                    <TableHeaderColumn>Postal</TableHeaderColumn>
                    <TableHeaderColumn>Address</TableHeaderColumn>
                    <TableHeaderColumn>Comment</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {users}
                </TableBody>
              </Table>
            </div>

      </div>
    )
  }
}
