import {createStore, combineReducers} from 'redux';
import notesReducer from './notes-reducer'



let reducers = combineReducers({
    notesPage: notesReducer
});


let store = createStore(reducers);

export default store;
