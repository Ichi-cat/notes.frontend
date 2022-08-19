import {VscSymbolColor} from "react-icons/vsc";
import s from './ColorModule.module.css'
import {useState} from "react";


const ColorModule  = (props) => {
    const [isColorsOpened, toggleColorsOpened] = useState(false);
    const colors = ['pink', 'yellow', 'blue', 'green', 'red',
        'brown', 'pea', 'teal', 'indigo', 'lavender'];
    const chooseColor = (e) => {
        props.setColor(e.target.value);
    };
    const toggleColorsOpenedOnClick = (e) => {
        toggleColorsOpened(!isColorsOpened);
    };
    return (
        <div>
            <VscSymbolColor className='icon' onClick={toggleColorsOpenedOnClick}/>
            {isColorsOpened &&
                <form className={s.max_color}>
                    {colors.map(color =>
                        <input key={color} type='radio' name='color' value={color} onChange={chooseColor}
                               className={`${s.color_circle} ${color}`} checked={color === props.chosenColor}></input>)}
                </form> }
        </div>
    )
}

export default ColorModule;