import {createStore, combineReducers, applyMiddleware} from 'redux';
import notesReducer from './notes-reducer'
import matrixReducer from "./matrix-reducer";
import progressReducer from "./progress-reducer";
import thunkMiddleware from "redux-thunk"




let reducers = combineReducers({
    notesPage: notesReducer,
    matrixPage: matrixReducer,
    progressPage: progressReducer
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
