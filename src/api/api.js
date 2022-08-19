import {
    CreateCategoryVm,
    CreateNoteTaskVm,
    CreateNoteVm, Operation,
    UpdateCategoryVm,
    UpdateNoteTaskVm,
    UpdateNoteVm
} from "notes";
import {apiClient, categoryApi, noteApi, noteTaskApi} from "./apiClients";
import {createNoteTaskOnServer} from "../redux/matrix-reducer";
import axios from "axios";
import * as querystring from "querystring";
import qs from 'qs'

const apiVersion = "1.0";
const clientId = "C7B53111-019B-4781-AFFF-71B6F6B0D277";
const grantType = "authorization_code";
const redirectAuthUri = "http://localhost:3000/oauth-callback";

const authInstance = axios.create({
    baseURL: 'https://localhost:5001/',
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
});



export const categoryAPI = {
    getCategories(){
        const promise = new Promise((resolve, reject) => {
            categoryApi.getCategories("1.0", (error, data, _) => {resolve(data)});
        });
        return promise;
    },
    createCategory(name = "", color){
        let createCategoryVm = new CreateCategoryVm();
        createCategoryVm.name = name;
        createCategoryVm.color = color;
        let createCategoryOptions = {
            body: createCategoryVm
        };
        const promise = new Promise((resolve, reject) =>  {
            categoryApi.createCategory(apiVersion, createCategoryOptions, (error, data, _) => {resolve(data)});
        });
        return promise;
    },
    updateCategory(id, newName, newColor){
        let updateCategoryVm = new UpdateCategoryVm();
        updateCategoryVm.id = id;
        updateCategoryVm.name = newName;
        updateCategoryVm.color = newColor;
        let updateCategoryOptions = {
            body: updateCategoryVm
        };
        const promise = new Promise((resolve, reject) => {
            categoryApi.updateCategory(apiVersion, updateCategoryOptions, (error, data, _) => {resolve(data)});
        });
        return promise;
    },
    deleteCategory(id){
        const promise = new Promise((resolve, reject) => {
            categoryApi.deleteCategory(id, apiVersion, (error, data, _) => {resolve(data)});
        });
        return promise;
    }
}
export const noteAPI = {
    getNoteById(id) {
        const promise = new Promise((resolve, reject) => {
            noteApi.getNoteById(id, apiVersion, (error, data, _) => {resolve(data)})
        });
        return promise;
    },
    getNotesByCategoryId(id) {
        const promise  = new Promise((resolve, reject) => {
            noteApi.getNotesByCategoryId(id, apiVersion, (error, data, _) => {resolve(data)});
        });
        return promise;
    },
    addNote(name, categoryId, text="") {
        let createNoteVm = new CreateNoteVm();
        createNoteVm.name = name;
        createNoteVm.categoryId = categoryId;
        createNoteVm.text = text;
        let opts = {
            body: createNoteVm
        }
        const promise = new Promise((resolve, reject)  => {
            noteApi.createNote(apiVersion, opts, (error, data, _) => {resolve(data)});
        });
        return promise;
    },
    updateNote(id, name, text) {
        let updateNoteVm = new UpdateNoteVm();
        updateNoteVm.id = id;
        updateNoteVm.name = name;
        updateNoteVm.text = text;
        const promise  = new Promise((resolve, reject) => {
            noteApi.updateNote(apiVersion, {body: updateNoteVm}, (error, data, _) => {resolve(data)});
        });
        return promise;
    },
    updateNotePatch(id, name, value) {
        let updateNotePatchVm = new Operation();
        updateNotePatchVm.op = 'replace';
        updateNotePatchVm.path = name;
        updateNotePatchVm.value = value;
        const promise  = new Promise((resolve, reject) => {
            noteApi.updateNotePatch(id, apiVersion, {body: [updateNotePatchVm]}, (error, data, _) => {resolve(data)});
        });
        return promise;
    },
    deleteNote(id) {
        const promise = new Promise((resolve, reject) => {
            noteApi.deleteNote(id, apiVersion, (error, data, _) => {resolve(data)});
        });
        return promise;
    }
}

