import React from "react";
import {addCategoryActionCreator, categoryApi, setCategoryActiveCreator} from "../../../redux/notes-reducer";
import {connect} from "react-redux";
import NoteList from "./NoteList";
import {CreateCategoryVm} from "notesApiClient1";


const mapStateToProps = (state) => {
    return{
        categories: state.notesPage.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addCategory: (test) => {
            dispatch(addCategoryActionCreator(test));
        },
        setActive: (id) => {
            dispatch(setCategoryActiveCreator(id));
        }
    }
}


class NoteListContainer extends React.Component{
    componentDidMount() {
        categoryApi.createCategory("1.0", {body: new CreateCategoryVm()},(error, data, response) => this.props.addCategory(response));
    }

    render(){
        return <NoteList {...this.props} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
