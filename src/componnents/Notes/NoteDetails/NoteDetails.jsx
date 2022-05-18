import s from './NoteDetails.module.css'


const NoteDetails = (props) => {
    const updateDetailsTemp = (e) => {
        props.updateNoteDetails(e.currentTarget.value);
    }
    return (
        <div>
            <div className={`${s.note} blue`}>
                <textarea value={props.noteDetails} className={`${s.noteDetails} scroll`}></textarea>
            </div>
        </div>
    );
}

export default NoteDetails;