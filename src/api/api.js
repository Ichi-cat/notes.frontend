import {CreateCategoryVm, UpdateCategoryVm} from "notesApiClient";
import {categoryApi, noteApi} from "./apiClients";

const apiVersion = "1.0"



export const categoryAPI = {
    createCategory(name = ""){
        let createCategoryVm = new CreateCategoryVm();
        createCategoryVm.name = name;
        let createCategoryOptions = {
            body: createCategoryVm
        };
        const promise = new Promise((resolve, reject) =>  {
            categoryApi.createCategory(apiVersion, createCategoryOptions, (error, data, _) => {resolve(data)});
        });
        return promise;
    },
    updateCategory(id, newName){
        let updateCategoryVm = new UpdateCategoryVm();
        updateCategoryVm.id = id;
        updateCategoryVm.name = newName;
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
    }
}