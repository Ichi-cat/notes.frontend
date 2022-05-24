import React from "react";
import {
    activeNoteInputActiveCreator, addNoteActiveCreator,
    openNoteActiveCreator,
    setCategoriesActionCreator,
    setCategoryActiveCreator,
    toggleIsChangingActiveCreator,
    toggleIsFetchingActionCreator, toggleNoteIsChangingActiveCreator,
    updateCategoryNameActiveCreator,
    updateCategoryTempActiveCreator,
    updateCurrentCategoryActiveCreator, updateNoteTempNameActiveCreator
} from "../../../redux/notes-reducer";
import {connect} from "react-redux";
import NoteList from "./NoteList";
import {categoryApi, noteApi} from "../../../redux/apiClients";



const mapStateToProps = (state) => {

    return{
        categories: state.notesPage.categories,
        isFetching: state.notesPage.isFetching,
        tempCategoryName: state.notesPage.tempCategoryName
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setCategories: (categories) => {
            dispatch(setCategoriesActionCreator(categories));
        },
        setActive: (id) => {
            dispatch(setCategoryActiveCreator(id));
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
        toggleNoteIsChanging: (id, categoryId) => {
            dispatch(toggleNoteIsChangingActiveCreator(id, categoryId));
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
                notes: response.body.notes.map(note => ({...note, isChanging: false}))
            }]);
        this.props.setCategories(categories);
        //if it is last category, preloader turn off
        if(isLast) this.props.toggleIsFetching(false);
    }
    onCategoryDownload(error, data, response){
        //get all categories and send request for notes to every category
        response.body.categories.forEach((category, index, arr) => {
            noteApi.getNotesByCategoryId(category.id, "1.0",
                (error, data, response) => {
                    //is it last category
                    //if true, toggle fetching on false after getting notes
                    let isLast = false;
                    if(index === arr.length - 1) isLast = true;
                    this.onNotesDownload(error, data, response, category, isLast);
                })
            });
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
