import React, { useState , useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';

import {userContext} from './App'

const Postli = ({title, id}) => {

    const user = useContext(userContext);
    const history = useHistory();
    console.log(history);

    const checkLogin = (postid) => {
        debugger;
        if(user.isLogin) {
            history.push(`${history.location.pathname}/post/${postid}`)
        } else {
            history.push(`/login/user`);
        }
    }

    return (

        <li onClick={() => checkLogin(id)}>
            <figure>
                <img src="https://via.placeholder.com/150" alt="user post images"/>
            </figure>                    
            <h3>{title}</h3>
        </li>
    );
}

export default Postli;
