import s from './NoteDetails.module.css'


const NoteDetails = (props) => {
    const updateDetailsTemp = (e) => {
        props.updateTempNoteDetails(e.currentTarget.value);
    }
    const pushDetailsOnServer = () => {
        props.updateNoteOnServer(props.noteDetails.id, props.noteDetails.name,props.noteDetails.text);
    }
    return (
        <div>
            <div className={`${s.note} ${props.isFetching ? "priloader" : props.noteDetails.currentCategory.color || 'blue'}`}>
                <textarea value={props.noteDetails.text} className={`${s.noteDetails} scroll scroll_blue`}
                          onChange={updateDetailsTemp}
                          onBlur={pushDetailsOnServer}
                          disabled={props.noteDetails.isDisabled} />
                <div>+</div>
            </div>
        </div>
    );
}

export default NoteDetails;