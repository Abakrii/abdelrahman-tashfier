import { AUTH_SET_TOKEN ,AUTH_REMOVE_TOKEN } from "../actions/actionTypes";


const initialState ={
  
    parsedRes: {}
};
const reducer = (state = initialState , action)=>{
    console.log(action)
    switch ( action.type){
        case AUTH_SET_TOKEN:
            return{
                ...state,
                parsedRes : action.parsedRes,
                
            };
       
        default:
            return state;
    }
};
export default  reducer;