import React, { useState , useEffect, useReducer, createContext } from 'react';
import '../scss/App.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Userposts from './Userposts';
import Loginform from './Loginform';
import Postdetails from './Postdetails';
import Errorpage from './Errorpage';
import Landingpage from './Landingpage';

export const userContext = createContext();


const App = () => {
  const [isLogin , changeLogin] = useState(false);

  useEffect(() => {
    const isUserLogin = JSON.parse(window.localStorage.getItem('userLogin'));
    if (isUserLogin) {
      changeLogin(isUserLogin);
    }
  }, []);

  return (
    <userContext.Provider value={{isLogin , changeLogin}}>
      <Router>
        <Route path="/" exact>
          <Landingpage />
        </Route>
        <Route path="/:pageno" exact>
          <Userposts />
        </Route>
        <Route path="/login/user" exact>
          <Loginform />
        </Route>
        <Route path="/:pageno/post/:postid" exact>
          {
            isLogin ? <Postdetails /> : <Errorpage />
          }
        </Route>
      </Router>
    </userContext.Provider>
  );
}

export default App;
