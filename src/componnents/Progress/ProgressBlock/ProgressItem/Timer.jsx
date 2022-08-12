import React, {useState} from "react";
import icon_timer from "../../../../img/icon-timer.png";
import {updateNoteTaskSecondsOnServer} from "../../../../redux/progress-reducer";



class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            seconds: null,
            stopWatch: null
        };
    }

    startStopWatch(){
        let stopWatch = setInterval(() => {
            let seconds = this.props.seconds + 1;
            console.log(seconds);
            this.props.editTaskSeconds(this.props.columnId, this.props.taskId, seconds);
        }, 1000);
        return this.setState({stopWatch: stopWatch, seconds: 0})
    };
    pauseStopWatch(){
        clearInterval(this.state.stopWatch);
        this.setState({stopWatch: null})
        this.props.updateNoteTaskSecondsOnServer(this.props.columnId, this.props.taskId, this.props.seconds);
    };

    toggleIsCounting = () => {
        this.state.stopWatch === null ?
            this.startStopWatch():
            this.pauseStopWatch();
    };

    render() {
        return <img className="icon" src={icon_timer} onClick={this.toggleIsCounting}/>
    }
}









const TimerTemp = (props) => {
    const [state, setState] = useState({
        seconds: 0,
        stopWatch: null
    });
    const startStopWatch = () => {
        let stopWatch = setInterval(() => {
            let seconds = state.seconds + 1;
            console.log(state);
            setState({seconds: seconds});
        }, 1000);
        return setState({stopWatch: stopWatch, seconds: 0})
    };
    const stopStopWatch =() => {
        clearInterval(this.state.stopWatch);
    };
    // return <img className="icon" src={icon_timer} onClick={startStopWatch}/>
    return <div onClick={() => setState({seconds: state.seconds + 1})}>{state.seconds}</div>
}

export default Timer;