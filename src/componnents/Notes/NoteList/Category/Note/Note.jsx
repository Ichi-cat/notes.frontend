import s from './Note.module.css'
import pen from '../../../../../img/pen.png'
import bucket from '../../../../../img/bucket.png'

const Note = (props) => {
    const openNote = () => {
        props.openNote(props.id, props.name, props.text);
    }
    return (
        <div className={s.item} onClick={openNote}>
            <div className={s.text}>{props.name}</div>
            <div><img className={s.icon} src={pen}/></div>
            <div><img className={s.icon} src={bucket} /></div>
        </div>
    );
}

export default Note;