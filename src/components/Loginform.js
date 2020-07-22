import React, { useState , useEffect, useReducer, createContext, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';

import {userContext} from './App';

const regex = {
    userEmail: /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/,
    userPassword: /((?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z])){4,15}/
}


const Loginform = () => {

    const history = useHistory();
    const user = useContext(userContext);
    const [input , changeValue] = useState({ 
        userEmail : { value : "", status : null},  
        userPassword : { value: "", status : null}
    });

    const controlField = (value , field) => {

        const status =  value === "" ? null :  regex[field].test(value) ? ("success") : ("error") ;

        changeValue((prevState) => ({
            ...prevState,
            [field] : {
                value,
                status
            }
        }));
    }

    const userLogin = (e) => {
        e.preventDefault();
        if( input.userEmail.status === "success" && input.userPassword.status === "success" ) {
            user.changeLogin(true);
            window.localStorage.setItem('userLogin', JSON.stringify(true));
            history.goBack();
        } else {
            alert("PLEASE FILL THE ENTIRE FORM PROPERLY");
        }
    }

    return (
        <section className="login-form">
            <div className="wrapper">
                <h5>please login</h5>
                <form>
                    <div className={input.userEmail.status !== null ? (`form-group ${input.userEmail.status}`) : ("form-group")}>
                        <input type="text" id="email" placeholder="ENTER THE EMAIL ID" onChange={(e) => controlField(e.target.value, 'userEmail')} value={input.userEmail.value} />
                        <span>please enter the valid email id</span>
                    </div>
                    <div className={input.userPassword.status !== null ? (`form-group ${input.userPassword.status}`) : ("form-group")}>
                        <input type="password" id="password" placeholder="ENTER THE PASSWORD" onChange={(e) => controlField(e.target.value, 'userPassword')} value={input.userPassword.value}/>
                        <span>password must contain one special character and one number</span>
                    </div>
                    <div className="form-control">
                        <button onClick={userLogin} type="submit">click me</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Loginform;
