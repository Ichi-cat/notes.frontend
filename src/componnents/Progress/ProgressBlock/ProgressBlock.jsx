import ProgressItem from "./ProgressItem/ProgressItem";
import s from './ProgressBlock.module.css'

const ProgressBlock = (props) => {
    return (
        <div>
            <div className={`${s.topic} ${props.topic_color}`}>planned</div>
            <div className={`${s.square} ${props.color}`}>
                <ProgressItem />
                <ProgressItem />
                <ProgressItem />
                <ProgressItem />
            </div>
        </div>
    );
}

export default ProgressBlock;