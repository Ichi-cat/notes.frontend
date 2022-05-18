import s from './Notes.module.css'
import NoteListContainer from "./NoteList/NoteListContainer";
import NoteDetailsContainer from "./NoteDetails/NoteDetailsContainer";

const Notes = () => {
    return (
        <main>
            <div className={s.block}>
                <NoteListContainer />
                <NoteDetailsContainer />
            </div>
        </main>
    );
}

export default Notes;