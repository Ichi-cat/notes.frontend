import s from './NoteList.module.css'
import Category from "./Category/Category";
import EmptyCategory from "./EmptyCategory/EmptyCategory";
import {categoryApi} from "../../../redux/apiClients";
import {CreateCategoryVm} from "notesApiClient";

const NoteList = (props) => {
    const createCategoryOnKeyPress = (e) => {
        if(e.charCode === 13){
            let createCategoryVm = new CreateCategoryVm();
            createCategoryVm.name = props.tempCategoryName;
            let createCategoryOptions = {
                body: createCategoryVm
            };

            categoryApi.createCategory("1.0", createCategoryOptions, (error, data, response) => {
                props.updateCategoryNameTemp("");
                props.setCategories(props.categories.concat(
                    {
                        id: response.body.id,
                        name: props.tempCategoryName ? props.tempCategoryName : "No name",
                        isActive: false,
                        notes: []
                    }
                ))
            });
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
debugger;
    let categories = props.categories.map((category, id) => {
        return <Category category={category}
                         setActive={props.setActive}
                         openNote={props.openNote}
                         toggleIsChanging={props.toggleIsChanging}
                         updateCurrentCategoryNameTemp={props.updateCurrentCategoryNameTemp}
                         editCategory={props.editCategory}
                         activeNoteInput={props.activeNoteInput}
                         updateNoteTempName={props.updateNoteTempName}
                         addNote={props.addNote}
                         toggleNoteIsChanging={props.toggleNoteIsChanging}
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
                            onKeyPress={createCategoryOnKeyPress}
                            onChange={updateCategoryNameOnInput} /></div>
            </div>
        </div>
    );
}

export default NoteList;