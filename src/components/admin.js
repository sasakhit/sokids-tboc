import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../utils/styles'
import dict from '../utils/dictionary'
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
  {row: 'user.userid',              type: 'char', header: 'User ID',           width_usr: '15%', width_cha: '130px', width_fin : '15%'},
  {row: 'user.challenges.length',   type: 'char', header: 'Count',             width_usr: '5%',  width_cha: '0',     width_fin : '0'},
  {row: 'user.lastname',            type: 'char', header: 'Last Name',         width_usr: '8%',  width_cha: '70px',  width_fin : '8%'},
  {row: 'user.firstname',           type: 'char', header: 'First Name',        width_usr: '8%',  width_cha: '70px',  width_fin : '8%'},
  {row: 'user.lastname_kana',       type: 'char', header: 'Last (Kana)',       width_usr: '8%',  width_cha: '0',     width_fin : '0'},
  {row: 'user.firstname_kana',      type: 'char', header: 'First (Kana)',      width_usr: '8%',  width_cha: '0',     width_fin : '0'},
  {row: 'user.phone',               type: 'char', header: 'Phone',             width_usr: '10%', width_cha: '0',     width_fin : '0'},
  {row: 'user.postal',              type: 'char', header: 'Postal',            width_usr: '8%',  width_cha: '0',     width_fin : '0'},
  {row: 'user.address',             type: 'char', header: 'Address',           width_usr: '20%', width_cha: '0',     width_fin : '0'},
  {row: 'user.comment',             type: 'char', header: 'User Comment',      width_usr: '10%', width_cha: '0',     width_fin : '0'},
  {row: 'challenge.challengename',  type: 'char', header: 'Challenge Name',    width_usr: '0',   width_cha: '100px', width_fin : '14%'},
  {row: 'challenge.challengedate',  type: 'date', header: 'Challenge Date',    width_usr: '0',   width_cha: '80px',  width_fin : '9%'},
  {row: 'challenge.paymentmethod',  type: 'char', header: 'Payment Method',    width_usr: '0',   width_cha: '90px',  width_fin : '8%'},
  {row: 'challenge.receipt',        type: 'char', header: 'Receipt',           width_usr: '0',   width_cha: '50px',  width_fin : '8%'},
  {row: 'challenge.receiptdate',    type: 'date', header: 'Receipt Date',      width_usr: '0',   width_cha: '80px',  width_fin : '9%'},
  {row: 'challenge.receiptmethod',  type: 'char', header: 'Receipt Method',    width_usr: '0',   width_cha: '90px',  width_fin : '8%'},
  {row: 'challenge.deliverydate',   type: 'date', header: 'Delivery Date',     width_usr: '0',   width_cha: '80px',  width_fin : '0'},
  {row: 'challenge.deliverymethod', type: 'char', header: 'Delivery Method',   width_usr: '0',   width_cha: '90px',  width_fin : '0'},
  {row: 'challenge.collectiondate', type: 'date', header: 'Collection Date',   width_usr: '0',   width_cha: '80px',  width_fin : '0'},
  {row: 'challenge.comment',        type: 'char', header: 'Challenge Comment', width_usr: '0',   width_cha: '100px', width_fin : '13%'}
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
        {columns.filter(column => column.width_usr !== '0').map((column, index) =>
          <TableHeaderColumn key={index} style={{width: column.width_usr}}>{column.header}</TableHeaderColumn>
        )}
        <TableHeaderColumn key='dummy' style={{width: '1%'}} />
      </TableRow>
    )

    const users = this.props.users.map((user, index) =>
      <TableRow key={index}>
        {columns.filter(column => column.width_usr !== '0').map((column, index_c) =>
          <TableRowColumn key={index_c} style={{width: column.width_usr}} data-user-id={user._id}>
            {(column.type === 'date') ? this.dateFormat(eval(column.row)) : eval(column.row)}
          </TableRowColumn>
        )}
      </TableRow>
    )

    const userColumns = {
      'user': columns.filter(column => column.width_usr !== '0' && column.row.split('.').length === 2)
                      .map(column => column.row.split('.')[1])
                      .concat(['passwd'])
    }

    const challengeHeaders = (
      <TableRow>
        {columns.filter(column => column.width_cha !== '0').map((column, index) =>
          <TableHeaderColumn key={index} style={{width: column.width_cha}}>{column.header}</TableHeaderColumn>
        )}
      </TableRow>
    )

    const challenges = (
      this.props.users.filter(user => user.lastname.indexOf(this.props.filter.name) > -1 || user.firstname.indexOf(this.props.filter.name) > -1).map(user =>
        user.challenges.map((challenge, index) =>
          <TableRow key={index}>
            {columns.filter(column => column.width_cha !== '0').map((column, index_c) =>
              <TableRowColumn key={index_c} style={{width: column.width_cha}} data-user-id={user._id} data-challenge-id={challenge._id}>
                {(column.type === 'date') ? this.dateFormat(eval(column.row)) : eval(column.row)}
              </TableRowColumn>
            )}
          </TableRow>
        )
      )
    )

    const challengeColumns = {
      'user': columns.filter(column => column.row.indexOf('user.') === 0 && column.width_cha !== '0').map(column => column.row.split('.')[1]),
      'challenge': columns.filter(column => column.row.indexOf('challenge.') === 0 && column.width_cha !== '0').map(column => column.row.split('.')[1])
    }

    const financeHeaders = (
      <TableRow>
        {columns.filter(column => column.width_fin !== '0').map((column, index) =>
          <TableHeaderColumn key={index} style={{width: column.width_fin}}>{column.header}</TableHeaderColumn>
        )}
        <TableHeaderColumn key='dummy' style={{width: '1%'}} />
      </TableRow>
    )

    const challengesForFinance = (
      this.props.users.filter(user => user.lastname.indexOf(this.props.filter.name) > -1 || user.firstname.indexOf(this.props.filter.name) > -1).map(user =>
        user.challenges.filter(challenge => ! this.props.filter.unpaid || ! challenge.receiptdate).map((challenge, index) =>
          <TableRow key={index}>
            {columns.filter(column => column.width_fin !== '0').map((column, index_c) =>
              <TableRowColumn key={index_c} style={{width: column.width_fin}} data-user-id={user._id} data-challenge-id={challenge._id}>
                {(column.type === 'date') ? this.dateFormat(eval(column.row)) : eval(column.row)}
              </TableRowColumn>
            )}
          </TableRow>
        )
      )
    )

    const financeColumns = {
      'user': columns.filter(column => column.row.indexOf('user.') === 0 && column.width_fin !== '0').map(column => column.row.split('.')[1]),
      'challenge': columns.filter(column => column.row.indexOf('challenge.') === 0 && column.width_fin !== '0').map(column => column.row.split('.')[1])
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
          name='userid'
          floatingLabelText="User ID"
          value={this.props.user.userid}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        /><br />
        <TextField
          name='passwd'
          floatingLabelText="Password"
          floatingLabelFixed={true}
          type='password'
          hintText={dict[this.props.lang].password_hint}
          value={this.props.user.passwd}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        /><br />
        <TextField
          name='lastname'
          floatingLabelText="Last Name"
          value={this.props.user.lastname}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
          style={styles.nameField}
        />
        <TextField
          name='firstname'
          floatingLabelText="First Name"
          value={this.props.user.firstname}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
          style={styles.nameField}
        /><br />
        <TextField
          name='lastname_kana'
          floatingLabelText="Last Name (Kana)"
          value={this.props.user.lastname_kana}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
          style={styles.nameField}
        />
        <TextField
          name='firstname_kana'
          floatingLabelText="First Name (Kana)"
          value={this.props.user.firstname_kana}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
          style={styles.nameField}
        /><br />
        <TextField
          name='phone'
          floatingLabelText="Phone"
          value={this.props.user.phone}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        /><br />
        <TextField
          name='postal'
          floatingLabelText="Postal"
          value={this.props.user.postal}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        /><br />
        <TextField
          name='address'
          floatingLabelText="Address"
          value={this.props.user.address}
          fullWidth={true}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        />
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

    const updateChallengeDialog = (
      <Dialog
        title="Update Challenge Fields"
        actions={actions(challengeColumns)}
        modal={false}
        open={this.props.open && this.props.tab === 'challenges'}
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
          onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
        />
        <DatePicker
          name='challengedate'
          floatingLabelText="Challenge Date"
          value={(! this.props.challenge.challengedate) ? null : new Date(this.props.challenge.challengedate)}
          mode="landscape"
          underlineStyle={styles.underlineStyle}
          onChange={(e, v) => this.props.inputChallengeData("challengedate", v.toString())}
        />
        <SelectField
          name="paymentmethod"
          floatingLabelText="Payment Method"
          value={this.props.challenge.receiptmethod}
          onChange={(e, i, v) => this.props.inputChallengeData("paymentmethod", v)}
        >
          <MenuItem value="creditcard" primaryText="Credit Card" />
          <MenuItem value="paypal" primaryText="PayPal" />
          <MenuItem value="banktransfer" primaryText="Bank Transfer" />
          <MenuItem value="postaltransfer" primaryText="Postal Transfer" />
        </SelectField>
        <DatePicker
          name='deliverydate'
          floatingLabelText="Delivery Date"
          value={(! this.props.challenge.deliverydate) ? null : new Date(this.props.challenge.deliverydate)}
          mode="landscape"
          underlineStyle={styles.underlineStyle}
          onChange={(e, v) => this.props.inputChallengeData("deliverydate", v.toString())}
        />
        <TextField
          name='deliverymethod'
          floatingLabelText="Delivery Method"
          value={this.props.challenge.deliverymethod}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
        />
        <DatePicker
          name='collectiondate'
          floatingLabelText="Collection Date"
          value={(! this.props.challenge.collectiondate) ? null : new Date(this.props.challenge.collectiondate)}
          mode="landscape"
          underlineStyle={styles.underlineStyle}
          onChange={(e, v) => this.props.inputChallengeData("collectiondate", v.toString())}
        />
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
          <MenuItem value="creditcard" primaryText="Credit Card" />
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
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                <TextField
                  name='name'
                  floatingLabelText="Filter: Name"
                  value={this.props.filter.name}
                  underlineStyle={styles.underlineStyle}
                  onChange={e => this.props.changeFilter(e.target.name, e.target.value)}
                  style={styles.marginLeft20}
                />
              </div>
              <Table height="70vh" bodyStyle={{overflow:'visible'}} onCellClick={(rowNumber, columnId, e) => this.cellClick(rowNumber, columnId, e)}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  {challengeHeaders}
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {challenges}
                </TableBody>
              </Table>
              {updateChallengeDialog}
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
