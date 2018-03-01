import React from 'react'
import ReactDOM from 'react-dom'
import "./index.scss";
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import Login from './containers/login'
import Signup from './containers/signup'
import Home from './containers/home'
import Admin from './containers/admin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import loginReducer from './reducers/login'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import createStore from './store'

const history = createBrowserHistory()
//const store = createStore(loginReducer)
const store = createStore(history);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/home' component={Home} />
          <Route path="/admin" component={Admin}/>
          <Route component={Login} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
)
