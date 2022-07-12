import s from './Note.module.css'
import pen from '../../../../../img/pen.png'
import bucket from '../../../../../img/bucket.png'
import {UpdateNoteVm} from "notesApiClient";
import {noteApi} from "../../../../../api/apiClients";

const Note = (props) => {
    const openNote = () => {
        props.openNote(props.id, props.currentCategory);
    }
    const toggleIsChanging = () => {
        props.toggleNoteIsChanging(props.id, props.currentCategory, true)
    }
    const updateTempNoteName = (e) => {
        props.updateTempNoteName(props.id, props.currentCategory, e.currentTarget.value);
    }
    const editNoteOnKeyPress = (e) => {
        if(e.keyCode === 13){
            let updateNoteVm = new UpdateNoteVm();
            updateNoteVm.id = props.id;
            updateNoteVm.name = props.tempName;
            updateNoteVm.text = props.text;
            let updateNoteOptions = {
                body: updateNoteVm
            };

            noteApi.updateNote("1.0", updateNoteOptions, (error, data, response) => {
                props.editNoteName(props.id, props.currentCategory);
                props.toggleNoteIsChanging(props.id, props.currentCategory, false);
            });
        }
    };

    const deleteNote = () => {
        noteApi.deleteNote(props.id, "1.0", (error, data, response) => {
            props.deleteNote(props.id, props.currentCategory);
        });
    }
    return (
        <>
        {!props.isChanging ? <>
            <div className={s.item}>
                <div className={s.text} onClick={openNote}>{props.name}</div>
                <div onClick={toggleIsChanging}><img className="icon" src={pen}/></div>
                <div onClick={deleteNote}><img className="icon" src={bucket} /></div>
            </div>
        </>
                :
            <input className={s.button}
                   value={props.tempName}
                   placeholder="edit note"
                   onChange={updateTempNoteName}
                   autoFocus={true}
                   onKeyDown={editNoteOnKeyPress}/>
        }
        </>
    );
}

export default Note;