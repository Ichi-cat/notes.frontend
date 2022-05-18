import s from './Note.module.css'
import pen from '../../../../../img/pen.png'
import bucket from '../../../../../img/bucket.png'

const Note = (props) => {
    return (
        <div className={s.item}>
            <div className={s.text}>{props.name}</div>
            <div><img className={s.icon} src={pen}/></div>
            <div><img className={s.icon} src={bucket} /></div>
        </div>
    );
}

export default Note;