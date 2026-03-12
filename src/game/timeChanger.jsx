import React from "react";
import Button from "react-bootstrap/Button"

export function TimeChanger(props) {
    const [time, setTime] = React.useState(props.time);
    const formatTime = (totalSeconds) => {
        const isNegative = totalSeconds < 0;
        const absSeconds = Math.abs(totalSeconds);
        const mins = Math.floor(absSeconds / 60);
        const secs = absSeconds % 60;

        const paddedMins = String(mins).padStart(1, '0');
        const paddedSecs = String(secs).padStart(2, '0');

        return `${isNegative ? '-' : ''}${paddedMins}:${paddedSecs}`;
    }
    const submit = props.onSubmit;
    return (
        <div className="text-center d-flex justify-content-center flex-column">
            <div className="input-group">
                <Button className="Button" variant="primary" size="sm" onClick={() => setTime(time + 15)}>+</Button>
                <input type="text" id="time" value={formatTime(time)} readOnly className="form-control text-center" style={{ width: '80px' }} />
                <Button className="Button" variant='primary' size='sm' onClick={() => setTime(time - 15)} disabled={!time}>-</Button>
            </div>
            <Button className="Button d-block mt-1"
                variant='primary'
                size='sm'
                onClick={() => submit(time)}>
                Change Time</Button>
        </div>
    )
}