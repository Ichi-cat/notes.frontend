import s from './Note.module.css'
import pen from '../../../../../img/pen.png'
import bucket from '../../../../../img/bucket.png'

const Note = (props) => {
    const openNote = () => {
        props.openNote(props.id, props.name, props.text, props.currentCategory);
    }
    const toggleIsChanging = () => {
        debugger;
        props.toggleNoteIsChanging(props.id, props.currentCategory)
    }
    return (
        <>
        {!props.isChanging ? <>
            <div className={s.item}>
                <div className={s.text} onClick={openNote}>{props.name}</div>
                <div onClick={toggleIsChanging}><img className={s.icon} src={pen}/></div>
                <div><img className={s.icon} src={bucket} /></div>
            </div>
        </>
                :
                <div><input type="text"/></div>
        }
        </>
    );
}

export default Note;