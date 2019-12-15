import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';
import Dashboard from './components/Dashboard';
import Header from './components/Project/Layout/Header';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import store from './store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './components/Project/Layout/Landing';
import Register from './components/Project/UserManagement/Register';
import Login from './components/Project/UserManagement/Login';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';
import SecureRoute from './securityUtils/secureRoutes';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;

  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = '/';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />

          <Switch>
            <SecureRoute exact path='/dashboard' component={Dashboard} />
            <SecureRoute exact path='/addProject' component={AddProject} />
            <SecureRoute
              exact
              path='/updateProject/:id'
              component={UpdateProject}
            />
            <SecureRoute
              exact
              path='/projectBoard/:id'
              component={ProjectBoard}
            />
            <SecureRoute
              exact
              path='/addProjectTask/:id'
              component={AddProjectTask}
            />
            <SecureRoute
              exact
              path='/updateProjectTask/:backlog_id/:pt_id'
              component={UpdateProjectTask}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
