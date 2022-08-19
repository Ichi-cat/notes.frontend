import s from './Note.module.css'
import pen from '../../../../../img/pen.png'
import bucket from '../../../../../img/bucket.png'

const Note = (props) => {
    debugger
    const openNote = () => {
        props.openNote(props.id, props.currentCategory);
    }
    const toggleIsChanging = () => {
        props.toggleNoteIsChanging(props.id, props.currentCategory.id, true)
    }
    const updateTempNoteName = (e) => {
        props.updateTempNoteName(props.id, props.currentCategory.id, e.currentTarget.value);
    }
    const editNoteOnKeyPress = (e) => {
        if(e.keyCode === 13){
            props.updateNoteNameOnServer(props.id, props.tempName, props.currentCategory.id);
        }
    };
    const deleteNote = () => {
        props.deleteNoteFromServer(props.id, props.currentCategory.id);
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