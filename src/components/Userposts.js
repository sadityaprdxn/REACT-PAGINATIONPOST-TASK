import React, { useState , useEffect , useReducer } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useParams,
  useHistory
} from 'react-router-dom';
import Postli from './Postli';

const initialstate = {
    loading : true,
    isError : false,
    data : []
}

const userDataReducer = (state, action) => {
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

const Userposts = () => {

    const params = useParams();
    const history = useHistory();

    const [state, dispatch] = useReducer(userDataReducer, initialstate);
    const [pageNo, changePageNo] = useState(params.pageno);

    console.log(pageNo);

    useEffect(() => {
        
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            dispatch({
                type : 'LOADED',
                payload : response.data
            });
        }).catch(() => {
            dispatch({
                type : 'ERROR',
                payload : []
            });
        })
    }, []);

    const paginate = (page) => {
        history.push(`/${page}`);
        changePageNo(page);
    }

  return (
      <section className="user-posts">
          <div className="wrapper">
            <h2>users posts</h2>
            <ul className="posts-list">
                {
                    state.loading ?
                    (<li className="loading"><h3>loading</h3></li>) :

                    state.isError ? 
                    (<li className="error"><h3>error</h3></li>) :

                    state.data.map(({id, title}, index) => {
                        if(index < parseInt(pageNo)*10 && index >=  (parseInt(pageNo)*10)-10 && index < state.data.length ) {     
                        return (
                            <Postli
                                id = {id}
                                title = {title}
                                key = {id}
                            />
                        )
                        }
                    })
                }
            </ul>
            
            <ul className="pagination-list">
                {
                    state.loading || state.isError ?
                    (<li>?</li>) :

                    state.data.map(({id} , index) => {
                        if(index < Math.ceil(state.data.length/10)) {
                            const number = index + 1; 
                            return(
                                <li  key={id} className={pageNo == number ? "active" : ""} onClick={() => paginate(number)}>{number}</li>
                            )
                        }
                    })
                }
            </ul>

          </div>
      </section>
  );
}

export default Userposts;
