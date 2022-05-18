import React from "react";
import {
    openNoteActiveCreator,
    setCategoriesActionCreator,
    setCategoryActiveCreator,
    toggleIsFetchingActionCreator, updateCategoryTempActiveCreator
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

        openNote: (id, name, text) => {
            dispatch(openNoteActiveCreator(id, name, text));
        },

        updateCategoryNameTemp: (newText) => {
            debugger;
            dispatch(updateCategoryTempActiveCreator(newText));
        }
    }
}


class NoteListContainer extends React.Component{
    componentDidMount() {
        //do request to get notes
        this.props.toggleIsFetching(true);
        //this.props.setCategories([]);
        this.props.setCategories([]);
        categoryApi.getCategories("1.0", this.onCategoryDownload.bind(this));

    }

    onNotesDownload(error, data, response, category, isLast){
        //add category and her notes
        console.log(response);
        debugger;
        let categories = this.props.categories.concat({id: category.id,
            name: category.name ? category.name : "No name",
            isActive: false,
            notes: response.body.notes});
        /////////////
        this.props.setCategories(categories);
        if(isLast) this.props.toggleIsFetching(false);
    }
    onCategoryDownload(error, data, response){

        console.log(response);

        let i = 1;
        response.body.categories.forEach((category, index, arr) => {
            noteApi.getNotesByCategoryId(category.id, "1.0",
                (error, data, response) => {
                console.log(i);
                i++;
                    let isLast = false;
                    if(index == arr.length - 1) isLast = true;
                    this.onNotesDownload(error, data, response, category, isLast);
                })
            });
        }
        // response.body.categories.map(category => ({id: category.id,
        //     name: category.name,
        //     notes: noteApi.getNoteById("1.0", )}));


    render(){
        return (
            <>
                <NoteList {...this.props} />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListContainer);
