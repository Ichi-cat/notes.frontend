import s from '../Description.module.css'

const DescriptionNav = (props) => {
    return (
        <div>
            <a class={s.desc_btn} href={props.href}>{props.name}</a><br />
            <p class={s.btn_info}>{props.desc}</p>
        </div>
    );
}

export default DescriptionNav;