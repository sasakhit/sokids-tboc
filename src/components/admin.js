import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../utils/styles'
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
import Dialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

const columns = [
  {row: 'user.userid', type: 'char', header: 'User ID', width: '90px', visicha: true, visifin: true},
  {row: 'user.lastname', type: 'char' , header: 'Last Name', width: '90px', visicha: true, visifin: true},
  {row: 'user.firstname', type: 'char' , header: 'First Name', width: '90px', visicha: true, visifin: true},
  {row: 'user.lastname_kana', type: 'char' , header: 'Last Name (Kana)', width: '90px', visicha: false, visifin: false},
  {row: 'user.firstname_kana', type: 'char' , header: 'First Name (Kana)', width: '90px', visicha: false, visifin: false},
  {row: 'user.phone', type: 'char' , header: 'Phone', width: '90px', visicha: false, visifin: false},
  {row: 'user.postal', type: 'char' , header: 'Postal', width: '90px', visicha: false, visifin: false},
  {row: 'user.address', type: 'char' , header: 'Address', width: '90px', visicha: false, visifin: false},
  {row: 'user.comment', type: 'char' , header: 'User Comment', width: '90px', visicha: false, visifin: false},
  {row: 'user.challenges.length', type: 'char' , header: 'Challenge Count', width: '90px', visicha: false, visifin: false},
  {row: 'challenge.challengename', type: 'char' , header: 'Challenge Name', width: '90px', visicha: true, visifin: true},
  {row: 'challenge.challengedate', type: 'date' , header: 'Challenge Date', width: '90px', visicha: true, visifin: true},
  {row: 'challenge.paymentmethod', type: 'char' , header: 'Payment Method', width: '90px', visicha: true, visifin: true},
  {row: 'challenge.receipt', type: 'char' , header: 'Receipt', width: '90px', visicha: true, visifin: true},
  {row: 'challenge.receiptdate', type: 'date' , header: 'Receipt Date', width: '90px', visicha: true, visifin: true},
  {row: 'challenge.receiptmethod', type: 'char' , header: 'Receipt Method', width: '90px', visicha: true, visifin: true},
  {row: 'challenge.deliverydate', type: 'date' , header: 'Delivery Date', width: '90px', visicha: true, visifin: false},
  {row: 'challenge.deliverymethod', type: 'char' , header: 'Delivery Method', width: '90px', visicha: true, visifin: false},
  {row: 'challenge.collectiondate', type: 'date' , header: 'Collection Date', width: '90px', visicha: true, visifin: false},
  {row: 'challenge.comment', type: 'char' , header: 'Challenge Comment', width: '90px', visicha: true, visifin: true}
]

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

  cellClick (rowNumber, columnId, e) {
    const uid = e.target.dataset.userId
    const cid = e.target.dataset.challengeId
    const user = Object.assign({}, this.props.users.filter(user => user._id === uid)[0])
    const challenge = Object.assign({}, user.challenges.filter(challenge => challenge._id === cid)[0])
    delete user.challenges

    this.props.selectRow(user, challenge)
    this.handleOpen()
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
    const tabChanged = (value) => {
      this.props.changeTab(value)
    }

    const userHeaders = (
      <TableRow>
        {columns.filter(column => column.row.indexOf('user.') === 0).map((column, index) =>
          <TableHeaderColumn key={index}>{column.header}</TableHeaderColumn>
        )}
      </TableRow>
    )

    const users = this.props.users.map((user, index) =>
      <TableRow key={index}>
        {columns.filter(column => column.row.indexOf('user.') === 0).map((column, index_c) =>
          <TableRowColumn key={index_c} style={{width: column.width}} data-user-id={user._id}>
            {(column.type === 'date') ? this.dateFormat(eval(column.row)) : eval(column.row)}
          </TableRowColumn>
        )}
      </TableRow>
    )

    const userColumns = {
      'user': columns.filter(column => column.row.indexOf('user.') === 0 && column.row.split('.').length === 2).map(column => column.row.split('.')[1])
    }

    const challengeHeaders = (
      <TableRow>
        {columns.filter(column => column.visicha).map((column, index) =>
          <TableHeaderColumn key={index} style={{width: column.width}}>{column.header}</TableHeaderColumn>
        )}
      </TableRow>
    )

    const challenges = this.props.users.map(user =>
      user.challenges.map((challenge, index) =>
        <TableRow key={index}>
          {columns.filter(column => column.visicha).map((column, index) =>
            <TableRowColumn key={index} style={{width: column.width}}>
              {(column.type === 'date') ? this.dateFormat(eval(column.row)) : eval(column.row)}
            </TableRowColumn>
          )}
        </TableRow>
      )
    )

    const financeHeaders = (
      <TableRow>
        {columns.filter(column => column.visifin).map((column, index) =>
          <TableHeaderColumn key={index}>{column.header}</TableHeaderColumn>
        )}
      </TableRow>
    )

    const challengesForFinance = (
      this.props.users.filter(user => user.lastname.indexOf(this.props.filter.name) > -1 || user.firstname.indexOf(this.props.filter.name) > -1).map(user =>
        user.challenges.filter(challenge => ! this.props.filter.unpaid || ! challenge.receiptdate).map((challenge, index) =>
          <TableRow key={index}>
            {columns.filter(column => column.visifin).map((column, index) =>
              <TableRowColumn key={index} style={{width: column.width}} data-user-id={user._id} data-challenge-id={challenge._id}>
                {(column.type === 'date') ? this.dateFormat(eval(column.row)) : eval(column.row)}
              </TableRowColumn>
            )}
          </TableRow>
        )
      )
    )

    const financeColumns = {
      'user': columns.filter(column => column.row.indexOf('user.') === 0 && column.visifin).map(column => column.row.split('.')[1]),
      'challenge': columns.filter(column => column.row.indexOf('challenge.') === 0 && column.visifin).map(column => column.row.split('.')[1])
    }

    const actions = (updateColumns) => [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={e => this.handleClose()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={e => this.props.updateAdminData(this.props.user, this.props.challenge, updateColumns)}
      />,
    ]

    const updateUserDialog = (
      <Dialog
        title="Update User Fields"
        actions={actions(userColumns)}
        modal={false}
        open={this.props.open && this.props.tab === 'users'}
        autoScrollBodyContent={true}
        onRequestClose={e => this.handleClose()}
      >
        <TextField
          name='lastname'
          floatingLabelText="Last Name"
          value={this.props.user.lastname}
          underlineStyle={styles.underlineStyle}
          disabled={true}
        /><br />
        <TextField
          name='comment'
          floatingLabelText="Comment"
          value={this.props.user.comment}
          fullWidth={true}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        />
      </Dialog>
    )

    const updateFinanceDialog = (
      <Dialog
        title="Update Finance Fields"
        actions={actions(financeColumns)}
        modal={false}
        open={this.props.open && this.props.tab === 'finance'}
        autoScrollBodyContent={true}
        onRequestClose={e => this.handleClose()}
      >
        <TextField
          name='lastname'
          floatingLabelText="Last Name"
          value={this.props.user.lastname}
          underlineStyle={styles.underlineStyle}
          disabled={true}
          style={styles.nameField}
        />
        <TextField
          name='firstname'
          floatingLabelText="First Name"
          value={this.props.user.firstname}
          underlineStyle={styles.underlineStyle}
          disabled={true}
          style={styles.nameField}
        /><br />
        <TextField
          name='challengename'
          floatingLabelText="Challenge Name"
          value={this.props.challenge.challengename}
          underlineStyle={styles.underlineStyle}
          disabled={true}
        />
        <DatePicker
          name='challengedate'
          floatingLabelText="Challenge Date"
          value={(! this.props.challenge.challengedate) ? null : new Date(this.props.challenge.challengedate)}
          mode="landscape"
          underlineStyle={styles.underlineStyle}
          disabled={true}
        />
        <DatePicker
          name='receiptdate'
          floatingLabelText="Receipt Date"
          value={(! this.props.challenge.receiptdate) ? null : new Date(this.props.challenge.receiptdate)}
          mode="landscape"
          underlineStyle={styles.underlineStyle}
          onChange={(e, v) => this.props.inputChallengeData("receiptdate", v.toString())}
        />
        <SelectField
          name="receiptmethod"
          floatingLabelText="Receipt Method"
          value={this.props.challenge.receiptmethod}
          onChange={(e, i, v) => this.props.inputChallengeData("receiptmethod", v)}
        >
          <MenuItem value="crupdatecard" primaryText="Crupdate Card" />
          <MenuItem value="paypal" primaryText="PayPal" />
          <MenuItem value="banktransfer" primaryText="Bank Transfer" />
          <MenuItem value="postaltransfer" primaryText="Postal Transfer" />
        </SelectField>
        <TextField
          name='comment'
          floatingLabelText="Comment"
          value={this.props.challenge.comment}
          fullWidth={true}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
        />
      </Dialog>
    )

    return (
      <div>
        <AppBar
          title={"TBOC - Admin"}
          iconElementRight={<FlatButton label="Log Out" onClick={e => this.logout()} />}
        />
        <Tabs
          value={this.props.tab}
          onChange={value => tabChanged(value)}
        >
          <Tab label="Users" value="users">
            <div>
              <Table height="70vh" onCellClick={(rowNumber, columnId, e) => this.cellClick(rowNumber, columnId, e)}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  {userHeaders}
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {users}
                </TableBody>
              </Table>
              <div style={styles.margin20}>
                <p style={styles.error}>{this.props.msg}</p>
              </div>
              {updateUserDialog}
            </div>
          </Tab>
          <Tab label="Challenges" value="challenges">
            <div>
              <Table height="70vh" bodyStyle={{overflow:'visible'}}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  {challengeHeaders}
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {challenges}
                </TableBody>
              </Table>
            </div>
          </Tab>
          <Tab label="Finance" value="finance">
            <div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
              <TextField
                name='name'
                floatingLabelText="Filter: Name"
                value={this.props.filter.name}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.changeFilter(e.target.name, e.target.value)}
                style={styles.marginLeft20}
              />
              <Checkbox
                label="Unpaid"
                checked={this.props.filter.unpaid}
                onCheck={(e, v) => this.props.changeFilter('unpaid', v)}
                style={styles.marginLeft20}
              />
              </div>
              <Table height="70vh" onCellClick={(rowNumber, columnId, e) => this.cellClick(rowNumber, columnId, e)}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  {financeHeaders}
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {challengesForFinance}
                </TableBody>
              </Table>
              <div style={styles.margin20}>
                <p style={styles.error}>{this.props.msg}</p>
              </div>
              {updateFinanceDialog}
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
