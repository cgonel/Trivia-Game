import React from 'react';
import styled from 'styled-components';
import './css/App.css';
import blob1 from '../src/media/blob1.png';
import blob2 from '../src/media/blob2.png';

const Title = styled.h1`
    font-family: 'Karla', sans-serif;
    font-weight: bold;
`
export const Button = styled.button`
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    background-color: #4D5B9E;
    color: #F5F7FB;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
`

export default function App() {
    return (
        <main>
            <img className="yellowBackground" src={blob1} alt="yellow background"/>
            <img className="blueBackground" src={blob2} alt="blue background"/>
            <div className="main-page">
                <Title>Quizzical</Title>
                <Button>Start quiz</Button>
            </div>
        </main>
    )
}