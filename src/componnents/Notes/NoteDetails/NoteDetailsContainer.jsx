import React from "react";
import {
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
        updateNoteDetails: () => {
            dispatch(updateNoteTempActionCreator());
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
