import s from './Header.module.css'
import {NavLink, Route, Router, Routes} from "react-router-dom";
import LoginButton from "./LoginButton";

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.header_inner}>
                <div className={s.header_logo}>Note</div>
                <div className={s.nav}>
                    <NavLink className={s.nav_link} to="/home">home</NavLink>
                    <NavLink className={s.nav_link} to="/notes">notes</NavLink>
                    <NavLink className={s.nav_link} to="/matrix">matrix</NavLink>
                    <NavLink className={s.nav_link} to="/progress">progress</NavLink>
                    <LoginButton className={s.nav_link}/>
                </div>
            </div>
    </header>
    );
}

export default Header;