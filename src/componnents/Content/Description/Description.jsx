import s from './Description.module.css'
import DescriptionNav from "./DescriptionNav/DescriptionNav"

const Description = () => {
    return (
        <div id="description" class={s.description}>
            <div class={s.description_text}>
                <p>   Curabitur sagittis nibh a arcu tincidunt feugiat. Cras ultricies vestibulum enim ac hendrerit. Nulla neque lacus, pulvinar rhoncus arcu vitae, dapibus commodo nulla. Nam vehicula eleifend sapien, in luctus neque tincidunt eu. Aenean eget vehicula magna, ut lobortis eros. Pellentesque ultrices odio arcu, quis iaculis felis laoreet et. Vivamus maximus rhoncus nisi et ullamcorper. Etiam gravida justo sed ante tempor volutpat nec nec sem. Donec sagittis odio id massa hendrerit molestie. Sed mi dui, vestibulum sed laoreet at, egestas eu tortor. Ut auctor nulla neque, ut rhoncus risus malesuada nec. Integer bibendum ultrices mauris vitae tempus. Morbi nisi lacus, malesuada quis mi dignissim, cursus rutrum turpis. Ut a massa aliquet, suscipit erat ut, lobortis ante. Mauris non arcu ante.</p>
            </div>
            <div class={s.conteiner_nav}>
                <div class={s.description_nav}>
                    <DescriptionNav name="Notes" href="#" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus" />
                    <DescriptionNav name="Matrix" href="#" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus" />
                    <DescriptionNav name="Prgress" href="#" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus" />
                    <DescriptionNav name="Statistics" href="#" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus" />
                </div>
            </div>
        </div>
    );
}

export default Description;