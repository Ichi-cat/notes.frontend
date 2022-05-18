import {noteApi} from "./apiClients";
import {UpdateNoteVm} from "notesApiClient";

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const UPDATE_NOTE_TEMP = "UPDATE-NOTE-TEMP";
const OPEN_NOTE = "OPEN_NOTE";
const PUSH_NOTE_DETAILS = "PUSH_NOTE_DETAILS";

//Category
const SET_CATEGORIES = "SET_CATEGORIES";
const SET_ACTIVE = "SET-ACTIVE";

const UPDATE_CATEGORY_TEMP = "UPDATE_CATEGORY_TEMP";

let initialState = {
    categories: [
        {id: 1, name: "nm", isActive: false, notes: [
                {id: 1, name: "title"},
                {id: 2, name: "title2"}
            ]
        },
        {id: 2, name: "nm2", isActive: false, notes: [
                {id: 3, name: "title"},
                {id: 4, name: "title2"}
            ]
        },
    ],
    details: {id: null, name: "", text: ""},//details of choise note
    isFetching: false,
    tempCategoryName: ""
};

const notesReducer = (state = initialState, action) => {
    switch (action.type){
        //toggle preloader
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        //set categories and notes from server
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case UPDATE_NOTE_TEMP:
            //synchronize noteDetails value
            state.details.text = action.newText;
            return {
                ...state,
                details: {...state.details, text: action.newText}
            };
        case OPEN_NOTE:
            return {
                ...state,
                details: action.details
            };
        case PUSH_NOTE_DETAILS:
            let updateNoteVm = new UpdateNoteVm();
            updateNoteVm.id = action.id;
            updateNoteVm.name = state.details.name;
            updateNoteVm.text = state.details.text;
            let options = {
                body: updateNoteVm
            };
            noteApi.updateNote("1.0", options, (error, data, response) => console.log("qqq"));
            return state;
        //makes category unboxing
        case SET_ACTIVE:
            let updatedCategories = state.categories.map(c => {
                if(c.id === action.id)
                    c.isActive = !c.isActive;
                return c;
            });
            return {
                ...state,
                categories: updatedCategories
            }
        case UPDATE_CATEGORY_TEMP:

            return {
                ...state,
                tempCategoryName: action.newText
            }
        default:
            return state;
    }
}



//get category and her notes from the server
export const setCategoriesActionCreator = (categories) => ({type: SET_CATEGORIES, categories: categories })
//creates action to synchronize noteDetails text
export const updateNoteTempActionCreator = (newText) => ({type: UPDATE_NOTE_TEMP, newText: newText })
//toggle is fetching(true or false, for preloader)
export const toggleIsFetchingActionCreator = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })
//set category with pointed id is active(unboxing)
export const setCategoryActiveCreator = (id) => ({type: SET_ACTIVE, id: id})

export const openNoteActiveCreator = (id, name, text) => ({type: OPEN_NOTE, details: {id: id, name: name, text: text}})
export const pushNoteDetailsActiveCreator = (id) => ({type: PUSH_NOTE_DETAILS, id: id})

export const updateCategoryTempActiveCreator = (newText) => ({type: UPDATE_CATEGORY_TEMP, newText: newText});


export default notesReducer;

///templates
//
// var Notes = require('notes');
// var defaultClient = Notes.ApiClient.instance;
//
//
// var api = new Notes.CategoryApi()
// var apiVersion = "apiVersion_example"; // {String}
// var opts = {
//     'body': new Notes.CreateCategoryVm() // {CreateCategoryVm}
// };
// var callback = function(error, data, response) {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log('API called successfully. Returned data: ' + data);
//     }
// };
// api.createCategory(apiVersion, opts, callback);