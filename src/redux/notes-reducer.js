import {CategoryApi, ApiClient, CreateCategoryVm} from "notesApiClient1";

const ADD_CATEGORY = "ADD-CATEGORY";
const DELETE_CATEGORY = "DELETE-CATEGORY";
const UPDATE_CATEGORY_TEMP = "UPDATE-CATEGORY-TEMP";
const ADD_NOTE = "ADD-NOTE";
const DELETE_NOTE = "DELETE-NOTE";
const UPDATE_NOTE_DETAILS = "UPDATE-NOTE-DETAILS";
const UPDATE_NOTE_TEMP = "UPDATE-NOTE-TEMP";

const SET_ACTIVE = "SET-ACTIVE";

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
    details: {name: "qwe", text: "ddsa"},
    tempCategoryName: ""
};

let client = new ApiClient();
client.basePath = "https://localhost:44332";
client.authentications = {
    "oauth2": {
        "type": "oauth2",
        "accessToken": localStorage.getItem("token")
    }
};

export let categoryApi = new CategoryApi(client);

const notesReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_CATEGORY:
            console.log(action.test);
            let temp = {id: ""}
            categoryApi.createCategory("1.0", {body: new CreateCategoryVm()},(error, data, response) => createCategory(error, data, response, temp));
            console.log(temp);
            return state;
        case UPDATE_NOTE_TEMP:
            state.details = action.newText;
        case UPDATE_CATEGORY_TEMP:

            return {
                ...state,
                tempCategoryName: action.newName
            };
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
        default:
            return state;
    }
}

//support functions(callbacks)



const createCategory = (error, data, response, temp) => {
    console.log(response);
    //create category
    temp.id = "qwe";
}




export const updateNoteTempActionCreator = (newText) => ({type: UPDATE_NOTE_TEMP, newText: newText })

export const addCategoryActionCreator = (test) => ({type: ADD_CATEGORY, test: test })
export const updateCategoryActionCreator = (newName) =>
    ({type: UPDATE_CATEGORY_TEMP, newName})
export const setCategoryActiveCreator = (id) => ({type: SET_ACTIVE, id: id})

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