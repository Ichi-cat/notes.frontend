import s from "./Category.module.css";
import plus from "../../../../img/plus.png";
import pen from "../../../../img/pen.png";
import bucket from "../../../../img/bucket.png";
import Note from "./Note/Note";


const Category = (props) => {
    const toggleIsChanging = () => {
        props.toggleIsChanging(props.category.id, true);
    }

    const editCategoryOnKeyPress = (e) => {
        if(e.code === "Enter"){
            props.updateCategory(props.category.id, props.category.tempName);
        } else if(e.code === "Escape"){
            props.toggleIsChanging(props.category.id, false);
        }
    };

    const updateNoteTempNameOnInput = (e) => {
        props.updateNoteTempName(props.category.id, e.currentTarget.value);
    }
    const updateCurrentCategoryNameOnInput = (e) => {
        props.updateCurrentCategoryNameTemp(props.category.id, e.currentTarget.value);
    }

    const openNoteInput = () => {
        if(!props.category.isActive) {
            props.fetchNotes(props.category.id);
        }
        props.activeNoteInput(props.category.id, true);
    }

    const addNoteOnClick = (e) => {
        if(e.code === "Enter") {
            props.addNoteToServer(props.category.noteTempName, props.category.id, "");
        } else if(e.code === "Escape"){
            props.activeNoteInput(props.category.id, false);
        }
    }
    const deleteCategory = () => {
        props.deleteCategoryFromServer(props.category.id);
    }
    let notes = props.category.notes.map(note => {
        return <Note {...note}
                     currentCategory={props.category.id}
                     setNoteDetails={props.setNoteDetails}
                     toggleNoteIsChanging={props.toggleNoteIsChanging}
                     updateTempNoteName={props.updateTempNoteName}
                     editNoteName={props.editNoteName}
                     deleteNote={props.deleteNote}
                     toggleDetailsIsDisabled={props.toggleDetailsIsDisabled}
                     openNote={props.openNote}
                     updateNoteNameOnServer={props.updateNoteNameOnServer}
                     deleteNoteFromServer={props.deleteNoteFromServer}
        />
    });
    return (
        <div className={s.category}>
            <div className="blue"></div>
            {!props.isCategoryFetching ?
            <div className={s.plus}>
                {!props.category.isChanging ? <>
                        <div className={s.text} onClick={() => {
                            !props.category.isActive
                                ? props.fetchNotes(props.category.id)
                                : props.setActive(props.category.id);
                        }
                        }>{props.category.name}</div>
                        <div><img className="icon" src={plus} onClick={openNoteInput}/></div>
                        <div><img className="icon" src={pen} onClick={toggleIsChanging}/></div>
                        <div><img className="icon" src={bucket} onClick={deleteCategory}/></div>
                    </>
                    :
                    <input className={s.button}
                           value={props.category.tempName}
                           placeholder="edit category"
                           onChange={updateCurrentCategoryNameOnInput}
                           autoFocus={true}
                           onKeyDown={editCategoryOnKeyPress}/>
                }
            </div> :
            <div class={s.plus_loader}>
                <div className={s.text}>{props.category.name}</div>
                <div className="loader-1"></div>
            </div>
            }
            <div></div>
            <div className={`${s.list} scroll scroll_blue ${props.category.isActive ? s.active : s.inactive}`}>
                <div></div>
                <div>
                    {props.category.noteInputIsActive ?
                        <input className={s.button}
                               value={props.category.noteTempName}
                               placeholder="+add note"
                               onChange={updateNoteTempNameOnInput}
                               autoFocus={true}
                               onKeyDown={addNoteOnClick}/>
                    : null}
                    {notes}
                </div>
            </div>
        </div>
    );
}

export default Category;