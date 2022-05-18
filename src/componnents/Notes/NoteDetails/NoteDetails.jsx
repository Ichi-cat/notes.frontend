import s from './NoteDetails.module.css'


const NoteDetails = (props) => {
    const updateDetailsTemp = (e) => {
        props.updateNoteDetails(e.currentTarget.value);
    }
    const pushDetailsOnServer = () => {
        props.pushNoteDetails(props.noteDetails.id);
    }

    return (
        <div>
            <div className={`${s.note} blue`}>
                <textarea value={props.noteDetails.text} className={`${s.noteDetails} scroll`}
                          onChange={updateDetailsTemp}
                          onBlur={pushDetailsOnServer} />
            </div>
        </div>
    );
}

export default NoteDetails;