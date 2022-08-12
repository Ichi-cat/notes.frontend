import {noteTaskAPI} from "../api/api";

const SET_NOTE_TASKS = "SET_NOTE_TASKS";
const SET_NOTE_TASK_DETAILS = "SET_NOTE_TASK_DETAILS";
const TOGGLE_IS_BLOCK_FETCHING = "TOGGLE_IS_BLOCK_FETCHING";
const TOGGLE_IS_TASK_CHANGING = "TOGGLE_IS_TASK_CHANGING";
const SET_ANIMATION = "SET_ANIMATION";
const ADD_NOTE_TASK = "ADD_NOTE_TASK";
const EDIT_NEW_TASK_TEMP_NAME = "EDIT_NEW_TASK_TEMP_NAME";
const EDIT_TASK_TEMP_NAME = "EDIT_TASK_TEMP_NAME";
const EDIT_TASK_NAME = "EDIT_TASK_NAME";
const EDIT_TASK_TEXT = "EDIT_TASK_TEXT";
const DELETE_NOTE_TASK = "DELETE_NOTE_TASK";




let initialState = {
    blocks: [
        {
            id: 1,
            tasks: [
                {id: "assdfkmr-23112", name: "123"}
            ],
            tempNewTaskName: "",
            tempInput: "",
            isActive: false,
            color: "pink",
            scrollColor: "scroll_pink",
            isFetching: false,

            taskDetails: {id: null, name: null, text: null}
        },
        {
            id: 2,
            tasks: [],
            tempNewTaskName: "",
            tempInput: "",
            isActive: false,
            color: "yellow",
            scrollColor: "scroll_yellow",
            isFetching: false,

            taskDetails: {id: null, name: null, text: null}
        },
        {
            id: 3,
            tasks: [],
            tempNewTaskName: "",
            tempInput: "",
            isActive: false,
            color: "green",
            scrollColor: "scroll_green",
            isFetching: false,

            taskDetails: {id: null, name: null, text: null}
        },
        {
            id: 4,
            tasks: [],
            tempNewTaskName: "",
            tempInput: "",
            isActive: false,
            color: "blue",
            scrollColor: "scroll_blue",
            isFetching: false,

            taskDetails: {id: null, name: null, text: null}
        },
    ],
    activeBlock: 1
}

const matrixReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_NOTE_TASKS:
            return {
                ...state,
                blocks: state.blocks.map((block) => {
                    if(block.id === action.id) block.tasks = action.tasks.map(task =>
                        ({...task, tempName: task.name, isEditing: false}));
                    return block;
                })
            }
        case SET_NOTE_TASK_DETAILS:
            return {
                ...state,
                blocks: state.blocks.map((block) => {
                    if(block.id === action.id) block.taskDetails = action.taskDetails;
                    return block;
                }),
                activeBlock: action.id
            };
        case ADD_NOTE_TASK:
            return {
                ...state,
                blocks: state.blocks.map((block) => {
                    if(block.id === action.id) block.tasks = block.tasks.concat({...action.task,
                        tempName: action.task.name, isEditing: false});
                    return block;
                })
            };
        case TOGGLE_IS_BLOCK_FETCHING:
            return {
                ...state,
                blocks: state.blocks.map((block) => {
                    if(block.id === action.id) block.isFetching = action.isFetching;
                    return block;
                })
            };
        case TOGGLE_IS_TASK_CHANGING:
            return {
                ...state,
                blocks: changeTaskById(state.blocks, action.blockId, action.taskId,
                    (task) => {task.isEditing = action.isEditing;})
            };
        case EDIT_NEW_TASK_TEMP_NAME:
            return {
                ...state,
                blocks: state.blocks.map((block) => {
                    if(block.id === action.id) block.tempNewTaskName = action.newTempName;
                    return block;
                })
            };
        case EDIT_TASK_TEMP_NAME:
            return {
                ...state,
                blocks: changeTaskById(state.blocks, action.blockId, action.taskId,
                    (task) => {task.tempName = action.newTempName;})
            };
        case EDIT_TASK_NAME:
            return {
                ...state,
                blocks: changeTaskById(state.blocks, action.blockId, action.taskId,
                    (task) => {task.name = action.newName;})
            };
        case EDIT_TASK_TEXT:
            return {
                ...state,
                blocks: state.blocks.map((block) => {
                    if(block.id === action.blockId) block.taskDetails.text = action.newText;
                    return block;
                })
            };
        case DELETE_NOTE_TASK:
            return {
                ...state,
                blocks: state.blocks.map((block) => {
                    if (block.id === action.blockId) {
                        block.tasks = block.tasks.filter(task => {
                            return task.id !== action.taskId;
                        });
                    }
                    return block;
                })
            };
        case SET_ANIMATION:
            return {
                ...state,
                blocks: state.blocks.map((block, index) => {
                    if(block.id === action.blockId) block.isActive = action.isActive;
                    else block.isActive = false;
                    return block;
                })
            }
        default:
            return state;
    }
}


