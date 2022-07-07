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
                        id: response.body,
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
    let categories = props.categories.map((category, id) => {
        return <Category category={category}
                         toggleIsCategoryFetching={props.toggleIsCategoryFetching}
                         openNote={props.openNote}
                         toggleIsChanging={props.toggleIsChanging}
                         updateCurrentCategoryNameTemp={props.updateCurrentCategoryNameTemp}
                         editCategory={props.editCategory}
                         activeNoteInput={props.activeNoteInput}
                         updateNoteTempName={props.updateNoteTempName}
                         addNote={props.addNote}
                         toggleNoteIsChanging={props.toggleNoteIsChanging}
                         updateTempNoteName={props.updateTempNoteName}
                         editNoteName={props.editNoteName}
                         deleteNote={props.deleteNote}
                         deleteCategory={props.deleteCategory}
                         key={id}
                         toggleDetailsIsDisabled={props.toggleDetailsIsDisabled}
                         isCategoryFetching={props.onDownloadCategoryIds.some(id => id === category.id)}
                         setCategoryNotes={props.setCategoryNotes}
                         activeCategories={props.activeCategories}
                         setActive={props.setActive}
        />
    });

    return (
        <div>
            <div className={`${s.categorys} scroll`}>
                {props.isFetching ?
                <>
                    <EmptyCategory/>
                    <EmptyCategory/>
                    <EmptyCategory/>
                    <EmptyCategory/>
                    <EmptyCategory/>
                    <div className={`${s.but} priloader`}/>
                </> : 
                <>
                {categories}
                    <div>
                        <input className={s.button}
                                value={props.tempCategoryName}
                                placeholder="+ add category"
                                onKeyPress={createCategoryOnKeyPress}
                                onChange={updateCategoryNameOnInput} />
                    </div>
                </>
                }
            </div>
        </div>
    );
}

export default NoteList;