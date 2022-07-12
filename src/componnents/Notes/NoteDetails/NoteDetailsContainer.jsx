import React from "react";
import {
    pushNoteDetailsActiveCreator, setDefaultDetailsActionCreator,
    updateNoteTempActionCreator
} from "../../../redux/notes-reducer";
import {connect} from "react-redux";
import NoteDetails from "./NoteDetails";


const mapStateToProps = (state) => {

    return{
        noteDetails: state.notesPage.details,
        isFetching: state.notesPage.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateNoteDetails: (text) => {
            dispatch(updateNoteTempActionCreator(text));
        },
        setDefaultDetails: () => {
            dispatch(setDefaultDetailsActionCreator());
        }
    }
}


class NoteDetailsContainer extends React.Component{
    componentDidMount() {
        this.props.setDefaultDetails();
        // categoryApi.createCategory("1.0", {body: new CreateCategoryVm()},(error, data, response) => this.props.addCategory(response));
    }

    render(){
        return <NoteDetails {...this.props} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetailsContainer);
