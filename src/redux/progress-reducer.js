import {noteTaskAPI} from "../api/api";

const SET_NOTE_TASKS = "SET_NOTE_TASKS";
const ADD_NOTE_TASK = "ADD_NOTE_TASK";
const DELETE_NOTE_TASK = "DELETE_NOTE_TASK";
const TOGGLE_IS_CONTEXT_MENU_OPENED = "TOGGLE_IS_CONTEXT_MENU_OPENED";
const TOGGLE_IS_TASK_CHANGING = "TOGGLE_IS_TASK_CHANGING";
const EDIT_TASK_TEMP_NAME = "EDIT_TASK_TEMP_NAME";
const EDIT_TASK_NAME = "EDIT_TASK_NAME";
const EDIT_TASK_SECONDS = "EDIT_TASK_SECONDS";
const EDIT_NEW_TASK_TEMP_NAME = "EDIT_NEW_TASK_TEMP_NAME";
const CHANGE_TASK_DATE = "CHANGE_TASK_DATE";
const TOGGLE_IS_COLUMN_FETCHING = "TOGGLE_IS_COLUMN_FETCHING";
// const CLOSE_ALL_IS_CONTEXT_MENU_OPENED = "CLOSE_ALL_IS_CONTEXT_MENU_OPENED";


const initialState = {
    columns: [
        {
            id: 1,
            name: "Planned",
            tasks: [],
            color: "pink",
            scroll_color: "scroll_pink",
            topic_color: "durk_pink",
            tempNewTaskName: '',

            isFetching: true
        },
        {
            id: 2,
            name: "In Progress",
            tasks: [],
            color: "yellow",
            scroll_color: "scroll_yellow",
            topic_color: "durk_yellow",
            tempNewTaskName: '',
            isFetching: true
        },
        {
            id: 3,
            name: "Done",
            tasks: [],
            color: "green",
            scroll_color: "scroll_green",
            topic_color: "durk_green",
            tempNewTaskName: '',
            isFetching: true
        }
    ]
};





const progressReducer = (state=initialState, action) => {
    window.state = state;
    switch (action.type) {
        case SET_NOTE_TASKS:
            return {
                ...state,
                columns: state.columns.map((column) => {
                    if(column.id === action.id) column.tasks = action.tasks.map(task =>
                        ({...task, tempName: task.name, isEditing: false, isContextMenuOpened: false}));
                    return column;
                })
            };
        case ADD_NOTE_TASK:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id === action.columnId) column.tasks = [...column.tasks,
                        {...action.task, tempName: action.task.name, isEditing: false, isContextMenuOpened: false}]
                    return  column;
                })
            };
        case DELETE_NOTE_TASK:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id === action.columnId) column.tasks =
                        column.tasks.filter(task => task.id !== action.taskId);
                    return  column;
                })
            };
        case TOGGLE_IS_CONTEXT_MENU_OPENED:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id === action.columnId) column.tasks =
                        column.tasks.map(task => {
                            if(task.id === action.taskId) task.isContextMenuOpened = action.isOpened;
                            return task;
                        });
                    return  column;
                })
            };
        case TOGGLE_IS_TASK_CHANGING:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id === action.columnId) column.tasks.map(task => {
                        if(task.id === action.taskId) task.isEditing = action.isEditing;
                        return task;
                    });
                    return column;
                })
            };
        case EDIT_TASK_TEMP_NAME:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id === action.columnId) column.tasks.map(task => {
                        if(task.id === action.taskId) task.tempName = action.newTempName;
                        return task;
                    });
                    return column;
                })
            };
        case EDIT_TASK_NAME:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id === action.columnId) column.tasks.map(task => {
                        if(task.id === action.taskId) task.name = action.newName;
                        return task;
                    });
                    return column;
                })
            };
        case EDIT_TASK_SECONDS:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id === action.columnId) column.tasks.map(task => {
                        if(task.id === action.taskId) task.seconds = action.newSeconds;
                        return task;
                    });
                    return column;
                })
            };
        case EDIT_NEW_TASK_TEMP_NAME:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id === action.columnId) column.tempNewTaskName = action.newTempName;
                    return column;
                })
            };
        case CHANGE_TASK_DATE:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id === action.columnId) column.tasks.map(task => {
                        if(task.id === action.taskId) task._date = action.newDate;
                        return task;
                    });
                    return column;
                })
            };
        case TOGGLE_IS_COLUMN_FETCHING:
            return {
                ...state,
                columns: state.columns.map(column => {
                    if(column.id === action.columnId) column.isFetching = action.isFetching;
                    return column;
                })
            };
        // case CLOSE_ALL_IS_CONTEXT_MENU_OPENED:
        //     return {
        //         ...state,
        //         columns: state.columns.map(column => {
        //             if(column.id === action.columnId) column.tasks =
        //                 column.tasks.map(task => {
        //                     task.isContextMenuOpened = false;
        //                     return task;
        //                 });
        //             return  column;
        //         })
        //     };
        default:
            return state;
    }
};


