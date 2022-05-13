import MatrixItem from "./MatrixItem/MatrixItem";


const MatrixBlock = (props) => {
    return (
        <div className={props.color}>
            <MatrixItem/>
            <MatrixItem/>
        </div>
    );
}

export default MatrixBlock;