import s from './Intro.module.css'

const Intro = () => {
    return (
        <main>
                <div className={s.intro_inner}>
                    <h1 className={s.intro_title}>Your note</h1>
                    <h2 className={s.intro_subtitle}>Manage your time</h2>
                    <a className={s.btn} href="#description">Learn more</a>
                </div>
        </main>
    );
}

export default Intro;