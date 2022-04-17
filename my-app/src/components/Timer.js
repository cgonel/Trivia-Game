import React from 'react';
import { useTimer } from 'react-timer-hook';


export default function MyTimer({ expiryTimestamp, endGame }) {
    // make timer start only when page is loaded
    React.useEffect(() => {
        if (endGame.isDone) {
            pause()
        } else {
            restart(expiryTimestamp)
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
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    return (
        <h1 
            className="timer"
            style={{color: seconds < 10 && "red"}}
        >
            {minutes}:{seconds}
        </h1>
    )
}