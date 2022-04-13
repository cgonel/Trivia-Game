import React from 'react';
import he from 'he';

export default function Trivia(props){
    const style = {
        backgroundColor: "#D6DBF5",
        border: "none"
    }
    const answerElements = props.answers.map(answer => {
        return ( 
            <div 
                className="individualAnswer" 
                key={answer.id}
                onClick={() => props.handleAnswerClick(props.question, answer.id)}
                style={ answer.isSelected ? style : {}}
            >
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