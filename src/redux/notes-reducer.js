import {categoryApi} from "../api/apiClients";
import {CreateCategoryVm} from "notesApiClient";
import {categoryAPI, noteAPI} from "../api/api";


//common functions
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";


//notes functions
const SET_NOTE_DETAILS = "SET_NOTE_DETAILS";
const ACTIVE_NEW_NOTE_INPUT = "ACTIVE_NEW_NOTE_INPUT";
const UPDATE_NEW_NOTE_TEMP_NAME = "UPDATE_NEW_NOTE_TEMP_NAME";
const ADD_NOTE = "ADD_NOTE";
const TOGGLE_IS_NOTE_CHANGING = "TOGGLE_IS_NOTE_CHANGING";
const UPDATE_NOTE_TEMP_NAME_BY_ID = "UPDATE_NOTE_TEMP_NAME_BY_ID";
const UPDATE_NOTE_NAME = "UPDATE_NOTE_NAME";
const DELETE_NOTE = "DELETE_NOTE";
const SET_CATEGORY_NOTES = "SET_CATEGORY_NOTES";

//category functions
const SET_CATEGORIES = "SET_CATEGORIES";
const ADD_CATEGORY = "ADD_CATEGORY";
const TOGGLE_CATEGORY_FETCHING = "TOGGLE_CATEGORY_FETCHING";
const UPDATE_CATEGORY_NAME = "UPDATE_CATEGORY_NAME";
const UPDATE_NEW_CATEGORY_TEMP_NAME = "UPDATE_NEW_CATEGORY_TEMP_NAME";
const TOGGLE_IS_CATEGORY_CHANGING = "TOGGLE_IS_CATEGORY_CHANGING";
const UPDATE_CATEGORY_TEMP_NAME_BY_ID = "UPDATE_CATEGORY_TEMP_NAME_BY_ID";
const DELETE_CATEGORY = "DELETE_CATEGORY";
const SET_CATEGORY_ACTIVE = "SET_CATEGORY_ACTIVE";

//details functions
const UPDATE_NOTE_TEMP = "UPDATE-NOTE-TEMP";
const TOGGLE_IS_DETAILS_DISABLED = "TOGGLE_IS_DETAILS_DISABLED";
const SET_DEFAULT_DETAILS = "SET_DEFAULT_DETAILS";


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
    onDownloadCategoryIds: [],
    activeCategories: ["a25c484c-3420-4ec0-be86-71ad7b8d7d0f"],
    details: {id: "", text: "", currentCategory: "", isDisabled: true},//details of chosen note
    isFetching: false,
    tempCategoryName: ""
};

const notesReducer = (state = initialState, action) => {
    window.state = state;
    switch (action.type){
        //toggle preloader
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        //set categories
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case ADD_CATEGORY:
            return {
                ...state,
                categories: state.categories.concat([action.category])
            }
        case UPDATE_NOTE_TEMP:
            //synchronize noteDetails value
            state.details.text = action.newText;
            return {
                ...state,
                details: {...state.details, text: action.newText}
            };
        case SET_DEFAULT_DETAILS:
            return {
                ...state,
                details: {id: "", name: "", text: "", currentCategory: "", isDisabled: true}
            }
        case SET_NOTE_DETAILS:
            return {
                ...state,
                details: {...state.details, id: action.id, currentCategory: action.currentCategory, name: action.name, text: action.text}
            };
        //makes category unboxing
        case SET_CATEGORY_ACTIVE:
            let updatedCategories = state.categories.map(c => {
                if(c.id === action.id)
                    c.isActive = !c.isActive;
                return c;
            });
            return {
                ...state,
                categories: updatedCategories
            }
        //when category notes are downloading
        case TOGGLE_CATEGORY_FETCHING:
            return {
                ...state,
                onDownloadCategoryIds: action.isFetching ?
                    [...state.onDownloadCategoryIds, action.id]
                    : state.onDownloadCategoryIds.filter(id => id !== action.id)
            }
        case UPDATE_NEW_CATEGORY_TEMP_NAME:
            return {
                ...state,
                tempCategoryName: action.newText
            }
        case TOGGLE_IS_CATEGORY_CHANGING:
            let newCategories = state.categories.map(category => {
                if(category.id === action.id) category.isChanging = action.isChanging;
                return category;
            });
            return {
                ...state,
                categories: newCategories
            }
        case UPDATE_CATEGORY_TEMP_NAME_BY_ID:
            let updatedCategoriesTempName = state.categories.map(category => {
                if(category.id === action.id) category.tempName = action.newName;
                return category;
            });
            return {
                ...state,
                categories: updatedCategoriesTempName
            }
        //local  updating category's name
        case UPDATE_CATEGORY_NAME:
            let updatedCategory = state.categories.map(category => {
                if(category.id === action.id) category.name = category.tempName;
                return category;
            });
            return {
                ...state,
                categories: updatedCategory
            }
        case ACTIVE_NEW_NOTE_INPUT:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.id) category.noteInputIsActive = true;
                    return category;
                })
            }
        case UPDATE_NEW_NOTE_TEMP_NAME:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.id) category.noteTempName = action.newName;
                    return category;
                })
            }
        //add new note locally
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
            return {
                ...state,
                categories: newCat
            }
        //activate edit note input
        case TOGGLE_IS_NOTE_CHANGING:
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
        case UPDATE_NOTE_TEMP_NAME_BY_ID:
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
        case UPDATE_NOTE_NAME:
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
        case TOGGLE_IS_DETAILS_DISABLED:
            return {
                ...state,
                details: {...state.details, isDisabled: action.isDisabled}
            }
        //set notes to the category
        case SET_CATEGORY_NOTES:
            return {
                ...state,
                categories: state.categories.map(category => {
                    if(category.id === action.id) category.notes = action.notes.map(note => ({...note, tempName: note.name}));
                    return category;
                })
            }
        default:
            return state;
    }
}



