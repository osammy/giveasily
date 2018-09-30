import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import {donationsReducer, userReducer, donationsOrPledgesReducer} from './Reducers/main'



const userAction = {
    type:'updateUser',
    payload:{
        user:'sam'
    }
}

// function productsReducer (state = [], action) {
//         console.log(action.type)

//     return state;
// }
// function usersReducer (state = "", action) {
//     switch(action.type) {
//         case 'updateUser':
//         return action.payload

//         default:
//         return state;
//     }
    
// }

const allReducers = combineReducers({
    user:userReducer,
    donations:donationsReducer,
    donationsOrPledges:donationsOrPledgesReducer
})

const store = createStore(
    allReducers,{
        donations:[],
        user:{},
        donationsOrPledges:[]
    },
    window.devToolsExtension && window.devToolsExtension()
)


ReactDOM.render(<Provider store={store}><App /></Provider>
, document.getElementById('root'));
// registerServiceWorker();
