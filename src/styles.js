import {orange500, blue500, grey600} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';

const styles = {
  wrapStyle: {
    wordWrap: 'break-word',
    whiteSpace: 'normal'
  },
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: blue500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  error: {
    color: 'red'
  },
  navigation: {
    fontSize: 15,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block'
  },
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    marginBottom: 20
  },
  paper: {
    padding: 30
  },
  clear: {
    clear: 'both'
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
  }
}
export default styles
