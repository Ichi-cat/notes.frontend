import s from './NoteDetails.module.css'
import {UpdateNoteVm} from "notesApiClient";
import {noteApi} from "../../../api/apiClients";


const NoteDetails = (props) => {
    const updateDetailsTemp = (e) => {
        props.updateNoteDetails(e.currentTarget.value);
    }
    const pushDetailsOnServer = () => {
        let updateNoteVm = new UpdateNoteVm();
        updateNoteVm.id = props.noteDetails.id;
        updateNoteVm.name = props.noteDetails.name;
        updateNoteVm.text = props.noteDetails.text;
        let options = {
            body: updateNoteVm
        };
        noteApi.updateNote("1.0", options, (error, data, response) => {});
    }
    return (
        <div>
            <div className={`${s.note} ${props.isFetching ? "priloader" : "blue"}`}>
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