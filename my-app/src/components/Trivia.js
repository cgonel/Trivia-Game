import React from 'react';
import he from 'he';

export default function Trivia(props){
    const style = {
        backgroundColor: "#D6DBF5",
        border: "none"
    }

    // @ change style when isCorrect true or false
    const answerElements = props.answers.map(answer => {
        return ( 
            <div 
                className="individualAnswer" 
                key={answer.id}
                onClick={() => props.handleAnswerClick(props.question, answer.id)}
                style={ answer.isSelected ? style : {}}
                // style={ answer.isCorrect ? {backgrounColor: "#94D7A2"} : {backgrounColor: "#F8BCBC"}}
                // style={{backgrounColor: "#94D7A2"}} 
            >
                {/* { answer.isCorrect ? console.log(true) : console.log(false)} */}
                {he.decode(answer.answer)}
            </div>
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