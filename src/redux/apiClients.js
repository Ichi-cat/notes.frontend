import {ApiClient, CategoryApi, NoteApi} from "notesApiClient";


const apiClient = new ApiClient()
apiClient.basePath = "https://localhost:44332";
apiClient.authentications = {
    "oauth2": {
        "type": "oauth2",
        "accessToken": ""
    }
};

export const noteApi = new NoteApi(apiClient);
export const categoryApi = new CategoryApi(apiClient);