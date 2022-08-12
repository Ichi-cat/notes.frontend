import React from "react";
import MatrixBlock from "./MatrixBlock/MatrixBlock";
import s from './Matrix.module.css'
import {
    createNoteTaskOnServer,
    deleteNoteTaskOnServer,
    editNewTaskTempName,
    editTaskTempName, openNoteTask, setAnimationActionCreator,
    toggleIsTaskEditing, updateNoteTaskOnServer,
    updateTaskNameOnServer
} from "../../redux/matrix-reducer";

const Matrix = (props) => {
    let blockElement = React.createRef();
    const closeNoteTask = (e) => {
        props.updateNoteTaskOnServer(props.activeBlock, props.blocks);
        props.setAnimationActionCreator(0, false);
    }
    const matrices = props.blocks.map((block, index) => {
        return (
            <>
                {index === 2 ?
                <div className={s.topic}>
                    <div className={s.vertical}>unimportant</div>
                </div> : null}
                <MatrixBlock block={block}
                             color={block.color}//
                             scrollColor={block.scrollColor}//
                             blockName={`b_${index+1}`}
                             setActive={props.setActive}//
                             index={index}
                             createNoteTaskOnServer={props.createNoteTaskOnServer}
                             editNewTaskTempName={props.editNewTaskTempName}
                             toggleIsTaskEditing={props.toggleIsTaskEditing}
                             editTaskTempName={props.editTaskTempName}
                             updateTaskNameOnServer={props.updateTaskNameOnServer}
                             deleteNoteTaskOnServer={props.deleteNoteTaskOnServer}
                             openNoteTask={props.openNoteTask}
                             editTaskText={props.editTaskText}
                />
            </>
        );
    });
    return (
        <main>
            <div
                style={{position: "absolute", left: 0, top: 0, opacity: "0%", width: "100vw", height: "100vh"}}
                onClick={closeNoteTask}
            ></div>
            <div className={s.block} ref={blockElement}>
                <div></div>
                <div className={s.topic}>Urgent</div>
                <div className={s.topic}>Not urgent</div>
                <div className={s.topic}>
                    <div className={s.vertical}>important</div>
                </div>
                {matrices}
            </div>
        </main>
    );
}

export default Matrix;