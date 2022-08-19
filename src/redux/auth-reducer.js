import {authAPI, noteTaskAPI} from "../api/api";
import {apiClient} from "../api/apiClients";

const SET_IS_AUTH = "SET_IS_AUTH";


const initialState = {
    isAuth: false
};





const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: true
            };
        default:
            return state;
    }
};


export const setIsAuth = () => ({type: SET_IS_AUTH});


//thunks
export const successAuthorization = (code) =>
    (dispatch) => {
    authAPI.getToken(code.code).then(data => {
        sessionStorage.setItem('access_token', data['access_token']);
        apiClient.authentications = {
            "oauth2": {
                "type": "oauth2",
                "accessToken": sessionStorage.getItem("access_token") || null
            }
        };
    });
    };

export const getNoteTasksByProgressId = (id) => {
    return (dispatch) => {
        // dispatch(toggleIsColumnFetching(id, true));
        // noteTaskAPI.getNoteTasksByProgressId(id).then(data => {
        //     dispatch(setNoteTasks(id, data.tasks));
        //     dispatch(toggleIsColumnFetching(id), false);
        // });
    };
};


export default authReducer;