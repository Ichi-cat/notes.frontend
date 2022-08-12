import ProgressBlock from "./ProgressBlock/ProgressBlock";
import s from './Progress.module.css'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {
    changeNoteTaskDateOnServer,
    createNoteTaskOnServer,
    deleteNoteTaskOnServer,
    editNewTaskTempName, editTaskSeconds, updateNoteTaskSecondsOnServer
} from "../../redux/progress-reducer";

const Progress = (props) => {
    const blocks = props.columns.map(column => <ProgressBlock
        key={column.id}
        column={column}
        changeProgressColumn={props.changeProgressColumn}
        toggleIsContextMenuOpened={props.toggleIsContextMenuOpened}
        toggleIsTaskEditing={props.toggleIsTaskEditing}
        editTaskTempName={props.editTaskTempName}
        updateTaskNameOnServer={props.updateTaskNameOnServer}
        deleteNoteTaskOnServer={props.deleteNoteTaskOnServer}
        editNewTaskTempName={props.editNewTaskTempName}
        createNoteTaskOnServer={props.createNoteTaskOnServer}
        changeNoteTaskDateOnServer={props.changeNoteTaskDateOnServer}
        editTaskSeconds={props.editTaskSeconds}
        updateNoteTaskSecondsOnServer={props.updateNoteTaskSecondsOnServer}
    />);
    return (
        <main>
            <DndProvider backend={HTML5Backend}>
                <div className={s.block}>
                    {blocks}
                    {/*<ProgressBlock topic_color="durk_pink" color="pink" scroll_color="scroll_pink" />*/}
                    {/*<ProgressBlock topic_color="durk_yellow" color="yellow" scroll_color="scroll_yellow" />*/}
                    {/*<ProgressBlock topic_color="durk_green" color="green" scroll_color="scroll_green" />*/}
                </div>
            </DndProvider>
        </main>
    );
}
export default Progress;