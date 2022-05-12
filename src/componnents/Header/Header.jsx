import s from './Header.module.css'
import {NavLink, Route, Router, Routes} from "react-router-dom";

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
                    <NavLink className={s.nav_link} to="/statistic">Statistics</NavLink>
                    <NavLink className={s.nav_link} to="/registration">Login</NavLink>
                </div>
            </div>
    </header>
    );
}

export default Header;