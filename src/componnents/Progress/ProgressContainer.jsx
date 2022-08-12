import {Component} from "react";
import Progress from "./Progress";
import {connect} from "react-redux";
import {
    changeNoteTaskDateOnServer,
    changeProgressColumn,
    createNoteTaskOnServer,
    deleteNoteTaskOnServer,
    editNewTaskTempName, editTaskSeconds,
    editTaskTempName,
    getNoteTasksByProgressId,
    toggleIsContextMenuOpened,
    toggleIsTaskEditing, updateNoteTaskSecondsOnServer,
    updateTaskNameOnServer
} from "../../redux/progress-reducer";


const mapStateToProps = (state) => {
    return{
        columns: state.progressPage.columns
    }
}

const mapDispatchToProps = {
    getNoteTasksByProgressId,
    changeProgressColumn,
    toggleIsContextMenuOpened,
    toggleIsTaskEditing,
    editTaskTempName,
    updateTaskNameOnServer,
    deleteNoteTaskOnServer,
    editNewTaskTempName,
    createNoteTaskOnServer,
    changeNoteTaskDateOnServer,
    editTaskSeconds,
    updateNoteTaskSecondsOnServer
};

class ProgressContainer extends Component{
    componentDidMount() {
        this.props.columns.forEach(column => {
            this.props.getNoteTasksByProgressId(column.id);
        });
    }

    render() {
        return <Progress {...this.props}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressContainer);