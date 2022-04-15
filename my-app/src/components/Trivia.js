import React from 'react';
import he from 'he';

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
        if(props.endGame){ 
            return (
                <div
                    className="individualAnswerEndGame" 
                    key={answer.id}
                    style={ getAnswerStyle(answer) }
                >
                    {he.decode(answer.answer)}
                </div>
            )
        }else{
            return ( 
                <div 
                    className="individualAnswer" 
                    key={answer.id}
                    onClick={() => props.handleAnswerClick(props.question, answer.id)}
                    style={ answer.isSelected ? selectedAnswerStyle : {}}
                >
                    {he.decode(answer.answer)}
                </div>
            ) 
        }
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