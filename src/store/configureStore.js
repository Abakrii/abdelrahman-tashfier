import {createStore,combineReducers , compose , applyMiddleware} from 'redux';

import  thunk from 'redux-thunk';



import  uiReducer from "./reducers/spinner";

import authReducer from "./reducers/auth";
import categoryReducer from "./reducers/Categories";
import markersReducer from "./reducers/Markers";


const rootReducer = combineReducers({
   
    ui:uiReducer,
    auth: authReducer,
    Markers:markersReducer,
    Categories:categoryReducer
});

let composeEnhancers = compose;
if (__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const configureStore = ()=>{
    return createStore(rootReducer ,composeEnhancers(applyMiddleware(thunk )));
};

export  default configureStore;