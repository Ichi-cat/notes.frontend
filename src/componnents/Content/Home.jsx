import Intro from "./Intro/Intro";
import Description from "./Description/Description"

const Home = () => {
    return (
        <div>
            <div className="background"></div>
            <Intro />
            <Description />
        </div>
    );
}

export default Home;