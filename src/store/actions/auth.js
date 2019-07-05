import { AUTH_SET_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";


const API_KEY = "AIzaSyCJarib7IcgK-elIZ0RWkLX2LZAYisnW48";

export const authSingIn = authData => {
  return dispatch => {
    dispatch(uiStartLoading());
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      API_KEY;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: "test@test.com",
        password: "123456",
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())

      .then(parsedRes => {
        dispatch(authSetToken(parsedRes));

        if (!parsedRes.idToken) {
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

export const authSetToken = parsedRes => {
  return {
    type: AUTH_SET_TOKEN,
    parsedRes: parsedRes
  };
};
