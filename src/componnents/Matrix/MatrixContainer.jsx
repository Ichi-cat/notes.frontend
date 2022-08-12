import React from "react";
import Matrix from "./Matrix";
import {connect} from "react-redux";
import {
    createNoteTaskOnServer,
    deleteNoteTaskOnServer,
    editNewTaskTempName, editTaskTempName, editTaskText,
    getNoteTasksById, openNoteTask,
    setAnimationActionCreator,
    setNoteTasks, toggleIsTaskEditing, updateNoteTaskOnServer, updateTaskNameOnServer
} from "../../redux/matrix-reducer";


const mapStateToProps = (state) => {
    return{
        blocks: state.matrixPage.blocks,
        activeBlock: state.matrixPage.activeBlock,
        isFetching: state.matrixPage.isFetching
    }
}

const mapDispatchToProps = {
    setAnimationActionCreator,
    setNoteTasks,
    createNoteTaskOnServer,
    getNoteTasksById,
    editNewTaskTempName,
    toggleIsTaskEditing,
    editTaskTempName,
    updateTaskNameOnServer,
    deleteNoteTaskOnServer,
    openNoteTask,
    editTaskText,
    updateNoteTaskOnServer
};


class MatrixContainer extends React.Component{
    componentDidMount() {
        this.props.blocks.forEach(block => {
            this.props.getNoteTasksById(block.id);
        });
    }

    render(){
        return (
            <Matrix {...this.props} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatrixContainer);