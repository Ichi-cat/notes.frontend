import s from "./Category.module.css";
import plus from "../../../../img/plus.png";
import pen from "../../../../img/pen.png";
import bucket from "../../../../img/bucket.png";
import Note from "./Note/Note";
import {CreateNoteVm, UpdateCategoryVm} from "notesApiClient";
import {categoryApi, noteApi} from "../../../../redux/apiClients";


const Category = (props) => {
    function toggleIsCategoryFetching(isFetching, id){
        props.toggleIsCategoryFetching(isFetching, id);
    }

    const toggleIsChanging = () => {
        props.toggleIsChanging(props.category.id, true);
    }

    const editCategoryOnKeyPress = (e) => {
        if(e.charCode === 13){
            let updateCategoryVm = new UpdateCategoryVm();
            updateCategoryVm.id = props.category.id;
            updateCategoryVm.name = props.category.tempName;
            let updateCategoryOptions = {
                body: updateCategoryVm
            };

            categoryApi.updateCategory("1.0", updateCategoryOptions, (error, data, response) => {
                props.editCategory(props.category.id);
                props.toggleIsChanging(props.category.id, false);
            });
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
            toggleIsCategoryFetching(true, props.category.id);
            noteApi.getNotesByCategoryId(props.category.id, "1.0", (error, data, response) => {
                props.setCategoryNotes(props.category.id, data.notes);
                toggleIsCategoryFetching(false, props.category.id);
                props.setActive(props.category.id);
            });
        }
        props.activeNoteInput(props.category.id);
    }

    const addNoteOnClick = (e) => {
        if(e.charCode === 13) {
            let createNoteVm = new CreateNoteVm();
            createNoteVm.name = props.category.noteTempName;
            createNoteVm.text = "";
            createNoteVm.categoryId = props.category.id;
            let opts = {
                body: createNoteVm
            }
            noteApi.createNote("1.0", opts, (error, data, response) => {
                props.addNote(props.category.id, response.body);
            });
        }
    }
    const deleteCategory = () => {
        categoryApi.deleteCategory(props.category.id, "1.0", (error, data, response) => {
            props.deleteCategory(props.category.id);
        })
    }
    let notes = props.category.notes.map(note => {
        return <Note {...note}
                     currentCategory={props.category.id}
                     openNote={props.openNote}
                     toggleNoteIsChanging={props.toggleNoteIsChanging}
                     updateTempNoteName={props.updateTempNoteName}
                     editNoteName={props.editNoteName}
                     deleteNote={props.deleteNote}
                     toggleDetailsIsDisabled={props.toggleDetailsIsDisabled} />
    });
    return (
        <div className={s.category}>
            <div className="blue"></div>
            {!props.isCategoryFetching ? 
            <div className={s.plus}>
                {!props.category.isChanging ? <>
                        <div className={s.text} onClick={() => {
                            if(!props.category.isActive) {
                                toggleIsCategoryFetching(true, props.category.id);
                                noteApi.getNotesByCategoryId(props.category.id, "1.0", (error, data, response) => {
                                    props.setCategoryNotes(props.category.id, data.notes);
                                    toggleIsCategoryFetching(false, props.category.id);
                                    props.setActive(props.category.id);
                                });
                            } else props.setActive(props.category.id);
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