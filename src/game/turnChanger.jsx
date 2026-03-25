import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

export function TurnChanger(props) {
    const setTurn = props.onChange;
    const check = props.checker;
    const [open, setOpen] = React.useState(false);



    const firstAvailable = () => {
        for (let i = 1; i <= 4; i++) {
            if (check(i)) {
                return i;
            }
        }
        return 1;
    }

    const [turnSelected, setTurnSelected] = React.useState(firstAvailable);

    React.useEffect(() => {
        if (!check(turnSelected)) {
            setTurnSelected(firstAvailable);
        }
    }, [check, turnSelected]);

    React.useEffect(() => {
        if (open) {
            const initial = firstAvailable();
            setTurnSelected(initial);
        }
    }, [open]);

    const turnSlots = [
        { name: '1st', value: 1 },
        { name: '2nd', value: 2 },
        { name: '3rd', value: 3 },
        { name: '4th', value: 4 },
    ]



    return (
        <>{open ?
            <div className="d-flex justify-content-center gap-4 mt-4 flex-column">
                <ButtonGroup className="ms-auto w-100">
                    {turnSlots.map((turnSlot, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`turn-radio-${idx}`}
                            type="radio"
                            variant="outline-success"
                            value={turnSlot.value}
                            checked={turnSelected === turnSlot.value}
                            disabled={!check(turnSlot.value)}
                            onChange={(e) => {
                                setTurnSelected(Number(e.currentTarget.value));
                                console.log("changed")
                            }}>
                            {turnSlot.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                <Button className="Button ms-auto w-100"
                    variant='success'
                    size='sm'
                    disabled={!check(turnSelected)}
                    onClick={() => {
                        setTurn(turnSelected);
                        setOpen(!open); 
                    }}
                >Set Turn Order</Button>
            </div>
            :
            <Button className="Button "
                variant='success'
                size='sm'
                onClick={() => setOpen(!open)}
            >Set Turn Order</Button>
        }
        </>)
}