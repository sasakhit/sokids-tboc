import React, {Component} from 'react'
import request from 'superagent'
import {Redirect} from 'react-router-dom'
import styles from '../utils/styles'
import properties from '../utils/properties'
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
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import ActionLanguage from 'material-ui/svg-icons/action/language'

const columns = [
  {row:  'index + 1',                  type:  'char',  header:  'no',               width: {pc: '5%', mobile: '15px'}},
  {row:  'challenge.registrationdate', type:  'date' , header:  'registrationdate', width: {pc: '8%', mobile: '70px'}},
  {row:  'challenge.challengename',    type:  'char' , header:  'challengeName',    width: {pc: '18%', mobile: '120px'}},
  {row:  'challenge.paymentmethod',    type:  'char' , header:  'paymentMethod',    width: {pc: '15%', mobile: '100px'}, convert: true},
  {row:  'challenge.receipt',          type:  'char' , header:  'receipt',          width: {pc: '15%', mobile: '80px'}},
  {row:  'challenge.receiptdate',      type:  'date' , header:  'receiptdate',      width: {pc: '8%', mobile: '80px'}},
  {row:  'challenge.deliverydate',     type:  'date' , header:  'deliverydate',     width: {pc: '8%', mobile: '80px'}},
  {row:  'challenge.comment',          type:  'char' , header:  'comment',          width: {pc: '25%', mobile: '100px'}}
]

