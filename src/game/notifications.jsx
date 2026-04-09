import React from 'react';

import { GameEvent, GameNotifier } from './gameNotifier';

export function Notifications(props) {
    const userName = props.userName;
    const color = props.color;

    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        GameNotifier.addHandler(handleGameEvent);

        return () => {
            GameNotifier.removeHandler(handleGameEvent);
        };
    });

    function handleGameEvent(event) {
        setEvent([...events, event]);
    }

    function createMessageArray() {
        const messageArray = [];
        for (const [i, event] of events.entries()) {
            let message = 'unknown';
            if (event.type === GameEvent.Pass) {
                message = `ended their turn`;
            } else if (event.type === GameEvent.Time) {
                message = `is out of time`;
            } else if (event.type === GameEvent.System) {
                message = event.value.msg;
            } else if (event.type === GameEvent.Turn) {
                message = `It's your turn!`;
                messageArray.push(
                    <div key={i} className='event'>
                        {message}
                    </div>
                );
            }

            if (event.type !== GameEvent.Turn){
                messageArray.push(
                    <div key={i} className='event'>
                        <span className={'player-event'}>{event.from.split('@')[0]}</span>
                        {message}
                    </div>
                );
            }
        }
        return messageArray;
    }

    return (
        <div className='players text-start'>
            <div className = 'current-player'>Player:<span className={color}>{userName}</span></div>
            <div id='player-messages'>{createMessageArray()}</div>
        </div>
    )
}