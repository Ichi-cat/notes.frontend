import React from "react";
import {
    pushNoteDetailsActiveCreator,
    updateNoteTempActionCreator
} from "../../../redux/notes-reducer";
import {connect} from "react-redux";
import NoteDetails from "./NoteDetails";


const mapStateToProps = (state) => {

    return{
        noteDetails: state.notesPage.details
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateNoteDetails: (text) => {
            dispatch(updateNoteTempActionCreator(text));
        },
        pushNoteDetails: (noteDetails) => {
            dispatch(pushNoteDetailsActiveCreator(noteDetails));
        }
    }
}


class NoteDetailsContainer extends React.Component{
    componentDidMount() {
        // categoryApi.createCategory("1.0", {body: new CreateCategoryVm()},(error, data, response) => this.props.addCategory(response));
    }

    render(){
        return <NoteDetails {...this.props} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailsContainer);
