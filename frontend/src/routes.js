import React, { useContext } from "react";
import { /*BrowserRouter,*/ Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from './store/auth.context.js';

import Main from "./pages/main";
import ExperimentList from "./pages/ExperimentList";
import Login from './pages/login';

function CustomRoute({ isPrivate, ...rest }) {
    const { loading, authenticated } = useContext(AuthContext);
  
    if (loading) {
      return <h1>Loading...</h1>;
    }
  
    if (isPrivate && !authenticated) {
      return <Redirect to="/login" />
    }
  
    return <Route {...rest} />;
}

const Routes = () => (
  <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isPrivate exact path="/" component={Main} />
      <CustomRoute isPrivate exact path="/experiment/list" component={ExperimentList} />

  </Switch>
);

export default Routes;