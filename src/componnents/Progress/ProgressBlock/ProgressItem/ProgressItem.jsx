import s from './ProgressItem.module.css'
import i from '../../../../img/icon-timer.png'


const ProgressItem = () => {
    return (
        <div className={s.str}>
            <div>Lorem ipsum dolor</div>
            <a href=""><img className={s.icon_timer} src={i} /></a>
        </div>
    );
}

export default ProgressItem;