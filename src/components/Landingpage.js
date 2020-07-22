import React, { useState , useEffect, useReducer, createContext } from 'react';
import Banner from '../images/Ffootball1.jpg';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';


const Landingpage = () => {
    
    const history = useHistory();

    const viewList = () => {
        history.push('/1');
    }

    const userLogin = () => {
        history.push('/login/user');
    }

  return (
    <section className="landing-page">
        <figure>
            <img src={Banner} alt="banner-image"/>
        </figure>
        <div>
            <h2>wants to explore the world</h2>
            <button onClick={viewList}>view post list</button>
            <button onClick={userLogin}>login</button>
        </div>
    </section>
  );
}

export default Landingpage;
