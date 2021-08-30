import React from "react";
import { Router } from 'react-router-dom';

import Routes from "./routes";
import history from './history';

import { OptionListProvider } from "./store/optionList.context";
import { AuthProvider } from "./store/auth.context";

import "./styles.css";

const App = () => (
  <div className="App">
    <AuthProvider>
      <OptionListProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </OptionListProvider>
    </AuthProvider>

  </div>
);

export default App;
