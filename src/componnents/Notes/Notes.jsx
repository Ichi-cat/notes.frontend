import NoteList from "./NoteList/NoteList";
import NoteDetails from "./NoteDetails/NoteDetails";
import s from './Notes.module.css'

const Notes = () => {
    return (
        <main>
            <div className={s.block}>
                <NoteList />
                <NoteDetails />
            </div>
        </main>
    );
}

export default Notes;