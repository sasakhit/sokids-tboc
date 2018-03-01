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

export default class Home extends Component {
  componentWillMount () {
    if (!window.localStorage.tboc_auth_token) {
      window.alert('Please login first')
      this.props.redirectTo('/login')
      return
    }

    //this.loadUser()
    this.props.loadUser(window.localStorage.tboc_id)
  }

  /*
  loadUser () {
    request
      .get('/tboc/api/get_user')
      .query({userid: window.localStorage.tboc_id})
      .end((err, res) => {
        console.log(err, res)
        if (err) return
        this.setState({
          userid: res.body.user.userid,
          passwd: res.body.user.passwd,
          fullname: res.body.user.fullname,
          kananame: res.body.user.kananame,
          phone: res.body.user.phone,
          postal: res.body.user.postal,
          address: res.body.user.address,
          comment: res.body.user.comment,
          challenges: res.body.user.challenges
        })
      })
  }

  addChallenge () {
    request
      .get('/tboc/api/add_challenge')
      .query({
        userid: window.localStorage.tboc_id,
        token: window.localStorage.tboc_auth_token,
        challenge: this.state.newchallenge
      })
      .end((err, res) => {
        if (err) return
        if (!res.body.status) {
          window.alert(res.body.msg)
          return
        }
        this.setState({open: false, tab: 'history'})
        this.loadUser()
      })
  }
  */

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
    /*
    if (this.state.jump) {
      return <Redirect to={this.state.jump} />
    }
    */

    /*
    const changed = (name, e, v = null) => {
      const new_value = (e !== null) ? e.target.value : v  
      const new_errortext = (new_value !== '') ? '' : 'This field is required'

      if (this.state.tab === 'new') {
        this.setState({
          newchallenge: Object.assign({}, this.state.newchallenge, {
            [name]: new_value
          }),
          errortext: Object.assign({}, this.state.errortext, {
            [name]: new_errortext
          })
        })
      }
      else {
        this.setState({
          [name]: new_value,
          errortext: Object.assign({}, this.state.errortext, {
            [name]: new_errortext
          })
        })
      }
    }*/

    const tabChanged = (value) => {
      //this.setState({
      //  tab: value
      //})
      this.props.changeTab(value)
    }

    const challenges = this.props.challenges.map(challenge =>
      <TableRow>
        <TableRowColumn>{this.dateFormat(challenge.dateofchallenge)}</TableRowColumn>
        <TableRowColumn>{challenge.nameofchallenge}</TableRowColumn>
        <TableRowColumn>{challenge.paymentmethod}</TableRowColumn>
        <TableRowColumn>{challenge.receipt}</TableRowColumn>
        <TableRowColumn>{challenge.comment}</TableRowColumn>
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
        onClick={e => this.props.addChallenge(this.props.newchallenge)}
      />,
    ];
  

    const customColumn20 = {width: '20%'};
    const customColumn80 = {width: '80%'};

