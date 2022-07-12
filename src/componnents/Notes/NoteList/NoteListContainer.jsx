import React from "react";
import {
    activeNoteInput,
    addNote, createCategory,
    deleteCategoryById,
    deleteNote,
    editNoteName, fetchNotes, openNote,
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
    updateCategoryTempName, updateCategoryTempNameById,
    updateNoteTempName,
    updateTempNoteName
} from "../../../redux/notes-reducer";
import {connect} from "react-redux";
import NoteList from "./NoteList";
import {categoryApi} from "../../../api/apiClients";



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
        deleteCategoryById,

        createCategory,
        updateCategory,
        openNote,
        fetchNotes
    };


class NoteListContainer extends React.Component{
    componentDidMount() {
        //send request to get notes
        this.props.toggleIsFetching(true);
        this.props.setCategories([]);
        categoryApi.getCategories("1.0", this.onCategoryDownload.bind(this));

    }
    onCategoryDownload(error, data, _){
        //get all categories and send request for notes to every category
        this.props.setCategories(data.categories.map(category => {
            return {...category, tempName: category.name, noteTempName: "", isActive: false, isChanging: false, notes: []}
        }));
        this.props.toggleIsFetching(false);
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
