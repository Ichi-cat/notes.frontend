import s from './NoteList.module.css'
import Note from "./Note/Note";


const NoteList = () => {
    return (
        <div>
            <div className={s.categorys}>
                <Note />
                <Note />
                <Note />
                <Note />
            </div>
        </div>
    );
}

export default NoteList;