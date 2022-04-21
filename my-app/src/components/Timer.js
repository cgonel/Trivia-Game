import React from 'react';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components';

let seconds;

const Timer = styled.h1`
    font-family: 'Inter', sans-serif;
    font-weight: bold;
    color: ${props => props.color};
`

export default function MyTimer({ expiryTimestamp, endGame, endTheGame }) {
    // stops timer when game is done
    React.useEffect(() => {
        if (endGame.isDone) {
            pause()
        }
    }, [endGame])

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: endTheGame });

    return (
        <Timer color={seconds < 10 ? 'red' : ''}>
            {minutes}:{seconds < 10 ? "0" + seconds : seconds}
        </Timer>
       
    )
}