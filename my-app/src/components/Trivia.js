import React from 'react';
import he from 'he';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Question = styled.h2`
    font-family: 'Karla', sans-serif;
    font-size: 16px;
`

const Answer = styled.div`
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 11px;
    text-align: center;
    margin: 0px 12px 10px 0px;
    padding: 5px 10px;
    border: solid 1px #293264;
    border-radius: 8px;
    cursor: pointer;
    ${props => props.endGame && `opacity: 0.5;`}
    ${props => props.isSelected &&  `background-color: #D6DBF5; border: none;`}
    ${props => props.correctAnswer &&  `background-color: #94D7A2; border: none; opacity: 1;`}
    ${props => props.incorrectAnswer &&  `background-color: #F8BCBC; border: none;`}
`

export default function Trivia(props){
    const answerElements = props.answers.map(answer => {
        // style of answers changes based on if game is ended or not
        return (
            <Answer 
                key={answer.id}
                endGame={props.endGame}
                isSelected={answer.isSelected} 
                correctAnswer={props.endGame ? answer.isCorrectAnswer : false}
                incorrectAnswer={answer.selectedIsIncorrect}
                onClick={ () => props.handleAnswerClick(props.question, answer.id)}
            >
                {he.decode(answer.answer)}
            </Answer>
        )
    })

    function Answers({children}) {
        return (
            <span
                style={{
                    margin: '0 10px 0 0',
                    paddingBottom: "20px",
                }}
            >
                {children}
            </span>
        )    
    }

    return (
        <div>
            <Question>{props.loading ? <Skeleton height={20}/> : props.question}</Question>
            <div className={props.loading ? "" : "answers"} >
                {props.loading ? <Skeleton count={4} inline width={175} height={25} borderRadius={10} wrapper={Answers}/> : answerElements}
            </div> 
            <hr/>
        </div>
    )
}