    return (
      <div>
        <AppBar
          title={"TBOC - Home for " + this.props.userinfo.fullname}
          iconElementRight={<FlatButton label="Log Out" onClick={e => this.logout()} />}
        />
        <Tabs
          value={this.props.tab}
          onChange={value => tabChanged(value)}
        >
          <Tab label="New Challenge" value="new">
            <div>
              <Table><TableBody displayRowCheckbox={false}>
                <TableRow displayBorder={false}>
                  <TableRowColumn style={customColumn80}>
                    <p>
                      <b>Name of Challenge:</b>
                    </p>
                    <TextField
                      name='nameofchallenge'
                      errorText={this.props.errortext.nameofchallenge}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>
                    <p>
                      <b>Date of Challenge:</b><br />
                      ビーズが開催日までに到着するようお知らせください
                    </p>
                    <DatePicker
                      name='dateofchallenge'
                      mode="landscape"
                      errorText={this.props.errortext.dateofchallenge}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      onChange={(e, v) => this.props.inputChallengeData('dateofchallenge', v.toString())}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn style={styles.wrapStyle}>
                    <p>
                      <b>Payment Method for Donation:</b><br />
                      参加の際にはビーズ１セット（2個）につき3,000円以上の寄付をお願いしております。
                      ご都合の良い送金方法をお選びください。　※送付先などの詳細はこの登録フォームの下に記載してありますのでご確認ください。 
                      寄付金は全額、ビーズ・オブ・カレッジ®プログラムの運用のために使わせていただきます。
                    </p>
                    <RadioButtonGroup
                      name="paymentmethod"
                      //onChange={(e) => changed('paymentmethod', e)}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    >
                      <RadioButton
                        value="creditcard"
                        label="Credit Card"
                      />
                      <RadioButton
                        value="paypal"
                        label="PayPal"
                      />
                      <RadioButton
                        value="banktransfer"
                        label="Bank Transfer"
                      />
                      <RadioButton
                        value="postaltransfer"
                        label="Postal Transfer"
                      />
                    </RadioButtonGroup><br />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn style={styles.wrapStyle}>
                    <p>
                      <b>Receipt for Tax Deduction:</b><br />
                      認定NPO法人への寄付は、個人、企業ともに税額控除対象になります。
                      個人の場合、地方税とあわせて寄附金額の最大約50％が控除されます。 （詳細：内閣府NPOホームページ http://bit.ly/UCy2vc）
                    </p>
                    <RadioButtonGroup
                      name="receipt"
                      //onChange={(e) => changed('receipt', e)}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    >
                      <RadioButton
                        value="yes"
                        label="寄附金控除を受けるための領収書を送ってください"
                      />
                      <RadioButton
                        value="no"
                        label="寄附金控除を受けるための領収書は不要"
                      />
                    </RadioButtonGroup><br />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>
                    <p>
                      <b>Comment:</b>
                    </p>
                    <TextField
                      name='comment'
                      fullWidth={true}
                      underlineStyle={styles.underlineStyle}
                      //onChange={e => changed('comment', e)}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
              </TableBody></Table>

              <RaisedButton label="Send" primary={true} onClick={e => this.handleOpen()} />
              <p style={styles.error}>{this.props.msg}</p>
              <Dialog
                title="Dialog With Actions"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={e => this.handleClose()}
              >
                Are you ok to add your new challenge?
              </Dialog>
            </div>
          </Tab>
          <Tab label="Challenge History" value="history">
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
                  {challenges}
                </TableBody>
              </Table>
            </div>
          </Tab>
          <Tab label="Profile" value="profile">
            <div>
              <Table><TableBody displayRowCheckbox={false}>
                <TableRow displayBorder={false}>
                  <TableRowColumn style={customColumn20}>Email (User ID):</TableRowColumn>
                  <TableRowColumn style={customColumn80}>
                    <TextField
                      name='userid'
                      value={this.props.userinfo.userid}
                      errorText={this.props.errortext.userid}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      //onChange={e => changed('userid', e)}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>Password:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='passwd'
                      value='*****'
                      errorText={this.props.errortext.passwd}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      //onChange={e => changed('passwd', e)}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>Full Name:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='fullname'
                      value={this.props.userinfo.fullname}
                      errorText={this.props.errortext.fullname}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      //onChange={e => changed('fullname', e)}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>Name (Kana):</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='kananame'
                      value={this.props.userinfo.kananame}
                      errorText={this.props.errortext.kananame}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      //onChange={e => changed('kananame', e)}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>Phone:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='phone'
                      value={this.props.userinfo.phone}
                      errorText={this.props.errortext.phone}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      //onChange={e => changed('phone', e)}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>Postal:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='postal'
                      value={this.props.userinfo.postal}
                      errorText={this.props.errortext.postal}
                      errorStyle={styles.errorStyle}
                      underlineStyle={styles.underlineStyle}
                      //onChange={e => changed('postal', e)}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                  <TableRowColumn>Address:</TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      name='address'
                      value={this.props.userinfo.address}
                      errorText={this.props.errortext.address}
                      errorStyle={styles.errorStyle}
                      fullWidth={true}
                      underlineStyle={styles.underlineStyle}
                      //onChange={e => changed('address', e)}
                      onChange={e => this.props.inputChallengeData(e.target.name, e.target.value)}
                    />
                  </TableRowColumn>
                </TableRow>
              </TableBody></Table>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