export default class Home extends Component {
  componentWillMount () {
    if (!window.localStorage.tboc_auth_token) {
      window.alert('Please login first')
      this.props.redirectTo('/login')
      return
    }

    this.props.loadUser(window.localStorage.tboc_id)
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
    const isMobile = this.props.width <= 500 ? true : false
    const device = isMobile ? 'mobile' : 'pc'
    const tableBodyStyle = isMobile ? {overflow: 'visible'} : null 

    const rightButtons = (
      <FlatButton label={dict[this.props.lang].langChangeButton} onClick={e => this.props.changeLang(dict[this.props.lang].langChange)} style={styles.appbarButton} />
    )

    const errorText = (error) => {return (error === "required") ? dict[this.props.lang].required : error}

    const tabChanged = (value) => {
      this.props.changeTab(value)
    }

    const challengeHeaders = (
      <TableRow>
        {columns.map((column, index) =>
          <TableHeaderColumn key={index} style={{width: column.width[device]}} className="hidden-xs">
            {dict[this.props.lang][column.header]}<br />
            {dict[this.props.lang][column.header2]}
          </TableHeaderColumn>
        )}
        {(this.props.challenges.length > 10) ? <TableHeaderColumn key='dummy' style={{width: '1%'}} /> : ''}
      </TableRow>
    )

    const challenges = this.props.challenges.map((challenge, index) =>
      <TableRow key={index}>
        {columns.map((column, index_c) =>
          <TableRowColumn key={index_c} style={{width: column.width[device]}} className="hidden-xs">
            {(column.type === 'date') ? this.dateFormat(eval(column.row)) : (column.convert) ? dict[this.props.lang][eval(column.row)] : eval(column.row)}<br />
            {(column.type2 === 'date') ? this.dateFormat(eval(column.row2)) : (column.convert2) ? dict[this.props.lang][eval(column.row2)] : eval(column.row2)}
          </TableRowColumn>
        )}
      </TableRow>
    )

    const newChallengeActions = [
      <FlatButton
        label={dict[this.props.lang].cancel}
        primary={true}
        onClick={e => this.handleClose()}
      />,
      <FlatButton
        label={dict[this.props.lang].register}
        primary={true}
        onClick={e => this.props.addChallenge(this.props.newchallenge)}
      />
    ]

    const updateUserActions = [
      <FlatButton
        label={dict[this.props.lang].cancel}
        primary={true}
        onClick={e => this.handleClose()}
      />,
      <FlatButton
        label={dict[this.props.lang].update}
        primary={true}
        keyboardFocused={true}
        onClick={e => this.props.updateUserData(this.props.user, {user: ['userid','passwd','lastname','firstname','lastname_kana','firstname_kana','postal', 'address','comment']})}
      />,
    ]

    const newChallengeDialog = (
      <Dialog
        title={dict[this.props.lang].newChallengeDialogTitle}
        actions={newChallengeActions}
        modal={false}
        open={this.props.open && this.props.tab === 'new'}
        onRequestClose={e => this.handleClose()}
      >
        {dict[this.props.lang].newChallengeDialogMessage}
      </Dialog>
    )

    const updateUserDialog = (
      <Dialog
        title={dict[this.props.lang].updateUserDialogTitle}
        actions={updateUserActions}
        modal={false}
        open={this.props.open && this.props.tab === 'profile'}
        onRequestClose={e => this.handleClose()}
      >
        {dict[this.props.lang].updateUserDialogMessage}
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
          title={<div>{dict[this.props.lang].homeTitle}
          <span style={{ fontSize: 'small', fontWeight: 300, marginRight: 80, bottom: 0, float: 'right' }}>{this.props.user.lastname + " " + this.props.user.firstname}</span></div>}
          style={styles.appbar}
          onLeftIconButtonClick={() => this.props.openCloseDrawer(true)}
        />
        <Tabs
          value={this.props.tab}
          onChange={value => tabChanged(value)}
        >
          <Tab label={dict[this.props.lang].newChallenge} value="new">
            <div style={styles.margin20}>
              <p>
                <b>{dict[this.props.lang].challengeName}:</b>
              </p>
              <TextField
                name='challengename'
                errorText={errorText(this.props.errortext.challengename)}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
              />
              <p>
                <b>{dict[this.props.lang].challengeDate}:</b><br />
                <div style={styles.note}>{dict[this.props.lang].challengeDateNote}</div>
              </p>
              <DatePicker
                name='challengedate'
                mode="landscape"
                errorText={errorText(this.props.errortext.challengedate)}
                errorStyle={styles.errorStyle}
                underlineStyle={styles.underlineStyle}
                onChange={(e, v) => this.props.inputChallengeData('challengedate', v.toString())}
              />
              <p>
                <b>{dict[this.props.lang].paymentMethod}:</b><br />
                <div style={styles.note}>{dict[this.props.lang].paymentMethodNote}</div>
              </p>
              <RadioButtonGroup
                name="paymentmethod"
                onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                style={styles.buttonLabel}
              >
                <RadioButton
                  value="creditcard"
                  label={dict[this.props.lang].creditcard}
                />
                <RadioButton
                  value="paypal"
                  label={dict[this.props.lang].paypal}
                />
                <RadioButton
                  value="banktransfer"
                  label={dict[this.props.lang].banktransfer}
                />
                <RadioButton
                  value="postaltransfer"
                  label={dict[this.props.lang].postaltransfer}
                />
              </RadioButtonGroup><br />
              <p>
                <b>{dict[this.props.lang].receipt}:</b><br />
                <div style={styles.note}>{dict[this.props.lang].receiptNote}</div>
              </p>
              <RadioButtonGroup
                name="receipt"
                onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                style={styles.buttonLabel}
              >
                <RadioButton
                  value="yes"
                  label={dict[this.props.lang].receiptYes}
                />
                <RadioButton
                  value="no"
                  label={dict[this.props.lang].receiptNo}
                />
              </RadioButtonGroup><br />
              <p>
                <b>{dict[this.props.lang].comment}:</b>
              </p>
              <TextField
                name='comment'
                fullWidth={true}
                underlineStyle={styles.underlineStyle}
                onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
              />
              <div style={styles.margin20}>
                <RaisedButton label={dict[this.props.lang].register} primary={true} onClick={e => this.handleOpen()} />
                <p style={styles.error}>{this.props.msg}</p>
              </div>
              {newChallengeDialog}
            </div>
          </Tab>
          <Tab label={dict[this.props.lang].challengeHistory} value="history">
            <div>
              <Table height="60vh" bodyStyle={tableBodyStyle}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  {challengeHeaders}
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {challenges.reverse()}
                </TableBody>
              </Table>
            </div>
          </Tab>
          <Tab label={dict[this.props.lang].profile} value="profile">
            <div style={styles.margin20}>
              <div style={styles.flexRow}>
                <TextField
                  {...properties.textFieldProps}
                  name='userid'
                  value={this.props.user.userid}
                  floatingLabelText={dict[this.props.lang].userid}
                  hintText='taro.yamada@boc.org'
                  errorText={errorText(this.props.errortext.userid)}
                  onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                />
              </div><br />
              <div style={styles.flexRow}>
                <TextField
                  {...properties.textFieldProps}
                  name='passwd'
                  hintText={dict[this.props.lang].password_hint}
                  value={this.props.user.passwd}
                  floatingLabelText={dict[this.props.lang].password}
                  type='password'
                  errorText={errorText(this.props.errortext.passwd)}
                  onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                />
              </div><br />
              <div style={styles.flexRow}>
                <TextField
                  {...properties.textFieldProps}
                  name='lastname'
                  value={this.props.user.lastname}
                  floatingLabelText={dict[this.props.lang].lastname}
                  hintText={dict[this.props.lang].lastname_hint}
                  errorText={errorText(this.props.errortext.lastname)}
                  onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                  style={styles.nameField}
                />
                <TextField
                  {...properties.textFieldProps}
                  name='firstname'
                  value={this.props.user.firstname}
                  floatingLabelText={dict[this.props.lang].firstname}
                  hintText={dict[this.props.lang].firstname_hint}
                  errorText={errorText(this.props.errortext.firstname)}
                  onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                  style={styles.nameField}
                />
              </div><br />
              <div style={styles.flexRow}>
                <TextField
                  {...properties.textFieldProps}
                  name='lastname_kana'
                  value={this.props.user.lastname_kana}
                  floatingLabelText={dict[this.props.lang].lastname_kana}
                  hintText={dict[this.props.lang].lastname_kana_hint}
                  errorText={errorText(this.props.errortext.lastname_kana)}
                  onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                  style={styles.nameField}
                />
                <TextField
                  {...properties.textFieldProps}
                  name='firstname_kana'
                  value={this.props.user.firstname_kana}
                  floatingLabelText={dict[this.props.lang].firstname_kana}
                  hintText={dict[this.props.lang].firstname_kana_hint}
                  errorText={errorText(this.props.errortext.firstname_kana)}
                  onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                  style={styles.nameField}
                />
              </div><br />
              <div style={styles.flexRow}>
                <TextField
                  {...properties.textFieldProps}
                  name='phone'
                  value={this.props.user.phone}
                  floatingLabelText={dict[this.props.lang].phone}
                  errorText={errorText(this.props.errortext.phone)}
                  onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                />
              </div><br />
              <div style={styles.flexRow}>
                <TextField
                  {...properties.textFieldProps}
                  name='postal'
                  value={this.props.user.postal}
                  floatingLabelText={dict[this.props.lang].postal}
                  errorText={errorText(this.props.errortext.postal)}
                  onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                />
              </div><br />
              <div style={styles.flexRow}>
                <TextField
                  {...properties.textFieldProps}
                  name='address'
                  value={this.props.user.address}
                  floatingLabelText={dict[this.props.lang].address}
                  errorText={errorText(this.props.errortext.address)}
                  fullWidth={true}
                  onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                />
              </div><br />
              <div style={styles.flexRow}>
                <TextField
                  {...properties.textFieldProps}
                  name='comment'
                  value={this.props.user.comment}
                  floatingLabelText={dict[this.props.lang].comment}
                  fullWidth={true}
                  onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                />
              </div>
              <div style={styles.margin20}>
                <RaisedButton label={dict[this.props.lang].update} primary={true} onClick={e => this.handleOpen()} />
                <p style={styles.error}>{this.props.msg}</p>
              </div>
              {updateUserDialog}
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
