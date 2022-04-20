import React from 'react';
import './css/App.css';
import blob1 from '../src/media/blob1.png';
import blob2 from '../src/media/blob2.png';

export default function App() {
    return (
        <main>
            <img className="yellowBackground" src={blob1} alt="yellow background"/>
            <img className="blueBackground" src={blob2} alt="blue background"/>
            <div className="main-page">
                <h1 className="play">Quizzical</h1>
                <button className="trivia--check">Start quiz</button>
            </div>
        </main>
    )

}