import s from './Note.module.css'

const Note = () => {
    return (
        <div className={s.category}>
            <div className="mark blue"></div>
            <div className={s.text}>Lorem ipsum dolor sit amet</div>
        </div>
    );
}

export default Note;