import React from "react";
import {
    activeNoteInput,
    addNote, addNoteToServer, createCategory,
    deleteCategoryFromServer,
    deleteNote, deleteNoteFromServer,
    editNoteName, fetchNotes, getCategoriesFromServer, openNote,
    setCategories,
    setCategoryActive,
    setCategoryNotes,
    setNoteDetails,
    toggleDetailsIsDisabled,
    toggleIsCategoryFetching,
    toggleIsChanging,
    toggleIsFetching,
    toggleNoteIsChanging, updateCategory,
    updateCategoryName,
    updateCategoryTempName, updateCategoryTempNameById, updateNoteNameOnServer,
    updateNoteTempName,
    updateTempNoteName
} from "../../../redux/notes-reducer";
import {connect} from "react-redux";
import NoteList from "./NoteList";



const mapStateToProps = (state) => {

    return{
        categories: state.notesPage.categories,
        isFetching: state.notesPage.isFetching,
        onDownloadCategoryIds: state.notesPage.onDownloadCategoryIds,
        tempCategoryName: state.notesPage.tempCategoryName,
        activeCategories: state.notesPage.activeCategories
    }
}

const mapDispatchToProps = {
        setCategories,
        toggleIsCategoryFetching,
        toggleIsFetching,
        setNoteDetails,
        updateCategoryTempName,
        toggleIsChanging,
        updateCategoryTempNameById,
        updateCategoryName,
        activeNoteInput,
        updateNoteTempName,
        addNote,
        toggleNoteIsChanging,
        updateTempNoteName,
        editNoteName,
        deleteNote,
        toggleDetailsIsDisabled,
        setCategoryNotes,
        setCategoryActive,
        deleteCategoryFromServer,

        getCategoriesFromServer,
        createCategory,
        updateCategory,
        openNote,
        fetchNotes,
        addNoteToServer,
        updateNoteNameOnServer,
        deleteNoteFromServer
    };


class NoteListContainer extends React.Component{
    componentDidMount() {
        //send request to get notes
        this.props.getCategoriesFromServer();
    }
    render(){
        return (
            <>
                <NoteList {...this.props} />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
