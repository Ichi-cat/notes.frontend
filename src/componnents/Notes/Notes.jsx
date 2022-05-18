import NoteDetails from "./NoteDetails/NoteDetails";
import s from './Notes.module.css'
import NoteListContainer from "./NoteList/NoteListContainer";

const Notes = () => {
    return (
        <main>
            <div className={s.block}>
                <NoteListContainer />
                <NoteDetails />
            </div>
        </main>
    );
}

export default Notes;