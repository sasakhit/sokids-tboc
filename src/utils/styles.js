import {orange500, blue500, grey600, cyan500, white, pinkA200} from 'material-ui/styles/colors'
import {typography} from 'material-ui/styles'

const styles = {
  wrapStyle: {
    wordWrap: 'break-word',
    whiteSpace: 'normal'
  },
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: '#017ba4',
  },
  floatingLabelStyle: {
    color: grey600,
  },
  floatingLabelFocusStyle: {
    color: '#017ba4',
  },
  error: {
    color: pinkA200
  },
  navigation: {
    fontSize: 15,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block'
  },
  dialogTitle: {
    color: white,
    backgroundColor: '#017ba4'
  },
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    marginBottom: 20
  },
  note: {
    fontSize: 13,
    fontWeight: typography.fontWeightLight
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: typography.fontWeightLight
  },
  paper: {
    padding: 30
  },
  clear: {
    clear: 'both'
  },
  margin10: {
    margin: 10
  },
  margin20: {
    margin: 20
  },
  marginRight20: {
    marginRight: 20
  },
  marginLeft20: {
    marginLeft: 20
  },
  customColumn20: {
    width: '20%'
  },
  customColumn80: {
    width: '80%'
  },
  appbarButton: {
    backgroundColor: 'transparent',
    color: 'white',
    marginTop: 6
  },
  nameField: {
    width: 150,
    marginRight: 20
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  appbar: {
    backgroundImage: `url(${'icons/sok_logo.png'})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    backgroundSize: 'auto 60%'
  }
}
export default styles
