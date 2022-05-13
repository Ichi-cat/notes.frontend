import MatrixBlock from "./MatrixBlock/MatrixBlock";
import s from './Matrix.module.css'

const Matrix = () => {
    return (
        <main>
            <div className={s.block}>
                <div></div>
                <div className={s.topic}>Urgent</div>
                <div className={s.topic}>Not urgent</div>
                <div className={s.topic}>
                    <div className={s.vertical}>important</div>
                </div>
                <MatrixBlock color="pink" />
                <MatrixBlock color="yellow" />
                <div className={s.topic}>
                    <div className={s.vertical}>unimportant</div>
                </div>
                <MatrixBlock color="green" />
                <MatrixBlock color="blue" />
            </div>
        </main>
    );
}

export default Matrix;