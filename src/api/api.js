import {CreateCategoryVm, CreateNoteVm, UpdateCategoryVm, UpdateNoteVm} from "notesApiClient";
import {categoryApi, noteApi} from "./apiClients";

const apiVersion = "1.0"



export const categoryAPI = {
    getCategories(){
        const promise = new Promise((resolve, reject) => {
            categoryApi.getCategories("1.0", (error, data, _) => {resolve(data)});
        });
        return promise;
    },
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
        let updateNoteOptions = {
            body: updateNoteVm
        };
        const promise  = new Promise((resolve, reject) => {
            noteApi.updateNote(apiVersion, updateNoteOptions, (error, data, _) => {resolve(data)});
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