import {categoryApi, noteApi} from "./apiClients";
import {CreateCategoryVm, UpdateNoteVm} from "notesApiClient";

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const UPDATE_NOTE_TEMP = "UPDATE-NOTE-TEMP";
const OPEN_NOTE = "OPEN_NOTE";
const PUSH_NOTE_DETAILS = "PUSH_NOTE_DETAILS";

//Category
const SET_CATEGORIES = "SET_CATEGORIES";
const SET_ACTIVE = "SET-ACTIVE";
const CREATE_CATEGORY = "CREATE_CATEGORY";
const UPDATE_CATEGORY = "UPDATE_CATEGORY";

const UPDATE_CATEGORY_TEMP = "UPDATE_CATEGORY_TEMP";
const TOGGLE_IS_CHANGING = "TOGGLE_IS_CHANGING";
const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";
const ACTIVE_NOTE_INPUT = "ACTIVE_NOTE_INPUT";
const UPDATE_NOTE_TEMP_NAME = "UPDATE_NOTE_TEMP_NAME";

const ADD_NOTE = "ADD_NOTE";
const TOGGLE_NOTE_IS_CHANGING = "TOGGLE_NOTE_IS_CHANGING";

const UPDATE_TEMP_NOTE_NAME = "UPDATE_TEMP_NOTE_NAME";
const EDIT_NOTE_NAME = "EDIT_NOTE_NAME";
const DELETE_NOTE = "DELETE_NOTE";
const DELETE_CATEGORY = "DELETE_CATEGORY";
const TOGGLE_DETAILS_IS_DISABLED = "TOGGLE_DETAILS_IS_DISABLED";

let initialState = {
    categories: [
        {id: 1, name: "nm", isActive: false, isChanging: false, notes: [
                {id: 1, name: "title"},
                {id: 2, name: "title2"}
            ]
        },
        {id: 2, name: "nm2", isActive: false, isChanging: false, notes: [
                {id: 3, name: "title"},
                {id: 4, name: "title2"}
            ]
        },
    ],
    details: {id: "", name: "", text: "", currentCategory: "", isDisabled: true},//details of choise note
    isFetching: false,
    tempCategoryName: ""
};

const notesReducer = (state = initialState, action) => {
    debugger;
    switch (action.type){
        //toggle preloader
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        //set categories and notes from server
        case SET_CATEGORIES:
            debugger;
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
            debugger;
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.noteDetails.currentCategory){
                        category.notes.map(note => {
                            if(note.id === action.noteDetails.id) note.text = action.noteDetails.text;
                            return note;
                        });
                    }
                    return category;
                })
            };
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
        case CREATE_CATEGORY:
            let createCategoryVm = new CreateCategoryVm();
            createCategoryVm.name = state.tempCategoryName;
            let createCategoryOptions = {
                body: createCategoryVm
            };
            categoryApi.createCategory("1.0", createCategoryOptions, (error, data, response) => console.log(response));
            return {
                ...state,
                categories: state.categories.concat([
                    {

                    }
                ])
            };
        case TOGGLE_IS_CHANGING:
            let newCategories = state.categories.map(category => {
                if(category.id === action.id) category.isChanging = action.isChanging;
                return category;
            });
            return {
                ...state,
                categories: newCategories
            }
        case UPDATE_CURRENT_CATEGORY:
            let updatedCategoriesTempName = state.categories.map(category => {
                if(category.id === action.id) category.tempName = action.newName;
                return category;
            });
            return {
                ...state,
                categories: updatedCategoriesTempName
            }
        case UPDATE_CATEGORY:
            let updatedCategory = state.categories.map(category => {
                if(category.id === action.id) category.name = category.tempName;
                return category;
            });
            return {
                ...state,
                categories: updatedCategory
            }
        case ACTIVE_NOTE_INPUT:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.id) category.noteInputIsActive = true;
                    return category;
                })
            }
        case UPDATE_NOTE_TEMP_NAME:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.id) category.noteTempName = action.newName;
                    return category;
                })
            }
        case ADD_NOTE:
            let newCat = state.categories.map(category => {
                if(category.id === action.id) {
                    category.notes.push(
                        {
                            id: action.noteId,
                            name: category.noteTempName,
                            text: ""
                        }
                    );
                    category.noteTempName = "";
                    category.noteInputIsActive = false;
                }
                return category;
            });
            debugger;
            return {
                ...state,
                categories: newCat
            }
        case TOGGLE_NOTE_IS_CHANGING:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.categoryId){
                        category.notes.map(note => {
                            if(note.id === action.id) note.isChanging = action.isChanging;
                            return note;
                        });
                    }
                    return category;
                })
            }
        case UPDATE_TEMP_NOTE_NAME:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.categoryId){
                        category.notes.map(note => {
                            if(note.id === action.id) note.tempName = action.newName;
                            return note;
                        });
                    }
                    return category;
                })
            }
        case EDIT_NOTE_NAME:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.categoryId){
                        category.notes.map(note => {
                            if(note.id === action.id) note.name = note.tempName;
                            return note;
                        });
                    }
                    return category;
                })
            }
        case DELETE_NOTE:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.categoryId){
                        category.notes = category.notes.filter(note => {
                            return !(note.id === action.id);
                        });
                    }
                    return category;
                })
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => {
                    return !(category.id === action.id)
                    })
                }
        case TOGGLE_DETAILS_IS_DISABLED:
            return {
                ...state,
                details: {...state.details, isDisabled: action.isDisables}
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

export const openNoteActiveCreator = (id, name, text, currentCategory) => ({type: OPEN_NOTE, details: {id: id, name: name, text: text, currentCategory: currentCategory}})
export const pushNoteDetailsActiveCreator = (noteDetails) => ({type: PUSH_NOTE_DETAILS, noteDetails: noteDetails})

export const updateCategoryTempActiveCreator = (newText) => ({type: UPDATE_CATEGORY_TEMP, newText: newText});
export const toggleIsChangingActiveCreator = (id, isChanging) => ({type: TOGGLE_IS_CHANGING, id: id, isChanging: isChanging});
export const updateCurrentCategoryActiveCreator = (id, newName) => ({type: UPDATE_CURRENT_CATEGORY, id: id, newName: newName});
export const updateCategoryNameActiveCreator = (id) => ({type: UPDATE_CATEGORY, id: id});
export const activeNoteInputActiveCreator = (id) => ({type: ACTIVE_NOTE_INPUT, id: id});
export const updateNoteTempNameActiveCreator = (id, newName) => ({type: UPDATE_NOTE_TEMP_NAME, id: id, newName: newName});
export const addNoteActiveCreator = (id, noteId) => ({type: ADD_NOTE, id: id, noteId: noteId});


export const toggleNoteIsChangingActiveCreator = (id, categoryId, isChanging) => ({type: TOGGLE_NOTE_IS_CHANGING, id: id, categoryId: categoryId, isChanging: isChanging});
export const updateTempNoteNameActiveCreator = (id, categoryId, newName) => ({type: UPDATE_TEMP_NOTE_NAME, id: id, categoryId: categoryId, newName: newName});
export const editNoteNameActionCreator = (id, categoryId) => ({type: EDIT_NOTE_NAME, id: id, categoryId: categoryId});
export const deleteNoteActionCreator = (id, categoryId) => ({type: DELETE_NOTE, id: id, categoryId: categoryId});
export const deleteCategoryActionCreator = (id) => ({type: DELETE_CATEGORY, id: id});
export const toggleDetailsIsDisabledActionCreator = (isDisabled) => ({type: TOGGLE_DETAILS_IS_DISABLED, isDisables: isDisabled});




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