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
import Drawer from 'material-ui/Drawer'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import ActionLanguage from 'material-ui/svg-icons/action/language'
import Subheader from 'material-ui/Subheader'

const columns = [
  {row:  'user.userid',                 type:  'char',  header:  'userid',            width_usr: '15%', width_cha: 150, width_bea: '0',   width_fin : '0'},
  {row:  'user.challenges.length',      type:  'char',  header:  'count',             width_usr: '5%', width_cha: '0',  width_bea: '0',   width_fin : '0'},
  {row:  'user.signupdate',             type:  'date',  header:  'signupdate',        width_usr: '8%', width_cha: 70,  width_bea: '0',   width_fin : '0'},
  {row:  'user.lastname',               type:  'char',  header:  'lastname',          width_usr: '7%', width_cha: 50,  width_bea: '6%',  width_fin : '6%'},
  {row:  'user.firstname',              type:  'char',  header:  'firstname',         width_usr: '7%', width_cha: 50,  width_bea: '6%',  width_fin : '6%'},
  {row:  'user.lastname_kana',          type:  'char',  header:  'lastname_kana',     width_usr: '7%', width_cha: 50,  width_bea: '0',   width_fin : '0'},
  {row:  'user.firstname_kana',         type:  'char',  header:  'firstname_kana',    width_usr: '7%', width_cha: 50,  width_bea: '0',   width_fin : '0'},
  {row:  'user.phone',                  type:  'char',  header:  'phone',             width_usr: '10%', width_cha: 90, width_bea: '0',   width_fin : '0'},
  {row:  'user.postal',                 type:  'char',  header:  'postal',            width_usr: '24%', width_cha: 200, width_bea: '0',   width_fin : '0',
   row2: 'user.address',                type2: 'char',  header2: 'address'},
  {row:  'user.challenges.indexOf(challenge) + 1', type:  'char',  header:  'no',     width_usr: '0', width_cha: 40,   width_bea: '4%',  width_fin : '4%'},
  {row:  'challenge.registrationdate',  type:  'date',  header:  'registrationdate',  width_usr: '0', width_cha: 70,   width_bea: '8%',  width_fin : '8%'},
  {row:  'challenge.challengename',     type:  'char',  header:  'challengename',     width_usr: '0', width_cha: 100,   width_bea: '10%', width_fin : '13%',
   row2: 'challenge.challengedate',     type2: 'date',  header2: 'challengedate'},
  {row:  'challenge.paymentmethod',     type:  'char',  header:  'paymentmethod',     width_usr: '0', width_cha: 90,   width_bea: '0',   width_fin : '10%', convert: true,
   row2:  'challenge.receipt',          type2: 'char',  header2: 'receipt_short'},
  {row:  'challenge.receiptdate',       type:  'date',  header:  'receiptdate',       width_usr: '0', width_cha: 70,   width_bea: '8%',  width_fin : '8%',
   row2: 'challenge.receiptuser',       type2: 'char',  header2: 'receiptuser'},
  {row:  'challenge.amount',            type:  'char',  header:  'amount',            width_usr: '0', width_cha: 60,   width_bea: '0',   width_fin : '6%'},
  {row:  'challenge.deliverydate',      type:  'date',  header:  'deliverydate',      width_usr: '0', width_cha: 70,   width_bea: '8%',  width_fin : '0',
   row2: 'challenge.deliveryuser',      type2: 'char',  header2: 'deliveryuser'},
  {row:  'challenge.deliverymethod',    type:  'char',  header:  'deliverymethod',    width_usr: '0', width_cha: 70,   width_bea: '9%',  width_fin : '0'},
  {row:  'challenge.collectiondate',    type:  'date',  header:  'collectiondate',    width_usr: '0', width_cha: 70,   width_bea: '8%',  width_fin : '0',
   row2: 'challenge.collectionuser',    type2: 'char',  header2: 'collectionuser'},
  {row:  'challenge.strapdeliverydate', type:  'date',  header:  'strapdeliverydate', width_usr: '0', width_cha: 80,   width_bea: '8%',  width_fin : '0',
   row2: 'challenge.strapdeliveryuser', type2: 'char',  header2: 'strapdeliveryuser'},
  {row:  'challenge.certno',            type:  'char',  header:  'certno',            width_usr: '0', width_cha: 80,   width_bea: '0',   width_fin : '8%'},
  {row:  'challenge.certdeliverydate',  type:  'date',  header:  'certdeliverydate',  width_usr: '0', width_cha: 80,   width_bea: '0',   width_fin : '8%',
   row2: 'challenge.certdeliveryuser',  type2: 'char',  header2: 'certdeliveryuser'},
  {row:  'challenge.comment',           type:  'char',  header:  'comment',           width_usr: '0', width_cha: 150,   width_bea: '15%', width_fin : '20%',
   row2: 'challenge.comment_sok',       type2: 'char',  header2: 'comment_sok'}
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

  yearFormat (date) {
    return (date) ? new Date(date).getFullYear() : '1900'
  }

  monthFormat (date) {
    return this.zeroFill(((date) ? new Date(date).getMonth() : 0) + 1)
  }

  render () {
    const tabChanged = (value) => {
      this.props.changeTab(value)
    }

    const filteredUsers = this.props.users.filter(user => user.lastname.indexOf(this.props.filter.name) > -1
                                               || user.firstname.indexOf(this.props.filter.name) > -1
                                               || user.lastname_kana.indexOf(this.props.filter.name) > -1
                                               || user.firstname_kana.indexOf(this.props.filter.name) > -1)

    const userHeaders = (
      <TableRow>
        {columns.filter(column => column.width_usr !== '0').map((column, index) =>
          <TableHeaderColumn key={index} style={{width: column.width_usr}}>
            {dict[this.props.lang][column.header]}<br />
            {dict[this.props.lang][column.header2]}
          </TableHeaderColumn>
        )}
        {(filteredUsers.length > 10) ? <TableHeaderColumn key='dummy' style={{width: '1%'}} /> : ''}
      </TableRow>
    )

    const users = (
      filteredUsers.map((user, index) =>
        <TableRow key={index}>
          {columns.filter(column => column.width_usr !== '0').map((column, index_c) =>
            <TableRowColumn key={index_c} style={{width: column.width_usr}} data-user-id={user._id}>
              {(column.type === 'date') ? this.dateFormat(eval(column.row)) : eval(column.row)}<br />
              {(column.type2 === 'date') ? this.dateFormat(eval(column.row2)) : eval(column.row2)}
            </TableRowColumn>
          )}
        </TableRow>
      )
    )

    const userColumns = {
      'user': columns.filter(column => column.width_usr !== '0' && column.row.split('.').length === 2)
                     .map(column => (column.row2) ? [column.row.split('.')[1], column.row2.split('.')[1]] : column.row.split('.')[1])
                     .concat(['passwd'])
    }

    const challengeHeaders = (
      <TableRow>
        {columns.filter(column => column.width_cha !== '0').map((column, index) =>
          (column.header2) ?
            [
              <TableHeaderColumn key={index} style={{width: column.width_cha}}>
                {dict[this.props.lang][column.header]}
              </TableHeaderColumn>,
              <TableHeaderColumn key={(index + 1) * -1} style={{width: column.width_cha}}>
                {dict[this.props.lang][column.header2]}
              </TableHeaderColumn>
            ]
          :
            <TableHeaderColumn key={index} style={{width: column.width_cha}}>
              {dict[this.props.lang][column.header]}
            </TableHeaderColumn>
        )}
      </TableRow>
    )

    const challenges = (
      filteredUsers.map(user =>
        user.challenges.filter(challenge => true).reverse().map((challenge, index) =>
          <TableRow key={index}>
            {columns.filter(column => column.width_cha !== '0').map((column, index_c) =>
              (column.row2) ?
                [
                  <TableRowColumn key={index_c} style={{width: column.width_cha}} data-user-id={user._id} data-challenge-id={challenge._id}>
                    {(column.type === 'date') ? this.dateFormat(eval(column.row)) : (column.convert) ? dict[this.props.lang][eval(column.row)] : eval(column.row)}
                  </TableRowColumn>,
                  <TableRowColumn key={index_c} style={{width: column.width_cha}} data-user-id={user._id} data-challenge-id={challenge._id}>
                    {(column.type2 === 'date') ? this.dateFormat(eval(column.row2)) : (column.convert2) ? dict[this.props.lang][eval(column.row2)] : eval(column.row2)}
                  </TableRowColumn>
                ]
              :
                <TableRowColumn key={index_c} style={{width: column.width_cha}} data-user-id={user._id} data-challenge-id={challenge._id}>
                  {(column.type === 'date') ? this.dateFormat(eval(column.row)) : (column.convert) ? dict[this.props.lang][eval(column.row)] : eval(column.row)}
                </TableRowColumn>
            )}
          </TableRow>
        )
      )
    )

    const challengeColumns = {
      'user': columns.filter(column => column.row.indexOf('user.') === 0 && column.width_cha !== '0'  && column.row.split('.').length === 2)
                     //.map(column => column.row.split('.')[1]),
                     .map(column => (column.row2) ? [column.row.split('.')[1], column.row2.split('.')[1]] : column.row.split('.')[1]),
      'challenge': columns.filter(column => column.row.indexOf('challenge.') === 0 && column.width_cha !== '0'  && column.row.split('.').length === 2)
                          .map(column => (column.row2) ? [column.row.split('.')[1], column.row2.split('.')[1]] : column.row.split('.')[1])
    }

    
    const beadsFilter = (challenge) => (! this.props.filter.undelivered || ! challenge.deliverydate) && (! this.props.filter.uncollected || ! challenge.collectiondate)

    const filterdChallengesForBeads = (
      Array.prototype.concat.apply([], filteredUsers.map(user =>
        user.challenges.filter(challenge => beadsFilter(challenge)))
      )
    )

    const beadsHeaders = (
      <TableRow>
        {columns.filter(column => column.width_bea !== '0').map((column, index) =>
          <TableHeaderColumn key={index} style={{width: column.width_bea}}>
            {dict[this.props.lang][column.header]}<br />
            {dict[this.props.lang][column.header2]}
          </TableHeaderColumn>
        )}
        {(filterdChallengesForBeads.length > 10) ? <TableHeaderColumn key='dummy' style={{width: '1%'}} /> : ''}
      </TableRow>
    )

    const challengesForBeads = (
      filteredUsers.map(user =>
        user.challenges.filter(challenge => beadsFilter(challenge)).reverse().map((challenge, index) =>
          <TableRow key={index}>
            {columns.filter(column => column.width_bea !== '0').map((column, index_c) =>
              <TableRowColumn key={index_c} style={{width: column.width_bea}} data-user-id={user._id} data-challenge-id={challenge._id}>
                {(column.type === 'date') ? this.dateFormat(eval(column.row)) : (column.convert) ? dict[this.props.lang][eval(column.row)] : eval(column.row)}<br />
                {(column.type2 === 'date') ? this.dateFormat(eval(column.row2)) : (column.convert2) ? dict[this.props.lang][eval(column.row2)] : eval(column.row2)}
              </TableRowColumn>
            )}
          </TableRow>
        )
      )
    )

    const beadsColumns = {
      'user': columns.filter(column => column.row.indexOf('user.') === 0 && column.width_bea !== '0'  && column.row.split('.').length === 2)
                     //.map(column => column.row.split('.')[1]),
                     .map(column => (column.row2) ? [column.row.split('.')[1], column.row2.split('.')[1]] : column.row.split('.')[1]),
      'challenge': columns.filter(column => column.row.indexOf('challenge.') === 0 && column.width_bea !== '0'  && column.row.split('.').length === 2)
                          .map(column => (column.row2) ? [column.row.split('.')[1], column.row2.split('.')[1]] : column.row.split('.')[1])
    }

    const financeFilter = (challenge) => (! this.props.filter.unpaid || ! challenge.receiptdate)

    const filterdChallengesForFinance = (
      Array.prototype.concat.apply([], filteredUsers.map(user =>
        user.challenges.filter(challenge => financeFilter(challenge)))
      )
    )

    const financeHeaders = (
      <TableRow>
        {columns.filter(column => column.width_fin !== '0').map((column, index) =>
          <TableHeaderColumn key={index} style={{width: column.width_fin}}>
            {dict[this.props.lang][column.header]}<br />
            {dict[this.props.lang][column.header2]}
          </TableHeaderColumn>
        )}
        {(filterdChallengesForFinance.length > 10) ? <TableHeaderColumn key='dummy' style={{width: '1%'}} /> : ''}
      </TableRow>
    )

    const challengesForFinance = (
      filteredUsers.map(user =>
        user.challenges.filter(challenge => financeFilter(challenge)).reverse().map((challenge, index) =>
          <TableRow key={index}>
            {columns.filter(column => column.width_fin !== '0').map((column, index_c) =>
              <TableRowColumn key={index_c} style={{width: column.width_fin}} data-user-id={user._id} data-challenge-id={challenge._id}>
                {(column.type === 'date') ? this.dateFormat(eval(column.row)) : (column.convert) ? dict[this.props.lang][eval(column.row)] : eval(column.row)}<br />
                {(column.type2 === 'date') ? this.dateFormat(eval(column.row2)) : (column.convert2) ? dict[this.props.lang][eval(column.row2)] : eval(column.row2)}
              </TableRowColumn>
            )}
          </TableRow>
        )
      )
    )

    const financeColumns = {
      'user': columns.filter(column => column.row.indexOf('user.') === 0 && column.width_fin !== '0' && column.row.split('.').length === 2)
                     .map(column => (column.row2) ? [column.row.split('.')[1], column.row2.split('.')[1]] : column.row.split('.')[1]),
      'challenge': columns.filter(column => column.row.indexOf('challenge.') === 0 && column.width_fin !== '0' && column.row.split('.').length === 2)
                          .map(column => (column.row2) ? [column.row.split('.')[1], column.row2.split('.')[1]] : column.row.split('.')[1])
    }

    const statsColumns = [
      {row:  'year', width: '8%'},
      {row:  'month', width: '8%'},
      {row:  'count_signupUser', width: '15%'},
      {row:  'count_challengeUser', width: '15%'},
      {row:  'count_challenge', width: '15%'},
      {row:  'amount', width: '15%'}
    ]

    const stats = (type) => (
      this.props.users.reduce((result_u, current_u) => {
        let element_u = result_u.find((previous) =>
          previous.year === this.yearFormat(current_u.signupdate)
          && (previous.month === ((type === 'year') ? '' : this.monthFormat(current_u.signupdate)))
        )
        if (element_u) {
          element_u.count_signupUser++
        } else {
          result_u.push({
            year: this.yearFormat(current_u.signupdate),
            month: (type === 'year') ? '' : this.monthFormat(current_u.signupdate),
            count_signupUser: 1,
            previous_userid: null,
            count_challengeUser: 0,
            count_challenge: 0,
            amount: 0
          })
        }

        current_u.challenges.reduce((result_c, current_c) => {
          let element = result_c.find((previous) =>
            previous.year === this.yearFormat(current_c.registrationdate)
            && (previous.month === ((type === 'year') ? '' : this.monthFormat(current_c.registrationdate)))
          )
          if (element) {
            if (element.previous_userid !== current_u.userid) {
              element.count_challengeUser++
              element.previous_userid = current_u.userid
            }
            element.count_challenge++
            element.amount += Number((current_c.amount) ? current_c.amount : 0)
          } else {
            result_c.push({
              year: this.yearFormat(current_c.registrationdate),
              month: (type === 'year') ? '' : this.monthFormat(current_c.registrationdate),
              count_signupUser: 0,
              previous_userid: current_u.userid,
              count_challengeUser: 1,
              count_challenge: 1,
              amount: Number((current_c.amount) ? current_c.amount : 0)
            })
          }
          return result_c
        }, result_u)
        return result_u
      }, []).sort((a, b) => {
        if (a.year + a.month > b.year + b.month) return -1
        if (a.year + a.month < b.year + b.month) return 1
        return 0
      }).map((row, index) =>
        <TableRow key={index}>
          {statsColumns.filter((column) => (type === 'year' && column.row === 'month') ? false : true).map((column, index_c) =>
          <TableRowColumn key={index_c} style={{width: column.width}}>
            {row[column.row]}
          </TableRowColumn>
        )}
        </TableRow>
      )
    )

    const statsHeaders = (type) => (
      <TableRow>
        {statsColumns.filter((column) => (type === 'year' && column.row === 'month') ? false : true).map((column, index) =>
          <TableHeaderColumn key={index} style={{width: column.width}}>
            {dict[this.props.lang][column.row]}
          </TableHeaderColumn>
        )}
        {(stats(type).length > 10) ? <TableHeaderColumn key='dummy' style={{width: '2%'}} /> : ''}
      </TableRow>
    )

    const actions = (updateColumns) => [
      <RaisedButton
        label={dict[this.props.lang].cancel}
        primary={true}
        style={styles.margin10}
        onClick={e => this.handleClose()}
      />,
      <RaisedButton
        label={dict[this.props.lang].update}
        secondary={true}
        style={styles.margin10}
        onClick={e => this.props.updateAdminData(this.props.user, this.props.challenge, updateColumns)}
      />,
    ]

    const updateUserDialog = (
      <Dialog
        title={dict[this.props.lang].updateUserFields}
        titleStyle={styles.dialogTitle}
        actions={actions(userColumns)}
        modal={false}
        open={this.props.open && this.props.tab === 'users'}
        autoScrollBodyContent={true}
        onRequestClose={e => this.handleClose()}
      >
        <TextField
          name='userid'
          floatingLabelText={dict[this.props.lang].userid}
          value={this.props.user.userid}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        /><br />
        <TextField
          name='passwd'
          floatingLabelText={dict[this.props.lang].password}
          floatingLabelFixed={true}
          type='password'
          hintText={dict[this.props.lang].password_hint}
          value={this.props.user.passwd}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        />
        <DatePicker
          name='signupdate'
          floatingLabelText={dict[this.props.lang].signupdate}
          value={(! this.props.user.signupdate) ? null : new Date(this.props.user.signupdate)}
          mode="landscape"
          underlineStyle={styles.underlineStyle}
          onChange={(e, v) => this.props.inputUserData("signupdate", v.toString())}
        />
        <TextField
          name='lastname'
          floatingLabelText={dict[this.props.lang].lastname}
          value={this.props.user.lastname}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
          style={styles.nameField}
        />
        <TextField
          name='firstname'
          floatingLabelText={dict[this.props.lang].firstname}
          value={this.props.user.firstname}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
          style={styles.nameField}
        /><br />
        <TextField
          name='lastname_kana'
          floatingLabelText={dict[this.props.lang].lastname_kana}
          value={this.props.user.lastname_kana}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
          style={styles.nameField}
        />
        <TextField
          name='firstname_kana'
          floatingLabelText={dict[this.props.lang].firstname_kana}
          value={this.props.user.firstname_kana}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
          style={styles.nameField}
        /><br />
        <TextField
          name='phone'
          floatingLabelText={dict[this.props.lang].phone}
          value={this.props.user.phone}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        /><br />
        <TextField
          name='postal'
          floatingLabelText={dict[this.props.lang].postal}
          value={this.props.user.postal}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        /><br />
        <TextField
          name='address'
          floatingLabelText={dict[this.props.lang].address}
          value={this.props.user.address}
          fullWidth={true}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        />
        <TextField
          name='comment'
          floatingLabelText={dict[this.props.lang].comment}
          value={this.props.user.comment}
          fullWidth={true}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
        />
      </Dialog>
    )

    const updateBeadsDialog = (
      <Dialog
        title={dict[this.props.lang].updateBeadsFields}
        titleStyle={styles.dialogTitle}
        actions={actions(beadsColumns)}
        modal={false}
        open={this.props.open && this.props.tab === 'beads'}
        autoScrollBodyContent={true}
        onRequestClose={e => this.handleClose()}
      >
        <TextField
          name='lastname'
          floatingLabelText={dict[this.props.lang].lastname}
          value={this.props.user.lastname}
          underlineStyle={styles.underlineStyle}
          disabled={true}
          style={styles.nameField}
        />
        <TextField
          name='firstname'
          floatingLabelText={dict[this.props.lang].firstname}
          value={this.props.user.firstname}
          underlineStyle={styles.underlineStyle}
          disabled={true}
          style={styles.nameField}
        />
        <DatePicker
          name='registrationdate'
          floatingLabelText={dict[this.props.lang].registrationdate}
          value={(! this.props.challenge.registrationdate) ? null : new Date(this.props.challenge.registrationdate)}
          mode="landscape"
          underlineStyle={styles.underlineStyle}
          onChange={(e, v) => this.props.inputChallengeData("registrationdate", v.toString())}
        />
        <div style={styles.flexRow}>
          <TextField
            name='challengename'
            floatingLabelText={dict[this.props.lang].challengename}
            value={this.props.challenge.challengename}
            underlineStyle={styles.underlineStyle}
            onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
            style={styles.marginRight20}
          />
          <DatePicker
            name='challengedate'
            floatingLabelText={dict[this.props.lang].challengedate}
            value={(! this.props.challenge.challengedate) ? null : new Date(this.props.challenge.challengedate)}
            mode="landscape"
            underlineStyle={styles.underlineStyle}
            onChange={(e, v) => this.props.inputChallengeData("challengedate", v.toString())}
          />
        </div>
        <div style={styles.flexRow}>
          <DatePicker
            name='deliverydate'
            floatingLabelText={dict[this.props.lang].deliverydate}
            value={(! this.props.challenge.deliverydate) ? null : new Date(this.props.challenge.deliverydate)}
            mode="landscape"
            underlineStyle={styles.underlineStyle}
            onChange={(e, v) => this.props.inputChallengeData("deliverydate", v.toString())}
            style={styles.marginRight20}
          />
          <TextField
            name='deliveryuser'
            floatingLabelText={dict[this.props.lang].deliveryuser}
            value={this.props.challenge.deliveryuser}
            underlineStyle={styles.underlineStyle}
            onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
          />
        </div>
        <TextField
          name='deliverymethod'
          floatingLabelText={dict[this.props.lang].deliverymethod}
          value={this.props.challenge.deliverymethod}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
        />
        <div style={styles.flexRow}>
          <DatePicker
            name='collectiondate'
            floatingLabelText={dict[this.props.lang].collectiondate}
            value={(! this.props.challenge.collectiondate) ? null : new Date(this.props.challenge.collectiondate)}
            mode="landscape"
            underlineStyle={styles.underlineStyle}
            onChange={(e, v) => this.props.inputChallengeData("collectiondate", v.toString())}
            style={styles.marginRight20}
          />
          <TextField
            name='collectionuser'
            floatingLabelText={dict[this.props.lang].collectionuser}
            value={this.props.challenge.collectionuser}
            underlineStyle={styles.underlineStyle}
            onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
          />
        </div>
        <div style={styles.flexRow}>
          <DatePicker
            name='strapdeliverydate'
            floatingLabelText={dict[this.props.lang].strapdeliverydate}
            value={(! this.props.challenge.strapdeliverydate) ? null : new Date(this.props.challenge.strapdeliverydate)}
            mode="landscape"
            underlineStyle={styles.underlineStyle}
            onChange={(e, v) => this.props.inputChallengeData("strapdeliverydate", v.toString())}
            style={styles.marginRight20}
          />
          <TextField
            name='strapdeliveryuser'
            floatingLabelText={dict[this.props.lang].strapdeliveryuser}
            value={this.props.challenge.strapdeliveryuser}
            underlineStyle={styles.underlineStyle}
            onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
          />
        </div>
        <TextField
          name='comment_sok'
          floatingLabelText={dict[this.props.lang].comment_sok}
          value={this.props.challenge.comment_sok}
          fullWidth={true}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
        />
      </Dialog>
    )

    const updateFinanceDialog = (
      <Dialog
        title={dict[this.props.lang].updateFinanceFields}
        titleStyle={styles.dialogTitle}
        actions={actions(financeColumns)}
        modal={false}
        open={this.props.open && this.props.tab === 'finance'}
        autoScrollBodyContent={true}
        onRequestClose={e => this.handleClose()}
      >
        <TextField
          name='lastname'
          floatingLabelText={dict[this.props.lang].lastname}
          value={this.props.user.lastname}
          underlineStyle={styles.underlineStyle}
          disabled={true}
          style={styles.nameField}
        />
        <TextField
          name='firstname'
          floatingLabelText={dict[this.props.lang].firstname}
          value={this.props.user.firstname}
          underlineStyle={styles.underlineStyle}
          disabled={true}
          style={styles.nameField}
        /><br />
        <TextField
          name='challengename'
          floatingLabelText={dict[this.props.lang].challengename}
          value={this.props.challenge.challengename}
          underlineStyle={styles.underlineStyle}
          disabled={true}
        />
        <DatePicker
          name='challengedate'
          floatingLabelText={dict[this.props.lang].challengedate}
          value={(! this.props.challenge.challengedate) ? null : new Date(this.props.challenge.challengedate)}
          mode="landscape"
          underlineStyle={styles.underlineStyle}
          disabled={true}
        />
        <SelectField
          name="paymentmethod"
          floatingLabelText={dict[this.props.lang].paymentmethod}
          value={this.props.challenge.paymentmethod}
          onChange={(e, i, v) => this.props.inputChallengeData("paymentmethod", v)}
        >
          <MenuItem value="creditcard" primaryText={dict[this.props.lang].creditcard} />
          <MenuItem value="paypal" primaryText={dict[this.props.lang].paypal} />
          <MenuItem value="banktransfer" primaryText={dict[this.props.lang].banktransfer} />
          <MenuItem value="postaltransfer" primaryText={dict[this.props.lang].postaltransfer} />
        </SelectField>
        <div style={styles.flexRow}>
          <DatePicker
            name='receiptdate'
            floatingLabelText={dict[this.props.lang].receiptdate}
            value={(! this.props.challenge.receiptdate) ? null : new Date(this.props.challenge.receiptdate)}
            mode="landscape"
            underlineStyle={styles.underlineStyle}
            onChange={(e, v) => this.props.inputChallengeData("receiptdate", v.toString())}
            style={styles.marginRight20}
          />
          <TextField
            name='receiptuser'
            floatingLabelText={dict[this.props.lang].receiptuser}
            value={this.props.challenge.receiptuser}
            underlineStyle={styles.underlineStyle}
            onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
          />
        </div>
        <TextField
          name='amount'
          floatingLabelText={dict[this.props.lang].amount}
          value={this.props.challenge.amount}
          type='number'
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
        /><br />
        <TextField
          name='certno'
          floatingLabelText={dict[this.props.lang].certno}
          value={this.props.challenge.certno}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
        />
        <div style={styles.flexRow}>
          <DatePicker
            name='certdeliverydate'
            floatingLabelText={dict[this.props.lang].certdeliverydate}
            value={(! this.props.challenge.certdeliverydate) ? null : new Date(this.props.challenge.certdeliverydate)}
            mode="landscape"
            underlineStyle={styles.underlineStyle}
            onChange={(e, v) => this.props.inputChallengeData("certdeliverydate", v.toString())}
            style={styles.marginRight20}
          />
          <TextField
            name='certdeliveryuser'
            floatingLabelText={dict[this.props.lang].certdeliveryuser}
            value={this.props.challenge.certdeliveryuser}
            underlineStyle={styles.underlineStyle}
            onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
          />
        </div>
        <TextField
          name='comment_sok'
          floatingLabelText={dict[this.props.lang].comment_sok}
          value={this.props.challenge.comment_sok}
          fullWidth={true}
          underlineStyle={styles.underlineStyle}
          onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
        />
      </Dialog>
    )

    return (
      <div>
        <Drawer
          docked={false}
          open={this.props.drawer}
          onRequestChange={() => this.props.openCloseDrawer(false)}
        >
          <MenuItem
            onClick={e => {this.logout(); this.props.openCloseDrawer(false)}}
            primaryText={dict[this.props.lang].logout}
            leftIcon={<ActionExitToApp />} />
          <MenuItem
            onClick={e => {this.props.changeLang(dict[this.props.lang].langChange); this.props.openCloseDrawer(false)}}
            primaryText={dict[this.props.lang].langChangeButton}
            leftIcon={<ActionLanguage />} />
        </Drawer>
        <AppBar
          title={dict[this.props.lang].adminTitle}
          style={styles.appbar}
          onLeftIconButtonClick={() => this.props.openCloseDrawer(true)}
        />
        <Tabs
          value={this.props.tab}
          onChange={value => tabChanged(value)}
        >
          <Tab label={dict[this.props.lang].users} value="users">
            <div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                <TextField
                  name='name'
                  floatingLabelText={dict[this.props.lang].nameFilter}
                  value={this.props.filter.name}
                  underlineStyle={styles.underlineStyle}
                  onChange={e => this.props.changeFilter(e.target.name, e.target.value)}
                  style={styles.marginLeft20}
                />
              </div>
              <Table height="60vh" onCellClick={(rowNumber, columnId, e) => this.cellClick(rowNumber, columnId, e)}>
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
          <Tab label={dict[this.props.lang].challenges} value="challenges">
            <div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                <TextField
                  name='name'
                  floatingLabelText={dict[this.props.lang].nameFilter}
                  value={this.props.filter.name}
                  underlineStyle={styles.underlineStyle}
                  onChange={e => this.props.changeFilter(e.target.name, e.target.value)}
                  style={styles.marginLeft20}
                />
              </div>
              <Table height="60vh" bodyStyle={{overflow:'visible'}}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  {challengeHeaders}
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {challenges}
                </TableBody>
              </Table>
            </div>
          </Tab>
          <Tab label={dict[this.props.lang].beads} value="beads">
            <div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                <TextField
                  name='name'
                  floatingLabelText={dict[this.props.lang].nameFilter}
                  value={this.props.filter.name}
                  underlineStyle={styles.underlineStyle}
                  onChange={e => this.props.changeFilter(e.target.name, e.target.value)}
                  style={styles.marginLeft20}
                />
                <Checkbox
                  label={dict[this.props.lang].undelivered}
                  checked={this.props.filter.undelivered}
                  onCheck={(e, v) => this.props.changeFilter('undelivered', v)}
                  style={styles.inlineCheckbox}
                />
                <Checkbox
                  label={dict[this.props.lang].uncollected}
                  checked={this.props.filter.uncollected}
                  onCheck={(e, v) => this.props.changeFilter('uncollected', v)}
                  style={styles.inlineCheckbox}
                />
              </div>
              <Table height="60vh" onCellClick={(rowNumber, columnId, e) => this.cellClick(rowNumber, columnId, e)}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  {beadsHeaders}
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {challengesForBeads}
                </TableBody>
              </Table>
              {updateBeadsDialog}
            </div>
          </Tab>
          <Tab label={dict[this.props.lang].finance} value="finance">
            <div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                <TextField
                  name='name'
                  floatingLabelText={dict[this.props.lang].nameFilter}
                  value={this.props.filter.name}
                  underlineStyle={styles.underlineStyle}
                  onChange={e => this.props.changeFilter(e.target.name, e.target.value)}
                  style={styles.marginLeft20}
                />
                <Checkbox
                  label={dict[this.props.lang].unpaid}
                  checked={this.props.filter.unpaid}
                  onCheck={(e, v) => this.props.changeFilter('unpaid', v)}
                  style={styles.inlineCheckbox}
                />
              </div>
                <Table height="60vh" onCellClick={(rowNumber, columnId, e) => this.cellClick(rowNumber, columnId, e)}>
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
          <Tab label={dict[this.props.lang].stats} value="stats">
            <div style={styles.flexRow}>
              <div style={styles.marginRight20}>
                <Subheader>{dict[this.props.lang].byYear}</Subheader>
                <Table height="65vh">
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    {statsHeaders('year')}
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {stats('year')}
                  </TableBody>
                </Table>
                </div>
              <div>
                <Subheader>{dict[this.props.lang].byMonth}</Subheader>
                <Table height="65vh">
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    {statsHeaders('month')}
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {stats('month')}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
