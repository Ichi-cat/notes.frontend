


const MatrixItem = (props) => {
    const setActive = () => {
        props.setActive(props.index, true);
    }
    return (
        <div onClick={setActive}>Lorem ipsum dolor sit amet</div>
    );
}

export default MatrixItem;