import s from "./Category.module.css";
import plus from "../../../../img/plus.png";
import pen from "../../../../img/pen.png";
import bucket from "../../../../img/bucket.png";
import Note from "./Note/Note";


const Category = (props) => {
    function setActive(e){
        props.setActive(props.id);
    }

    let notes = props.notes.map(note => {
        return <Note {...note} openNote={props.openNote} />
    });
    return (
        <div className={s.category}>
            <div className="blue"></div>
            <div className={s.plus}>
                <div className={s.text} onClick={setActive}>{props.name}</div>
                <div><img className={s.icon} src={plus} /></div>
                <div><img className={s.icon} src={pen} /></div>
                <div><img className={s.icon} src={bucket} /></div>
            </div>
            <div></div>
            <div className={`${s.list} scroll ${props.isActive ? s.active : s.inactive}`}>
                <div></div>
                <div>
                    {notes}
                </div>
            </div>
        </div>
    );
}

export default Category;