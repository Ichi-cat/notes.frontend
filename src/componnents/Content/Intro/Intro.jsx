import s from './Intro.module.css'

const Intro = () => {
    return (
        <main>
                <div class={s.intro_inner}>
                    <h1 class={s.intro_title}>Your note</h1>
                    <h2 class={s.intro_subtitle}>Manage your time</h2>
                    <a class={s.btn} href="#description">Learn more</a>
                </div>
        </main>
    );
}

export default Intro;