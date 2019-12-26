export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

//Sign Up into app
export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7QqjyTRykPbuVn-q66w83P-wwD5VT_7Q',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!';
            }
            throw new Error(message);
        };

        const resData = await response.json();
        console.log(resData);
        dispatch({
            type: SIGNUP,
            token: resData.idToken,
            userId: resData.localId
        });
    };
};

//Log in to app
export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7QqjyTRykPbuVn-q66w83P-wwD5VT_7Q',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            console.log(errorResData);
            /* This Example error ****
                Object {
                "error": Object {
                    "code": 400,
                    "errors": Array [
                    Object {
                        "domain": "global",
                        "message": "EMAIL_NOT_FOUND",
                        "reason": "invalid",
                    },
                    ],
                    "message": "EMAIL_NOT_FOUND",
                },
                }**/
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            };
            throw new Error(message);
        };

        const resData = await response.json();
        console.log(resData);
        dispatch({
            type: LOGIN,
            token: resData.idToken,
            userId: resData.localId
        });
    };
};