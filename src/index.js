import React from 'react'
import ReactDOM from 'react-dom'
import "./index.scss";
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import TBOCLogin from './tboc/login'
import TBOCSignup from './tboc/signup'
import TBOCHome from './tboc/home'
import TBOCAdmin from './tboc/admin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path='/login' component={TBOCLogin} />
        <Route path='/signup' component={TBOCSignup} />
        <Route path='/home' component={TBOCHome} />
        <Route path="/admin" component={TBOCAdmin}/>
        <Route component={TBOCLogin} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app'))