const changeTaskById = (blocks, blockId, taskId, func) => {
    return blocks.map((block) => {
        if (block.id === blockId) {
            block.tasks.map(task => {
                if (task.id === taskId) func(task);
                return task;
            });
        }
        return block;
    });
}


export const setAnimationActionCreator = (blockId, isActive) => ({type: SET_ANIMATION, blockId, isActive});
export const toggleIsBlockFetching = (id, isFetching) => ({type: TOGGLE_IS_BLOCK_FETCHING, id, isFetching});
export const toggleIsTaskEditing = (blockId, taskId, isEditing) => ({type: TOGGLE_IS_TASK_CHANGING, blockId, taskId, isEditing});
export const setNoteTasks = (id, tasks) => ({type: SET_NOTE_TASKS, id, tasks});
export const setNoteTaskDetails = (id, taskDetails) => ({type: SET_NOTE_TASK_DETAILS, id, taskDetails});
export const addNoteTask = (id, task) => ({type: ADD_NOTE_TASK, id, task});
export const editNewTaskTempName = (id, newTempName) => ({type: EDIT_NEW_TASK_TEMP_NAME, id, newTempName});
export const editTaskTempName = (blockId, taskId, newTempName) => ({type: EDIT_TASK_TEMP_NAME, blockId, taskId, newTempName});
export const editTaskName = (blockId, taskId, newName) => ({type: EDIT_TASK_NAME, blockId, taskId, newName});
export const deleteNoteTask = (blockId, taskId) => ({type: DELETE_NOTE_TASK, blockId, taskId});
export const editTaskText = (blockId, newText) => ({type: EDIT_TASK_TEXT, blockId, newText});

//thunks
export const getNoteTasksById = (id) => {
    return (dispatch) => {
        dispatch(toggleIsBlockFetching(id,  true));
        noteTaskAPI.getNoteTasksByMatrixId(id).then(data => {
            dispatch(setNoteTasks(id, data.tasks));
            dispatch(toggleIsBlockFetching(id,  false));
        });
    }
};

export const createNoteTaskOnServer = (blockId, name) => {
    return (dispatch) => {
        noteTaskAPI.createNoteTaskWithMatrixId(blockId, name).then(data => {
            dispatch(addNoteTask(blockId, {id: data, name: name, _date: null}));
            dispatch(editNewTaskTempName(blockId, ''));
        });
    }
};

export const updateTaskNameOnServer = (blockId, task) => {
    return (dispatch) => {
        noteTaskAPI.updateNoteTaskName(task).then(data => {
            dispatch(editTaskName(blockId, task.id, task.tempName));
            dispatch(toggleIsTaskEditing(blockId, task.id, false));
        });
    }
};

export const deleteNoteTaskOnServer = (blockId, taskId) => {
    return (dispatch) => {
        noteTaskAPI.deleteNoteTaskById(taskId).then(data => {
            dispatch(deleteNoteTask(blockId, taskId));
        });
    }
};

export const openNoteTask = (blockId, taskId) => {
    return (dispatch) => {
        noteTaskAPI.getNoteTaskDetailsById(taskId).then(data => {
            dispatch(setNoteTaskDetails(blockId, data));
            dispatch(setAnimationActionCreator(blockId, true));
        });
    }
};

export const updateNoteTaskOnServer = (activeBlock, blocks) => {
    return (dispatch) => {
        blocks.forEach(block => {
            if(block.id === activeBlock) noteTaskAPI.updateNoteTask(block.taskDetails).then(data => {
            });
        });
    }
};

export default matrixReducer;