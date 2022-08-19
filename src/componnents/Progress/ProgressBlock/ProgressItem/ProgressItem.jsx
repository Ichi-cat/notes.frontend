import s from './ProgressItem.module.css'
import pen from '../../../../img/pen.png'
import point from '../../../../img/point.png'
import icon_timer from '../../../../img/icon-timer.png'
import bucket from '../../../../img/bucket.png'
import {useDrag} from "react-dnd";
import {useState} from "react";
import Timer from "./Timer";
import {editTaskSeconds, updateNoteTaskSecondsOnServer} from "../../../../redux/progress-reducer";


const ProgressItem = (props) => {
    const [time, setTime] = useState({time: 0, timer: null});

    const startStopWatch = () => {
        let stopWatch = setInterval(() => {
            let leftTime = time.time+1;
            debugger;
            setTime({time: leftTime, timer: stopWatch});
        }, 1000);
    };
    const stopStopWatch = () => {
        clearInterval(time.timer);
    };


    const [{isDragging}, drag] = useDrag(() => ({
        type: "card",
        item: {task: props.item, columnId: props.columnId},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const toggleIsContextMenuOpenedOnClick = () => {
        props.toggleIsContextMenuOpened(props.columnId, props.item.id, !props.item.isContextMenuOpened);
    }

    const openInputOnClick = () => {
        props.toggleIsTaskEditing(props.columnId, props.item.id, true);
    }
    const editTempNameOnInput = (e) => {
        props.editTaskTempName(props.columnId, props.item.id, e.currentTarget.value);
    }

    const updateTaskNameOnClick = (e)  => {
        if(e.code === "Enter") props.updateTaskNameOnServer(props.columnId, props.item);
    };

    const deleteTaskOnClick = () => {
        props.deleteNoteTaskOnServer(props.columnId,  props.item.id);
    };

    const chooseDateOnInput  = (e) => {
        let date = new Date(e.target.value);
        props.changeNoteTaskDateOnServer(props.columnId, props.item, date);
    };

    const toggleTimerStatusOnCLick = (e) => {
        props.toggleTimerStatus(props.columnId, props.item.id, !props.item.isTimerActive);
    };

    const dateToValueString = (date) => {
        if(!date) return;
        const formatDate = (num) => {
            return num.length === 1 ? '0' + num : num;
        };
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        month = formatDate(month);
        let day = date.getDate().toString();
        day = formatDate(day);

        let hours = date.getHours().toString();
        hours = formatDate(hours);
        let minutes = date.getMinutes().toString();
        minutes = formatDate(minutes);

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    return (
        <div className={s.str} ref={drag}>
            {!props.item.isEditing ? <>
                <div className={s.str_text}>{props.item.name}</div>
                <div>
                    <img className="icon" src={point} onClick={toggleIsContextMenuOpenedOnClick}/>
                    {props.item.isContextMenuOpened ?
                        <div className={s.max}>
                            <Timer editTaskSeconds={props.editTaskSeconds}
                                   seconds={props.item.seconds}
                                   columnId={props.columnId}
                                   taskId={props.item.id}
                                   updateNoteTaskSecondsOnServer={props.updateNoteTaskSecondsOnServer}
                            />
                            <img src={pen} alt="" className='icon' onClick={stopStopWatch}/>
                            <input type="datetime-local" className={s.calendar}
                                   value={dateToValueString(props.item._date)}
                                   onInput={chooseDateOnInput}/>
                            {/*// <!--                            <img class="icon" src="css/img/calendar.png">-->*/}
                            <img className="icon" src={pen} onClick={openInputOnClick}/>
                            <img className="icon" src={bucket} onClick={deleteTaskOnClick}/>
                        </div> : null
                    }

                </div>
                {(props.item._date || props.item.seconds) &&
                    <div className="up_left">
                        {props.item._date &&
                            <>
                                <div className="left">{props.item._date.toLocaleString('en-US',
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                <div className="left">{props.item._date.toLocaleString('en-US',
                                    {
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}</div>
                            </>
                        }
                        {props.item.seconds && <div className="left">{props.item.seconds}</div>}
                    </div>
                }
            </> : <input className='button' type="text"
                         value={props.item.tempName}
                         onChange={editTempNameOnInput}
                         onKeyDown={updateTaskNameOnClick}
            />}

        </div>
    );
}

export default ProgressItem;