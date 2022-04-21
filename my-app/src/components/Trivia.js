import React from 'react';
import he from 'he';
import styled from 'styled-components';

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
    ${props => props.isSelected &&  `backgroundColor: "#D6DBF5";`}
    
`

export default function Trivia(props){
    const selectedAnswerStyle = {
        backgroundColor: "#D6DBF5",
        border: "none"
    }
    const correctAnswerStyle = {
        backgroundColor: "#94D7A2",
        border: "none",
        opacity: 1
    }
    const incorrectAnswerStyle = {
        backgroundColor: "#F8BCBC",
        border: "none"
    }

    function getAnswerStyle(answer) {
        if (answer.isCorrectAnswer) {
            return correctAnswerStyle;
        }
        if (answer.selectedIsIncorrect) {
            return incorrectAnswerStyle;
        }
    }

    const answerElements = props.answers.map(answer => {
        // style of answers changes based on if game is ended or not
        // if(props.endGame){ 
        //     return (
        //         <Answer
        //             key={answer.id}
        //             style={ getAnswerStyle(answer) }
        //         >
        //             {he.decode(answer.answer)}
        //         </Answer>
        //     )
        // }else{
        //     return (
        //         <Answer 
        //             key={answer.id}
        //             onClick={() => props.handleAnswerClick(props.question, answer.id)}
        //             // isSelected={backgroundColor: {answer.isSelected}}
        //             style={ answer.isSelected ? selectedAnswerStyle : {}}
        //         >
        //             {he.decode(answer.answer)}
        //         </Answer>
        //     ) 
        // }
        return (
            <Answer 
                key={answer.id}
                endGame={props.endGame}
                isSelected={answer.isSelected}
                onClick={ () => props.handleAnswerClick(props.question, answer.id)}
                // style={ answer.isSelected ? selectedAnswerStyle : {}}
            >
                {he.decode(answer.answer)}
            </Answer>
        )
    })

    return (
        <div>
            <h2 className="question">{props.question}</h2>
            <div className="answers">
                {answerElements}
            </div>
            <hr/>
        </div>
    )
}