export const setNoteTasks = (id, tasks) => ({type: SET_NOTE_TASKS, id, tasks});
export const addNoteTask = (columnId, task) => ({type: ADD_NOTE_TASK, columnId, task});
export const deleteNoteTask = (columnId, taskId) => ({type: DELETE_NOTE_TASK, columnId, taskId});
export const toggleIsContextMenuOpened = (columnId, taskId, isOpened) => ({type: TOGGLE_IS_CONTEXT_MENU_OPENED, columnId, taskId, isOpened});
// export const closeAllIsContextMenuOpened = (columnId) => ({type: CLOSE_ALL_IS_CONTEXT_MENU_OPENED, columnId});
export const toggleIsTaskEditing = (columnId, taskId, isEditing) => ({type: TOGGLE_IS_TASK_CHANGING, columnId, taskId, isEditing});
export const editTaskTempName = (columnId, taskId, newTempName) => ({type: EDIT_TASK_TEMP_NAME, columnId, taskId, newTempName});
export const editTaskName = (columnId, taskId, newName) => ({type: EDIT_TASK_NAME, columnId, taskId, newName});
export const editTaskSeconds = (columnId, taskId, newSeconds) => ({type: EDIT_TASK_SECONDS, columnId, taskId, newSeconds});
export const editNewTaskTempName = (columnId, newTempName) => ({type: EDIT_NEW_TASK_TEMP_NAME, columnId, newTempName});
export const changeNoteTaskDate = (columnId, taskId, newDate) => ({type: CHANGE_TASK_DATE, columnId, taskId, newDate});
export const toggleIsColumnFetching = (columnId, isFetching) => ({type: TOGGLE_IS_COLUMN_FETCHING, columnId, isFetching});


//thunks
export const getNoteTasksByProgressId = (id) => {
    return (dispatch) => {
        dispatch(toggleIsColumnFetching(id, true));
        noteTaskAPI.getNoteTasksByProgressId(id).then(data => {
            dispatch(setNoteTasks(id, data.tasks));
            dispatch(toggleIsColumnFetching(id), false);
        });
    };
};

export const changeProgressColumn = (task,  fromColumnId, toColumnId) => {
    return (dispatch) => {
        task.progressConditionId = toColumnId;
        dispatch(deleteNoteTask(fromColumnId, task.id));
        dispatch(addNoteTask(toColumnId, task));
        noteTaskAPI.updateNoteTask(task).then(data => {});
    };
}

export const createNoteTaskOnServer = (columnId, name) => {
    return (dispatch) => {
        noteTaskAPI.createNoteTaskWithProgressId(columnId, name).then(data => {
            dispatch(addNoteTask(columnId, {id: data, name: name, _date: null}));
            dispatch(editNewTaskTempName(columnId, ''));
        });
    }
};

export const updateTaskNameOnServer = (columnId, task) => {
    return (dispatch) => {
        noteTaskAPI.updateNoteTaskName(task).then(data => {
            dispatch(editTaskName(columnId, task.id, task.tempName));
            dispatch(toggleIsTaskEditing(columnId, task.id, false));
        });
    };
}

export const deleteNoteTaskOnServer = (columnId, taskId) => {
    return (dispatch) => {
        noteTaskAPI.deleteNoteTaskById(taskId).then(data => {
            dispatch(deleteNoteTask(columnId, taskId));
        });
    }
};

export const changeNoteTaskDateOnServer = (columnId, task, newDate) => {
    return (dispatch) => {
        dispatch(changeNoteTaskDate(columnId, task.id, newDate));
        noteTaskAPI.updateNoteTaskPatch(task.id, 'date', newDate).then(data => {});
    };
};

export const updateNoteTaskSecondsOnServer = (columnId, taskId, newSeconds) => {
    return (dispatch) => {
        debugger;
        dispatch(editTaskSeconds(columnId, taskId, newSeconds));
        noteTaskAPI.updateNoteTaskPatch(taskId, 'seconds', newSeconds).then(data => {});
    };
};

export default progressReducer;