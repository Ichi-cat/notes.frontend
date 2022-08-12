import {ApiClient, CategoryApi, NoteApi, NoteTaskApi} from "notes";


const apiClient = new ApiClient()
apiClient.basePath = "https://192.168.0.105:5001";
apiClient.authentications = {
    "oauth2": {
        "type": "oauth2",
        "accessToken": ""
    }
};

export const noteApi = new NoteApi(apiClient);
export const categoryApi = new CategoryApi(apiClient);
export const noteTaskApi = new NoteTaskApi(apiClient);