export const noteTaskAPI = {
    getNoteTasksByMatrixId(id){
        const promise = new Promise((resolve, reject) => {
            noteTaskApi.getNoteTaskByMatrix(id, apiVersion, (error, data, _) => {resolve(data)});
        });
        return promise;
    },
    getNoteTasksByProgressId(id){
        const promise = new Promise((resolve, reject) => {
            noteTaskApi.getNoteTaskByProgressCondition(id, apiVersion, (error, data, _) => {resolve(data)});
        });
        return promise;
    },
    getNoteTaskDetailsById(id){
        const promise = new Promise((resolve, reject) => {
            noteTaskApi.getNoteTaskById(id, apiVersion, (error, data, _) => {
                resolve(data)
            });
        });
        return promise;
    },
    createNoteTaskWithMatrixId(blockId, name){
        let createNoteTaskVm = new CreateNoteTaskVm();
        createNoteTaskVm.name = name;
        createNoteTaskVm.matrixId = blockId;
        const promise = new Promise((resolve, reject) => {
            noteTaskApi.createNoteTask(apiVersion, {body: createNoteTaskVm}, (error, data, _) => {
                resolve(data)
            });
        });
        return promise;
    },
    createNoteTaskWithProgressId(columnId, name){
        let createNoteTaskVm = new CreateNoteTaskVm();
        createNoteTaskVm.name = name;
        createNoteTaskVm.progressConditionId = columnId;
        const promise = new Promise((resolve, reject) => {
            noteTaskApi.createNoteTask(apiVersion, {body: createNoteTaskVm}, (error, data, _) => {
                resolve(data)
            });
        });
        return promise;
    },
    updateNoteTaskName(task){
        return this.getNoteTaskDetailsById(task.id).then(data => {
            let updateNoteTaskVm = new UpdateNoteTaskVm();
            updateNoteTaskVm.id = data.id;
            updateNoteTaskVm.name = task.tempName;
            updateNoteTaskVm.text = data.text;
            updateNoteTaskVm.seconds = data.seconds;
            updateNoteTaskVm.date = data._date;
            updateNoteTaskVm.matrixId = data.matrixId;
            updateNoteTaskVm.progressConditionId = data.progressConditionId;
            const promise = new Promise((resolve, reject) => {
                noteTaskApi.updateNoteTask(apiVersion, {body: updateNoteTaskVm}, (error, data, _) => {
                    resolve(data);
                });
            });
            return promise;
        });
    },
    updateNoteTaskDate(task, newDate){
        let promise = new Promise((resolve, reject) => {
            noteTaskApi.getNoteTaskById(task.id, apiVersion, (error, data, _) => {
                resolve(data);
            });
        });
        promise = promise.then(data => {
            let updateNoteTaskVm = new UpdateNoteTaskVm();
            updateNoteTaskVm.id = data.id;
            updateNoteTaskVm.name = data.name;
            updateNoteTaskVm.text = data.text;
            updateNoteTaskVm.seconds = data.seconds;
            updateNoteTaskVm.date = newDate;
            updateNoteTaskVm.matrixId = data.matrixId;
            updateNoteTaskVm.progressConditionId = data.progressConditionId;

            return new Promise((resolve, reject) => {
                return noteTaskApi.updateNoteTask(apiVersion, {body: updateNoteTaskVm}, (error, data, _) => {
                    resolve(data);
                });
            });
        });
        return promise;
    },
    updateNoteTaskSeconds(taskId, newSeconds){
        let promise = new Promise((resolve, reject) => {
            noteTaskApi.getNoteTaskById(taskId, apiVersion, (error, data, _) => {
                resolve(data);
            });
        });
        promise = promise.then(data => {
            let updateNoteTaskVm = new UpdateNoteTaskVm();
            updateNoteTaskVm.id = data.id;
            updateNoteTaskVm.name = data.name;
            updateNoteTaskVm.text = data.text;
            updateNoteTaskVm.seconds = newSeconds;
            updateNoteTaskVm.date = data._date;
            updateNoteTaskVm.matrixId = data.matrixId;
            updateNoteTaskVm.progressConditionId = data.progressConditionId;

            return new Promise((resolve, reject) => {
                return noteTaskApi.updateNoteTask(apiVersion, {body: updateNoteTaskVm}, (error, data, _) => {
                    resolve(data);
                });
            });
        });
        return promise;
    },
    updateNoteTask(task){
            let updateNoteTaskVm = new UpdateNoteTaskVm();
            updateNoteTaskVm.id = task.id;
            updateNoteTaskVm.name = task.name;
            updateNoteTaskVm.text = task.text;
            updateNoteTaskVm.seconds = task.seconds;
            updateNoteTaskVm.date = task._date;
            updateNoteTaskVm.matrixId = task.matrixId;
            updateNoteTaskVm.progressConditionId = task.progressConditionId;
            const promise = new Promise((resolve, reject) => {
                noteTaskApi.updateNoteTask(apiVersion, {body: updateNoteTaskVm}, (error, data, _) => {
                    resolve(data);
                });
            });
            return promise;
    },
    updateNoteTaskPatch(id, name, value){
        let updateNoteTaskPatchVm = new Operation();
        updateNoteTaskPatchVm.op = 'replace';
        updateNoteTaskPatchVm.path = name;
        updateNoteTaskPatchVm.value = value;
        const promise = new Promise((resolve, reject) => {
            noteTaskApi.updateNoteTaskPatch(id, apiVersion, {body: [updateNoteTaskPatchVm]}, (error, data, _) => {
                resolve(data);
            });
        });
        return promise;
    },
    deleteNoteTaskById(id){
        const promise = new Promise((resolve, reject) => {
            noteTaskApi.deleteNoteTask(id, apiVersion, (error, data, _) => {resolve(data)});
        });
        return promise;
    }
};

export const authAPI = {
    getToken(code){
        let details = {
            'client_id': clientId,
            'code': code,
            'grant_type': grantType,
            'redirect_uri': redirectAuthUri
        };
        let formData = new FormData();
        formData.append('client_id', clientId);
        formData.append('code', code);
        formData.append('grant_type', grantType);
        formData.append('redirect_uri', redirectAuthUri);
        let formBody = qs.stringify(details);
        return authInstance.post(`connect/token`, formBody, {headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }})
            .then(res => res.data)
            },
        onFailure: response => console.error(response)
};

const toQuery = (details) => {
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
}