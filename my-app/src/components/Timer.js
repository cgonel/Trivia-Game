import React from 'react';
import { useTimer } from 'react-timer-hook';


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
        <h1 
            className="timer"
            style={{color: seconds < 10 && "red"}}
        >
            {minutes}:{seconds < 10 ? "0" + seconds : seconds}
        </h1>
    )
}