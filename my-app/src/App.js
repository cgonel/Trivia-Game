import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './css/App.css';
import Home from './routes/Home'
import TriviaGame from './routes/TriviaGame'

export default function App(){
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="game" element={<TriviaGame />} />
                <Route 
                    path="*" 
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </div>
    )
}