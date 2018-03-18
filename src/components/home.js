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

const columns = [
  {row: 'index + 1', type: 'char', header: 'no', width: '5%', convert: false},
  {row: 'challenge.challengedate', type: 'date' , header: 'challengeDate', width: '15%', convert: false},
  {row: 'challenge.challengename', type: 'char' , header: 'challengeName', width: '20%', convert: false},
  {row: 'challenge.paymentmethod', type: 'char' , header: 'paymentMethod', width: '15%', convert: true},
  {row: 'challenge.receipt', type: 'char' , header: 'receipt', width: '15%', convert: false},
  {row: 'challenge.comment', type: 'char' , header: 'comment', width: '30%', convert: false}
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
    const rightButtons = (
      <div>
        <FlatButton label={dict[this.props.lang].langChangeButton} onClick={e => this.props.changeLang(dict[this.props.lang].langChange)} style={styles.appbarButton} />
        <FlatButton label={dict[this.props.lang].logout} onClick={e => this.props.redirectTo('/logout')} style={styles.appbarButton} />
      </div>
    )

    const errorText = (error) => {return (error === "required") ? dict[this.props.lang].required : error}

    const tabChanged = (value) => {
      this.props.changeTab(value)
    }

    const challengeHeaders = (
      <TableRow>
        {columns.map((column, index) =>
          <TableHeaderColumn key={index} style={{width: column.width}}>{dict[this.props.lang][column.header]}</TableHeaderColumn>
        )}
      </TableRow>
    )

    const challenges = this.props.challenges.map((challenge, index) =>
      <TableRow key={index}>
        {columns.map((column, index_c) =>
          <TableRowColumn key={index_c} style={{width: column.width}}>
            {(column.type === 'date') ? this.dateFormat(eval(column.row)) : (column.convert) ? dict[this.props.lang][eval(column.row)] : eval(column.row)}
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
        keyboardFocused={true}
        onClick={e => this.props.addChallenge(this.props.newchallenge)}
      />,
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

    const newChallngeDialog = (
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
        <AppBar
          title={dict[this.props.lang].homeTitle + this.props.user.lastname + " " + this.props.user.firstname}
          iconElementRight={rightButtons}
        />
        <Tabs
          value={this.props.tab}
          onChange={value => tabChanged(value)}
        >
          <Tab label={dict[this.props.lang].newChallenge} value="new">
            <div>
              <Table height="70vh"><TableBody displayRowCheckbox={false}>
                <TableRow displayBorder={false}>
                  <TableRowColumn style={styles.customColumn80}>
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
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>
                    <p>
                      <b>{dict[this.props.lang].challengeDate}:</b><br />
                      {dict[this.props.lang].challengeDateNote}
                    </p>
                    <DatePicker
                      name='challengedate'
                      mode="landscape"
                      errorText={errorText(this.props.errortext.challengedate)}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={(e, v) => this.props.inputChallengeData('challengedate', v.toString())}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn style={styles.wrapStyle}>
                    <p>
                      <b>{dict[this.props.lang].paymentMethod}:</b><br />
                      {dict[this.props.lang].paymentMethodNote}
                    </p>
                    <RadioButtonGroup
                      name="paymentmethod"
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
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
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn style={styles.wrapStyle}>
                    <p>
                      <b>{dict[this.props.lang].receipt}:</b><br />
                      {dict[this.props.lang].receiptNote}
                    </p>
                    <RadioButtonGroup
                      name="receipt"
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
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
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>
                    <p>
                      <b>{dict[this.props.lang].comment}:</b>
                    </p>
                    <TextField
                      name='comment'
                      fullWidth={true}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
              </TableBody></Table>

              <div style={styles.margin20}>
                <RaisedButton label={dict[this.props.lang].register} primary={true} onClick={e => this.handleOpen()} />
                <p style={styles.error}>{this.props.msg}</p>
              </div>
              {newChallngeDialog}
            </div>
          </Tab>
          <Tab label={dict[this.props.lang].challengeHistory} value="history">
            <div>
              <Table height="70vh">
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
            <div>
              <Table height="70vh"><TableBody displayRowCheckbox={false}>
                <TableRow displayBorder={false}>
                  <TableRowColumn style={styles.customColumn20}>{dict[this.props.lang].userid}:</TableRowColumn>
                  <TableRowColumn style={styles.customColumn80}>
                    <TextField
                      name='userid'
                      value={this.props.user.userid}
                      errorText={errorText(this.props.errortext.userid)}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>{dict[this.props.lang].password}:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='passwd'
                      type='password'
                      hintText={dict[this.props.lang].password_hint}
                      value={this.props.user.passwd}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>{dict[this.props.lang].fullname}:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='lastname'
                      value={this.props.user.lastname}
                      errorText={errorText(this.props.errortext.lastname)}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                      style={styles.nameField}
                    />
                    <TextField
                      name='firstname'
                      value={this.props.user.firstname}
                      errorText={errorText(this.props.errortext.firstname)}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                      style={styles.nameField}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>{dict[this.props.lang].fullname_kana}:</TableRowColumn>
                  <TableRowColumn>
                  <TextField
                      name='lastname_kana'
                      value={this.props.user.lastname_kana}
                      errorText={errorText(this.props.errortext.lastname_kana)}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                      style={styles.nameField}
                    />
                    <TextField
                      name='firstname_kana'
                      value={this.props.user.firstname_kana}
                      errorText={errorText(this.props.errortext.firstname_kana)}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                      style={styles.nameField}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>{dict[this.props.lang].phone}:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='phone'
                      value={this.props.user.phone}
                      errorText={errorText(this.props.errortext.phone)}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>{dict[this.props.lang].postal}:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='postal'
                      value={this.props.user.postal}
                      errorText={errorText(this.props.errortext.postal)}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>{dict[this.props.lang].address}:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='address'
                      value={this.props.user.address}
                      errorText={errorText(this.props.errortext.address)}
                      errorStyle={styles.errorStyle}
                      fullWidth={true}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>{dict[this.props.lang].comment}:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='comment'
                      value={this.props.user.comment}
                      fullWidth={true}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputUserData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
              </TableBody></Table>

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
