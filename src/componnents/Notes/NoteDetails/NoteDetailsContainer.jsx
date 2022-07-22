import React from "react";
import {
    setDefaultDetails, updateNoteOnServer,
    updateTempNoteDetails
} from "../../../redux/notes-reducer";
import {connect} from "react-redux";
import NoteDetails from "./NoteDetails";


const mapStateToProps = (state) => {

    return{
        noteDetails: state.notesPage.details,
        isFetching: state.notesPage.isFetching
    }
}

const mapDispatchToProps = {
    updateTempNoteDetails,
    setDefaultDetails,
    updateNoteOnServer
};


class NoteDetailsContainer extends React.Component{
    componentDidMount() {
        this.props.setDefaultDetails();
    }

    render(){
        return <NoteDetails {...this.props} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailsContainer);
