import React from "react";
import ProgressItem from "./ProgressItem/ProgressItem";
import s from './ProgressBlock.module.css'
import {useDrop} from "react-dnd";
import {
    changeNoteTaskDateOnServer,
    createNoteTaskOnServer,
    deleteNoteTaskOnServer,
    editNewTaskTempName, editTaskSeconds, updateNoteTaskSecondsOnServer
} from "../../../redux/progress-reducer";

const ProgressBlock = (props) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: "card",
        drop: item => addTaskToColumn(item.columnId, item.task),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    }));
    const addTaskToColumn = (columnId, task) => {
        props.changeProgressColumn(task, columnId, props.column.id);
    };

    const editNewTaskTempNameOnInput = (e) => {
        props.editNewTaskTempName(props.column.id, e.currentTarget.value);
    };
    const createNoteTaskOnEnter = (e) => {
        if(e.code === 'Enter') props.createNoteTaskOnServer(props.column.id, props.column.tempNewTaskName);
    };

    const items = props.column.tasks.map(item => <ProgressItem key={item.id} item={item}
                                                               columnId={props.column.id}
                                                               toggleIsContextMenuOpened={props.toggleIsContextMenuOpened}
                                                               toggleIsTaskEditing={props.toggleIsTaskEditing}
                                                               editTaskTempName={props.editTaskTempName}
                                                               updateTaskNameOnServer={props.updateTaskNameOnServer}
                                                               deleteNoteTaskOnServer={props.deleteNoteTaskOnServer}
                                                               changeNoteTaskDateOnServer={props.changeNoteTaskDateOnServer}
                                                               editTaskSeconds={props.editTaskSeconds}
                                                               updateNoteTaskSecondsOnServer={props.updateNoteTaskSecondsOnServer}
    />);
    return (
        <>
            {!props.column.isFetching &&
                <div ref={drop}>
                    <div className={`${s.topic} ${props.column.topic_color}`}>{props.column.name}</div>
                    <div className={`${s.square} ${props.column.color} scroll ${props.column.scroll_color}`}>
                        {items}
                        <input className='button' type="text"
                               placeholder='+ new task'
                               onChange={editNewTaskTempNameOnInput}
                               onKeyDown={createNoteTaskOnEnter}
                               value={props.column.tempNewTaskName}
                               style={{width: '90%'}}
                        />
                    </div>
                </div>
            }
            {props.column.isFetching &&
                <div ref={drop} className='priloader'>
                    <div className={`${s.topic}`}>{props.column.name}</div>
                    <div className={`${s.square} scroll`}>
                        <div className={`priloader pri_point`}></div>
                        <div className={`priloader pri_point`}></div>
                        <div className={`priloader pri_point`}></div>
                        <div className={`priloader pri_point`}></div>
                    </div>
                </div>
            }
            </>
    );
}

export default ProgressBlock;
