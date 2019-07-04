import { AUTH_SET_TOKEN , AUTH_REMOVE_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./index";
//import Toast from 'react-native-simple-toast';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

//import axios from 'axios';
const API_KEY = "AIzaSyCJarib7IcgK-elIZ0RWkLX2LZAYisnW48";

 

export const authSingIn = (authData) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
            API_KEY;
    
        fetch(
            url,
            {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            
            .then(res => res.json())
           
            .then(parsedRes => {
               
                console.log("parsed res in request" ,parsedRes);
                dispatch(authSetToken(parsedRes))
               
                if(!parsedRes.idToken){
                    alert("Authentication Failed , Please Try Again");
                }
                dispatch(uiStopLoading());
                
            })
            
            .catch(err => {
                alert("Authentication failed, please try again!");
                dispatch(uiStopLoading());
            });
             

    };
};

export const authSetToken = (parsedRes) => {
    return{
        type: AUTH_SET_TOKEN,
        parsedRes: parsedRes
    };
    
};

