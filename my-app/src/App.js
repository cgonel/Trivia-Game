import React from 'react';
import he from 'he';
import { nanoid } from 'nanoid';
import produce from "immer"
import './css/App.css';
import blob1 from '../src/media/blob1.png';
import blob2 from '../src/media/blob2.png';
import Trivia from './components/Trivia';

export default function App(){
    const [triviaData, setTriviaData] = React.useState([]);
    const [triviaGame, setTriviaGame] = React.useState([]);
    const [endGame, setEndGame] = React.useState({
        results: 0, 
        endGame: false,
    });

    // fetches API data
    React.useEffect(() => {
        // function concatAnswers(correct_answer, incorrect_answers) {
        //     // inserts the correct answer at a random position in the answers array
        //     const randomPosition = Math.floor(Math.random() * incorrect_answers.length);
        //     let answers = incorrect_answers;
        //     answers.splice(randomPosition, 0, correct_answer);
        //     answers = setAnswers(answers);
        //     return answers;
        // }

        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        .then(data => data.json())
        .then(data => setTriviaData(data.results));
        // .then(data => setTriviaData(data.results.map(trivia => {
        //     return {...trivia, answers: concatAnswers(trivia.correct_answer, trivia.incorrect_answers)}
        // })));
    },[])

    React.useEffect(() => {
        function concatAnswers(correct_answer, incorrect_answers) {
            // inserts the correct answer at a random position in the answers array
            const randomPosition = Math.floor(Math.random() * incorrect_answers.length);
            let answers = incorrect_answers;
            answers.splice(randomPosition, 0, correct_answer);
            answers = setAnswers(answers);
            return answers;
        }

        setTriviaGame(triviaData.map(trivia => {
            return {question: trivia.question,
            answers: concatAnswers(trivia.correct_answer, trivia.incorrect_answers),
            correct_answer: trivia.correct_answer}
        }))
    }, [triviaData])

    function setAnswers(answers) {
        // sets an id, a bool 'isSelected', a bool 'isCorrect' for each answer
        let answer = answers.map(answer => ({
            id: nanoid(), 
            answer: answer, 
            isSelected: false, 
            isCorrect: null
        }));

        return answer;
    }

    function handleAnswerClick(){
    // function selectAnswer(question, id){
        // setTriviaGame(produce((draft) => {
        //     const trivia = draft.find((trivia) => trivia.question === question);

        //     // unselect previously selected answer
        //     const prevAnswer = trivia.answers.find((answer) => answer.isSelected === true);
        //     if(prevAnswer){
        //     prevAnswer.isSelected = false;
        //     }

        //     // select answer
        //     const answer = trivia.answers.find((answer) => answer.id === id);
        //     answer.isSelected = !answer.isSelected;

        // }))
        setTriviaData(prevData => prevData.map(trivia => {
            trivia.question == question ?
            // change answer 
            selectAnswer(trivia) :
            trivia
        }))
    }

    function selectAnswer(trivia){
        trivia.answers.map(answer => {

        })
    }

    // function checkAnswers() {
    //     console.log("Check answers")

        // setTriviaData
        // triviaData.forEach => answers.forEach =>
        // if (answer == trivia.correctAnswer) => answer.isCorrect = true
        // if(answer.isSelected == true && answer.answer != trivia.correctAnswer) => answer.isCorrect = false // count++

    //     setTriviaData(produce(draft) => {

    //     })

    //     console.log(count)

    // }

    const triviaElements = triviaGame.map(trivia => {
        return <Trivia 
                    key={trivia.question}
                    // check={endGame.check}
                    question={he.decode(trivia.question)} 
                    answers={trivia.answers} 
                    selectAnswer={selectAnswer}
                />
    })

    return (
        <main>
            <img className="yellowBackground" src={blob1} alt="yellow background"/>
            <img className="blueBackground" src={blob2} alt="blue background"/>
            <div className="trivia">
                {triviaElements}
                <div style={{textAlign: "center"}}>
                    <button className="trivia--check" 
                    // onClick={checkAnswers}
                    >
                    Check answers
                    </button>
                </div>
            </div>
        </main>
    )
}