//get category and her notes from the server
export const setCategories = (categories) => ({type: SET_CATEGORIES, categories: categories })
//creates action to synchronize noteDetails text
export const updateNoteTempActionCreator = (newText) => ({type: UPDATE_NOTE_TEMP, newText: newText })
//toggle is fetching(true or false, for preloader)
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })
//set category with pointed id is active(unboxing)
export const setCategoryActive = (id) => ({type: SET_CATEGORY_ACTIVE, id: id})
export const toggleIsCategoryFetching = (isFetching, id) => ({type: TOGGLE_CATEGORY_FETCHING, isFetching, id})

export const setNoteDetails = (id, currentCategory, name, text) => ({type: SET_NOTE_DETAILS, id, currentCategory, name, text})

export const updateCategoryTempName = (newText) => ({type: UPDATE_NEW_CATEGORY_TEMP_NAME, newText: newText});
export const toggleIsChanging = (id, isChanging) => ({type: TOGGLE_IS_CATEGORY_CHANGING, id: id, isChanging: isChanging});
export const updateCategoryTempNameById = (id, newName) => ({type: UPDATE_CATEGORY_TEMP_NAME_BY_ID, id: id, newName: newName});
export const updateCategoryName = (id) => ({type: UPDATE_CATEGORY_NAME, id: id});
export const activeNoteInput = (id) => ({type: ACTIVE_NEW_NOTE_INPUT, id: id});
export const updateNoteTempName = (id, newName) => ({type: UPDATE_NEW_NOTE_TEMP_NAME, id: id, newName: newName});
export const addNote = (id, noteId) => ({type: ADD_NOTE, id: id, noteId: noteId});


export const toggleNoteIsChanging = (id, categoryId, isChanging) => ({type: TOGGLE_IS_NOTE_CHANGING, id: id, categoryId: categoryId, isChanging: isChanging});
export const updateTempNoteName = (id, categoryId, newName) => ({type: UPDATE_NOTE_TEMP_NAME_BY_ID, id: id, categoryId: categoryId, newName: newName});
export const editNoteName = (id, categoryId) => ({type: UPDATE_NOTE_NAME, id: id, categoryId: categoryId});
export const deleteNote = (id, categoryId) => ({type: DELETE_NOTE, id: id, categoryId: categoryId});
export const deleteCategory = (id) => ({type: DELETE_CATEGORY, id: id});
export const toggleDetailsIsDisabled = (isDisabled) => ({type: TOGGLE_IS_DETAILS_DISABLED, isDisabled});
export const setCategoryNotes = (id, notes) => ({type: SET_CATEGORY_NOTES, id, notes});
export const setDefaultDetailsActionCreator = () => ({type: SET_DEFAULT_DETAILS});

//category
export const addCategoryActionCreator = (category) => ({type: ADD_CATEGORY, category});


//thunks
export const createCategory = (name) => {
    return (dispatch) => {
        dispatch(updateCategoryTempName(""));
        categoryAPI.createCategory(name).then(data => {
            dispatch(addCategoryActionCreator({
                id: data,
                name: name ? name : "No name",
                isActive: false,
                notes: []
            }));
        });
    }
}
export const updateCategory = (id, newName)  => {
    return (dispatch) => {
        categoryAPI.updateCategory(id, newName).then(data => {
            dispatch(updateCategoryName(id));
            dispatch(toggleIsChanging(id, false));
        });
    }
}
export const deleteCategoryById = (id) => {
    return (dispatch) => {
        categoryAPI.deleteCategory(id).then(data => {
            dispatch(deleteCategory(id));
        });
    }
}
export const openNote = (id, currentCategory) => {
    return (dispatch) => {
        dispatch(toggleDetailsIsDisabled(false));
        noteAPI.getNoteById(id).then(data => {
            dispatch(setNoteDetails(id, currentCategory, data.name, data.text));
        });
    }
}
export const fetchNotes = (categoryId) => {
    return (dispatch) => {
        dispatch(toggleIsCategoryFetching(true, categoryId));
        noteAPI.getNotesByCategoryId(categoryId).then(data => {
            dispatch(setCategoryNotes(categoryId, data.notes));
            dispatch(toggleIsCategoryFetching(false, categoryId));
            dispatch(setCategoryActive(categoryId));
        });
    }
}


export default notesReducer;