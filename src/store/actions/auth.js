import {TRY_AUTH} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./index";
import Toast from 'react-native-simple-toast';

import axios from 'axios';
const API_KEY = "AIzaSyCJarib7IcgK-elIZ0RWkLX2LZAYisnW48";

export const authSingIn = (authData , authMode) => {
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
            .catch(err => {
                console.log("err", err);
                alert("Authentication failed, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading());
                console.log("parsedRes" ,parsedRes);

                if(!parsedRes.idToken){
                    alert("Authentication Failed , Please Try Again");
                }else{
                    dispatch(authStoreToken(
                        parsedRes.idToken,
                        parsedRes.expiresIn,
                        parsedRes.refreshToken
                    ));
                  //  startMainTabs();
                }
            });

    };
};

// export const authSingIn = (authData) => {

//     return dispatch => {
//         dispatch(uiStartLoading());
//         let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
//             API_KEY;
//         axios.post(url, {
//                 email: authData.email,
//                 password: authData.password,
//         })
//             .then(res => {
//                 const response = JSON.parse(res.request._response);
//                 console.log("response" , response);
//                 if(!response.token){
//                     alert(response.message);
//                     dispatch(uiStopLoading());
//                 }else{
//                 dispatch(authStoreToken(response.token, response.expiresIn , response.refreshToken));
//                     //  startMainTabs();
//                     dispatch(uiStopLoading());
//                     Toast.show('You Have Logged In!', Toast.LONG);
//                 }
                
//             })
//             .catch((err) => {
//                 alert(err.response.data.message);
//                 dispatch(uiStopLoading());
//             })

//             .catch((err)=> {
//                     alert("Check Your Internet Connection")
//                 dispatch(uiStopLoading());
//         })




//      }
// };