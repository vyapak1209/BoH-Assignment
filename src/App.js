import React, { Component } from "react";
import { Provider } from 'react-redux'
import store from './store'
import {BrowserRouter} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import routes from './navigationUtils/routes';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/base.css';

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
