import s from './NoteList.module.css'
import Category from "./Category/Category";

const NoteList = (props) => {
    // props.addCategory();
    // console.log(props);

    // let notes = props.categories.map(category => {
    //     return <>
    //         <div>
    //             {category.notes.map(note =>{
    //                 return <Note name={note.name}/>
    //             })}
    //         </div>
    //     </>
    // });

    let categories = props.categories.map((category, id) => {
        return <Category id={category.id} name={category.name} isActive={category.isActive} notes={category.notes} setActive={props.setActive} key={id} />
    });

    return (
        <div>
            <div className={s.categorys}>
                {categories}
                <div><input className={s.button} placeholder="+ add category"/></div>
            </div>
        </div>
    );
}

export default NoteList;