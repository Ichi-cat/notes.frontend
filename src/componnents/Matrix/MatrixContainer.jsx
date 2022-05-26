import React from "react";
import Matrix from "./Matrix";
import {connect} from "react-redux";
import {setAnimationActionCreator} from "../../redux/matrix-reducer";


const mapStateToProps = (state) => {
    return{
        blocks: state.matrixPage.blocks,
        isFetching: state.matrixPage.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setActive: (index, isActive) => {
            dispatch(setAnimationActionCreator(index, isActive));
        }
    }
}


class MatrixContainer extends React.Component{
    render(){
        return (
            <Matrix {...this.props} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatrixContainer);