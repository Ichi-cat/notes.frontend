import {createStore, combineReducers} from 'redux';
import notesReducer from './notes-reducer'
import matrixReducer from "./matrix-reducer";




let reducers = combineReducers({
    notesPage: notesReducer,
    matrixPage: matrixReducer
});


let store = createStore(reducers);

export default store;
