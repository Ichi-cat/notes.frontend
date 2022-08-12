import MatrixItem from "./MatrixItem/MatrixItem";
import s from './MatrixBlock.module.css'
import {
    createNoteTaskOnServer,
    deleteNoteTaskOnServer,
    editTaskTempName, openNoteTask,
    toggleIsTaskEditing,
    updateTaskNameOnServer
} from "../../../redux/matrix-reducer";


const MatrixBlock = (props) => {
    const editNewTaskNameOnInput = (e) => {
        props.editNewTaskTempName(props.block.id, e.currentTarget.value);
    };
    const editTaskTextOnInput = (e) => {
        props.editTaskText(props.block.id, e.currentTarget.value);
    };
    const createNoteTask = (e) => {
        if(e.code === 'Enter') props.createNoteTaskOnServer(props.block.id, props.block.tempNewTaskName);
    };
    const matrixItems = props.block.tasks.map(task => {
        return <MatrixItem task={task}
                           toggleIsTaskEditing={props.toggleIsTaskEditing}
                           editTaskTempName={props.editTaskTempName}
                           blockId={props.block.id}
                           updateTaskNameOnServer={props.updateTaskNameOnServer}
                           deleteNoteTaskOnServer={props.deleteNoteTaskOnServer}
                           openNoteTask={props.openNoteTask}
        />
    });
    return (
        <>
            {!props.block.isFetching ?
                <div className={`${props.color} ${s.box} ${props.blockName} scroll ${props.scrollColor} 
                    ${props.block.isActive ? "anim" : "hide"}`}>
                    {!props.block.isActive ?
                        <>
                            {matrixItems}
                            <input className={s.matrix_add} value={props.block.tempNewTaskName}
                                   onChange={editNewTaskNameOnInput}
                                   placeholder="+ add task"
                                   onKeyDown={createNoteTask}
                            />
                        </> :
                        <textarea className={`${s.noteTaskDetails} scroll`} value={props.block.taskDetails.text}
                                  onChange={editTaskTextOnInput}
                        ></textarea>
                    }

                </div>
                :
                <div className={`priloader ${s.box} ${props.blockName} scroll`}>
                    <div className={`priloader ${s.pri_point}`}></div>
                    <div className={`priloader ${s.pri_point}`}></div>
                    <div className={`priloader ${s.pri_point}`}></div>
                    <div className={`priloader ${s.pri_point}`}></div>
                </div>
            }

        </>
    );
}

export default MatrixBlock;