import React from 'react';

export function Timer(props) {
    const [seconds, setSeconds] = React.useState(props.seconds);
    const [isActive, setIsActive] = React.useState(props.isActive);

    React.useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const format = (totalSeconds) => {
        const isNegative = totalSeconds < 0;
        const absSeconds = Math.abs(totalSeconds);
        const mins = Math.floor(absSeconds / 60);
        const secs = absSeconds % 60;

        const paddedMins = String(mins).padStart(1, '0');
        const paddedSecs = String(secs).padStart(2, '0');

        return `${isNegative ? '-' : ''}${paddedMins}:${paddedSecs}`;
    }

    return (
        <td>
            <div className="timer">
                {isActive ?
                    (seconds > 0 ?
                        <b><div className="time">
                            {format(seconds)}
                        </div></b> :
                        <b><div className="negative-time">
                            {format(seconds)}
                        </div></b>
                    )
                    :
                    <div>
                        {format(seconds)}
                    </div>
                }
            </div>
        </td>
    )
}