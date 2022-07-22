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
        if(e.charCode === 13){
            props.updateCategory(props.category.id, props.category.tempName);
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
        props.activeNoteInput(props.category.id);
    }

    const addNoteOnClick = (e) => {
        if(e.charCode === 13) {
            props.addNoteToServer(props.category.noteTempName, props.category.id, "");
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
    const colors = ["blue", "pink", "yellow", "green", "durk_pink", "durk_yellow", "durk_green"]
    return (
        <div className={s.category}>
            <div className={colors[Math.floor(Math.random() * colors.length)]} onClick={() => {}}></div>
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
                           onKeyPress={editCategoryOnKeyPress}/>
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
                               onKeyPress={addNoteOnClick}/>
                    : null}
                    {notes}
                </div>
            </div>
        </div>
    );
}

export default Category;