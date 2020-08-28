import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {userContext} from './App';


const initialstate = {
    loading : true,
    isError : false,
    data : {}
}

const userDetailDataReducer = (state, action) => {
    switch(action.type) {
        case 'LOADED':
            return {
                loading : false,
                isError : false,
                data : action.payload
            }
        case 'ERROR':
            return {
                loading : false,
                isError : true,
                data : action.payload
            }
        default:
            return state
    }
}

const Postdetails = () => {

    const params = useParams();

    const [state, dispatch] = useReducer(userDetailDataReducer, initialstate);

    useEffect(() => {
        
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params.postid}`)
        .then((response) => {
            dispatch({
                type : 'LOADED',
                payload : response.data
            });
        }).catch(() => {
            dispatch({
                type : 'ERROR',
                payload : {}
            });
        })

    }, []);

    return (
        <section className="post-detail">
            <div className="wrapper">
            { state.loading && ( <h3>loading</h3> ) }

            { state.isError && ( <h3>error</h3> ) }

            { Object.keys(state.data).length !== 0 &&    
                (
                    <>
                    <h3>title : {state.data.title}</h3>
                    <p>body : {state.data.body}</p>
                    <span>post id {state.data.id}</span>
                    <figure>
                        <img src="https://picsum.photos/200" alt="user post images"/>
                    </figure>
                    </>
                )
            }
        
            </div>
        </section>
    )
}

export default Postdetails;
