import React from 'react';

export function Timer(props) {
    const [seconds, setSeconds] = React.useState(0);
    const [isActive, setIsActive] = useState(false);

    React.useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setIsActive(false);
        setSeconds(props.seconds);
    };

    return (
        <div className="timer">
            <div className="time">
                {Math.trunc(seconds/60)}:{seconds%60}
            </div>
        </div>
    )
}