import s from './MatrixItem.module.css'
import PEN from '../../../../img/pen.png'
import BUCKET from '../../../../img/bucket.png'
import {deleteNoteTaskOnServer, openNoteTask} from "../../../../redux/matrix-reducer";


const MatrixItem = (props) => {
    const openNoteTaskInput = () => {
        props.toggleIsTaskEditing(props.blockId, props.task.id, true);
    };
    const editTempNameOnInput = (e)  => {
        props.editTaskTempName(props.blockId, props.task.id, e.currentTarget.value);
    };
    const updateTaskNameOnClick = (e)  => {
        if(e.code === "Enter") props.updateTaskNameOnServer(props.blockId, props.task);
    };
    const deleteNoteTask = (e)  => {
        props.deleteNoteTaskOnServer(props.blockId, props.task.id);
    };
    const setActiveOnClick = (e)  => {
        props.openNoteTask(props.blockId, props.task.id);
    };
    return (
        <div className={s.team}>
            {!props.task.isEditing ?
                <>
                    <div className={s.point} onClick={setActiveOnClick}>{props.task.name}
                    </div>
                    <div><img className="icon" src={PEN} onClick={openNoteTaskInput}/></div>
                    <div><img className="icon" src={BUCKET} onClick={deleteNoteTask}/></div>
                    {props.task._date ?
                        <div className="up_left">
                            <div className="left">{props.task._date.toLocaleString('en-US',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div className="left">{props.task._date.toLocaleString('en-US',
                                {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}</div>
                        </div>
                        : null
                    }
                </> :
                <input className='button' type="text"
                       value={props.task.tempName}
                       onChange={editTempNameOnInput}
                       onKeyDown={updateTaskNameOnClick}
                />
            }
        </div>
    );
}

export default MatrixItem;