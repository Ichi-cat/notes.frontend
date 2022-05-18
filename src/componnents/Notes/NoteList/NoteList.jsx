import s from './NoteList.module.css'
import Category from "./Category/Category";
import EmptyCategory from "./EmptyCategory/EmptyCategory";

const NoteList = (props) => {
    const createCategoryOnKeyPress = (e) => {
        if(e.charCode === 13){
            props.createCategory();
        }
    };
    const updateCategoryNameOnInput = (e) => {
        props.updateCategoryNameTemp(e.currentTarget.value);
    }

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
        return <Category id={category.id}
                         name={category.name}
                         isActive={category.isActive}
                         notes={category.notes}
                         setActive={props.setActive}
                         openNote={props.openNote}
                         key={id} />
    });

    return (
        <div>
            <div className={s.categorys}>
                {/*{categories}*/}
                {props.isFetching ? <EmptyCategory/> : categories}
                <div><input className={s.button}
                            value={props.tempCategoryName}
                            placeholder="+ add category"
                            onKeyPress={(e) => console.log(e)}
                            onChange={updateCategoryNameOnInput} /></div>
            </div>
        </div>
    );
}

export default NoteList;