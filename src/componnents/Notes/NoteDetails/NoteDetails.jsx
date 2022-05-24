import s from './NoteDetails.module.css'
import {UpdateNoteVm} from "notesApiClient";
import {noteApi} from "../../../redux/apiClients";


const NoteDetails = (props) => {
    const updateDetailsTemp = (e) => {
        props.updateNoteDetails(e.currentTarget.value);
    }
    debugger;
    const pushDetailsOnServer = () => {
        let updateNoteVm = new UpdateNoteVm();
        updateNoteVm.id = props.noteDetails.id;
        updateNoteVm.name = props.noteDetails.name;
        updateNoteVm.text = props.noteDetails.text;
        let options = {
            body: updateNoteVm
        };
        noteApi.updateNote("1.0", options, (error, data, response) => {
            console.log(props.noteDetails);
            props.pushNoteDetails(props.noteDetails);
        });
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