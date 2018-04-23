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
import Admin from './containers/admin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {orange500, blue500, grey600, cyan500} from 'material-ui/styles/colors'

import loginReducer from './reducers/login'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import createStore from './store'
import { resizeScreen } from './actions/common'

const history = createBrowserHistory()
const store = createStore(history);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/home' component={Home} />
          <Route path='/admin' component={Admin}/>
          <Route component={Login} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
)

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#9daa00',
    //accent1Color: orange500
  }
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
)

window.addEventListener('resize', () => {
  store.dispatch(resizeScreen(window.innerWidth))
})
