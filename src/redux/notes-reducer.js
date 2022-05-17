import {CategoryApi, ApiClient} from "notesApiClient1";

const ADD_CATEGORY = "ADD-CATEGORY";
const DELETE_CATEGORY = "DELETE-CATEGORY";
const UPDATE_CATEGORY = "UPDATE-CATEGORY";
const ADD_NOTE = "ADD-NOTE";
const DELETE_NOTE = "DELETE-NOTE";
const UPDATE_NOTE_DETAILS = "UPDATE-NOTE-DETAILS";

let client = new ApiClient();
client.basePath = "https://localhost:44332";
client.authentications = {
    "oauth2": {
        "type": "oauth2",
        "accessToken": localStorage.getItem("token")
    }
};

let categoryApi = new CategoryApi(client);

const notesReducer = (state, action) => {
    switch (action.type){
        case ADD_CATEGORY:
            categoryApi.createCategory("1.0", (error, data, response) => createCategory(error, data, response, ));
            return state;
        case UPDATE_CATEGORY:
            return state;
    }
}

//support functions(callbacks)

const createCategory = (error, data, response) => {
    console.log(response)
}