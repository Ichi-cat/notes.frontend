import MatrixItem from "./MatrixItem/MatrixItem";
import s from './MatrixBlock.module.css'


const MatrixBlock = (props) => {
    return (
        <div className={`${props.color} ${s.box} ${props.blockName} scroll ${props.scrollColor} 
                ${props.block.isActive ? "anim" : "hide"}`}>
            <MatrixItem
                setActive={props.setActive}
                index={props.index}
            />
            <MatrixItem/>
        </div>
    );
}

export default MatrixBlock;