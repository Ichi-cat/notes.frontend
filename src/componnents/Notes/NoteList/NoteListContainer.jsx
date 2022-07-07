import React from "react";
import {
    activeNoteInputActiveCreator,
    addNoteActiveCreator,
    deleteCategoryActionCreator,
    deleteNoteActionCreator,
    editNoteNameActionCreator,
    openNoteActiveCreator,
    setCategoriesActionCreator, setCategoryActiveCreator, setCategoryNotesActionCreator,
    toggleDetailsIsDisabledActionCreator,
    toggleIsCategoryFetchingCreator,
    toggleIsChangingActiveCreator,
    toggleIsFetchingActionCreator,
    toggleNoteIsChangingActiveCreator,
    updateCategoryNameActiveCreator,
    updateCategoryTempActiveCreator,
    updateCurrentCategoryActiveCreator,
    updateNoteTempNameActiveCreator,
    updateTempNoteNameActiveCreator
} from "../../../redux/notes-reducer";
import {connect} from "react-redux";
import NoteList from "./NoteList";
import {categoryApi, noteApi} from "../../../redux/apiClients";



const mapStateToProps = (state) => {

    return{
        categories: state.notesPage.categories,
        isFetching: state.notesPage.isFetching,
        onDownloadCategoryIds: state.notesPage.onDownloadCategoryIds,
        tempCategoryName: state.notesPage.tempCategoryName,
        activeCategories: state.notesPage.activeCategories
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setCategories: (categories) => {
            dispatch(setCategoriesActionCreator(categories));
        },
        toggleIsCategoryFetching: (isFetching, id) => {
            dispatch(toggleIsCategoryFetchingCreator(isFetching, id));
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingActionCreator(isFetching));
        },

        openNote: (id, name, text, currentCategory) => {
            dispatch(openNoteActiveCreator(id, name, text, currentCategory));
        },

        updateCategoryNameTemp: (newText) => {
            dispatch(updateCategoryTempActiveCreator(newText));
        },

        toggleIsChanging: (id, isChanging) => {
            dispatch(toggleIsChangingActiveCreator(id, isChanging));
        },
        updateCurrentCategoryNameTemp: (id, newText) => {
            dispatch(updateCurrentCategoryActiveCreator(id, newText));
        },
        editCategory: (id) => {
            dispatch(updateCategoryNameActiveCreator(id));
        },
        activeNoteInput: (id) => {
            dispatch(activeNoteInputActiveCreator(id));
        },
        updateNoteTempName: (id, newName) => {
            dispatch(updateNoteTempNameActiveCreator(id, newName));
        },
        addNote: (id, noteId) => {
            dispatch(addNoteActiveCreator(id, noteId));
        },
        toggleNoteIsChanging: (id, categoryId, isChanging) => {
            dispatch(toggleNoteIsChangingActiveCreator(id, categoryId, isChanging));
        },
        updateTempNoteName: (id, categoryId, newName) => {
            dispatch(updateTempNoteNameActiveCreator(id, categoryId, newName));
        },
        editNoteName: (id, categoryId) => {
            dispatch(editNoteNameActionCreator(id, categoryId));
        },
        deleteNote: (id, categoryId) => {
            dispatch(deleteNoteActionCreator(id, categoryId));
        },
        deleteCategory: (id) => {
            dispatch(deleteCategoryActionCreator(id));
        },
        toggleDetailsIsDisabled: (isDisabled) => {
            dispatch(toggleDetailsIsDisabledActionCreator(isDisabled));
        },
        setCategoryNotes: (id, notes) =>  {
            dispatch(setCategoryNotesActionCreator(id, notes));
        },
        setActive: (id) => {
            dispatch(setCategoryActiveCreator(id));
        }
    }
}


class NoteListContainer extends React.Component{
    componentDidMount() {
        //send request to get notes
        this.props.toggleIsFetching(true);
        this.props.setCategories([]);
        categoryApi.getCategories("1.0", this.onCategoryDownload.bind(this));

    }

    onNotesDownload(error, data, response, category, isLast){
        //add category and her notes

        //create new category list with notes
        let categories = this.props.categories.concat([
            {
                id: category.id,
                name: category.name ? category.name : "No name",
                isActive: false,
                isChanging: false,
                noteInputIsActive: false,
                tempName: category.name ? category.name : "No name",
                noteTempName: "",
                notes: response.body.notes.map(note => {
                    return {...note, isChanging: false, tempName: note.name}
                    }
                )
            }]);
        this.props.setCategories(categories);
        //if it is last category, preloader turn off
        if(isLast) this.props.toggleIsFetching(false);
    }
    onCategoryDownload(error, data, response){
        //get all categories and send request for notes to every category
        this.props.setCategories(data.categories.map(category => {
            return {...category, tempName: category.name, noteTempName: "", isActive: false, isChanging: false, notes: []}
        }));
        this.props.toggleIsFetching(false);
        // data.categories.forEach((category, index, arr) => {
        //     noteApi.getNotesByCategoryId(category.id, "1.0",
        //         (error, data, response) => {
        //             //is it last category
        //             //if true, toggle fetching on false after getting notes
        //             let isLast = false;
        //             if(index === arr.length - 1) isLast = true;
        //             this.onNotesDownload(error, data, response, category, isLast);
        //         })
        //     });
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
