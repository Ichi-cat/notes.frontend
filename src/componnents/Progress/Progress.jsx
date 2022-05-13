import ProgressBlock from "./ProgressBlock/ProgressBlock";
import s from './Progress.module.css'

const Progress = () => {
    return (
        <main>
            <div className={s.block}>
                <ProgressBlock topic_color="durk_pink" color="pink" />
                <ProgressBlock topic_color="durk_yellow" color="yellow" />
                <ProgressBlock topic_color="durk_green" color="green" />
            </div>
        </main>
    );
}
export default Progress;