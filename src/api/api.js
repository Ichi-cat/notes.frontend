import {
    CreateCategoryVm,
    CreateNoteTaskVm,
    CreateNoteVm,
    UpdateCategoryVm,
    UpdateNoteTaskVm,
    UpdateNoteVm
} from "notes";
import {categoryApi, noteApi, noteTaskApi} from "./apiClients";
import {createNoteTaskOnServer} from "../redux/matrix-reducer";

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
    deleteNoteTaskById(id){
        const promise = new Promise((resolve, reject) => {
            noteTaskApi.deleteNoteTask(id, apiVersion, (error, data, _) => {resolve(data)});
        });
        return promise;
    }
};