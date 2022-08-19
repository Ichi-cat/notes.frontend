import s from './NoteList.module.css'
import Category from "./Category/Category";
import EmptyCategory from "./EmptyCategory/EmptyCategory";
import ColorModule from "./ColorModule/ColorModule";
import {useState} from "react";

const NoteList = (props) => {
    const [newCategoryColor, setNewCategoryColor] = useState('blue');

    const createCategoryOnKeyPress = (e) => {
        if(e.charCode === 13){
            props.createCategory(props.tempCategoryName, newCategoryColor);
        }
    };
    const updateCategoryNameOnInput = (e) => {
        props.updateCategoryTempName(e.currentTarget.value);
    }
    let categories = props.categories.map((category, id) => {
        return <Category category={category}
                         toggleIsCategoryFetching={props.toggleIsCategoryFetching}
                         setNoteDetails={props.setNoteDetails}
                         toggleIsChanging={props.toggleIsChanging}
                         updateCurrentCategoryNameTemp={props.updateCategoryTempNameById}
                         activeNoteInput={props.activeNoteInput}
                         updateNoteTempName={props.updateNoteTempName}
                         addNote={props.addNote}
                         toggleNoteIsChanging={props.toggleNoteIsChanging}
                         updateTempNoteName={props.updateTempNoteName}
                         editNoteName={props.editNoteName}
                         deleteNote={props.deleteNote}
                         key={id}
                         toggleDetailsIsDisabled={props.toggleDetailsIsDisabled}
                         isCategoryFetching={props.onDownloadCategoryIds.some(id => id === category.id)}
                         setCategoryNotes={props.setCategoryNotes}
                         activeCategories={props.activeCategories}
                         setActive={props.setCategoryActive}
                         updateCategory={props.updateCategory}
                         deleteCategoryFromServer={props.deleteCategoryFromServer}

                         openNote={props.openNote}
                         fetchNotes={props.fetchNotes}
                         addNoteToServer={props.addNoteToServer}
                         updateNoteNameOnServer={props.updateNoteNameOnServer}
                         deleteNoteFromServer={props.deleteNoteFromServer}
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
                    <div className={s.pre_button}>
                        <input className={s.button}
                                value={props.tempCategoryName}
                                placeholder="+ add category"
                                onKeyPress={createCategoryOnKeyPress}
                                onChange={updateCategoryNameOnInput} />
                        <ColorModule chosenColor={newCategoryColor} setColor={setNewCategoryColor}/>
                    </div>
                </>
                }
            </div>
        </div>
    );
}

export default NoteList;