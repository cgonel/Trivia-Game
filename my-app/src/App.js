import React from 'react';
import he from 'he';
import { nanoid } from 'nanoid';
import './css/App.css';
import blob1 from '../src/media/blob1.png';
import blob2 from '../src/media/blob2.png';
import Trivia from './components/Trivia';
import Confetti from 'react-confetti';
import MyTimer from './components/Timer'
import {Button} from './Home.js'

export default function App(){
    const [triviaData, setTriviaData] = React.useState([]);
    const [triviaGame, setTriviaGame] = React.useState([]);
    const [endGame, setEndGame] = React.useState({
        results: 0, 
        isDone: false,
    });
    const [time, setTime] = React.useState(timerExpiry())

    // fetches API data
    React.useEffect(() => {
        fetchTriviaData();
    }, [])

    // sets the trivia game
    React.useEffect(() => {
        function concatAnswers(correct_answer, incorrect_answers) {
            // inserts the correct answer at a random position in the answers array
            const randomPosition = Math.floor(Math.random() * incorrect_answers.length);
            let answers = incorrect_answers;
            answers.splice(randomPosition, 0, correct_answer);
            answers = setAnswers(correct_answer, answers);
            return answers;
        }

        setTriviaGame(triviaData.map(trivia => {
            return {
                question: he.decode(trivia.question),
                answers: concatAnswers(trivia.correct_answer, trivia.incorrect_answers),
            }
        }))
    }, [triviaData])

    // when game is done, verify answers
    React.useEffect(() => {
        if(endGame.isDone){
            setTriviaGame(prevData => prevData.map(trivia => {
                return {...trivia, answers: checkAnswers(trivia.answers)}
            })) 
        }
    }, [endGame])

    // changes endGame state to store correct answers count
    React.useEffect(() => {
        if(endGame.isDone) {
            let correctAnswerCount = 0;
            triviaGame.forEach(trivia => {
                trivia.answers.forEach(answer => {
                    if (answer.isCorrectAnswer && answer.isSelected) {
                        correctAnswerCount++;
                    }
                })
            })
            setEndGame({...endGame, results: correctAnswerCount})
        } 
    }, [triviaGame])

    // resets endGame state when a new game is generated
    React.useEffect(() => {
        setEndGame({results: 0, isDone: false});
    }, [triviaData])

    React.useEffect(() => {
        if (!endGame.isDone) {
            // setTime(timerExpiry())
        }
    }, [endGame])

    function fetchTriviaData() {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        .then(data => data.json())
        .then(data => setTriviaData(data.results));
    }

    function setAnswers(correct_answer, answers) {
        // sets extra data to determine score at end of the game
        let answer = answers.map(answer => (
            answer === correct_answer ? 
            {
                id: nanoid(), 
                answer: answer, 
                isCorrectAnswer: true,
                isSelected: false,
                selectedIsIncorrect: false  
            } : 
            {
                id: nanoid(), 
                answer: answer, 
                isCorrectAnswer: false,
                isSelected: false,
                selectedIsIncorrect: false  
            }
        ));

        return answer;
    }

    // selects an answer
    function handleAnswerClick(question, id){
        setTriviaGame(prevData => prevData.map(trivia => (
            trivia.question === question ?
            // change answer selected in answers array
            {...trivia, answers: selectAnswer(id, trivia.answers)} :
            trivia
        )))
    }

    function selectAnswer(id, answers){
        // only one answer can be selected at a time
        answers.map(answer => (
            answer.id === id ? answer.isSelected = true : answer.isSelected = false
        ))
        return answers
    }

    function endTheGame() {
        setEndGame(prevData => (
            {...prevData, isDone: true}
        ))
    }

    // checks for erroneous answers
    function checkAnswers(answers) {
        let answerResult = answers.map(answer => {
            if (!answer.isCorrectAnswer && answer.isSelected){
                return { ...answer, selectedIsIncorrect: true };
            } else {
                return answer;
            }
        })
        return answerResult
    }
    
    // resets the trivia data and the endGame state
    function replayGame() {
        fetchTriviaData();
    }

    function timerExpiry() {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 59); 
        return time;    
    }

    function replayGame(e){
        e.preventDefault()
        window.location.reload();
    }
    
    const triviaElements = triviaGame.map(trivia => {
        return <Trivia 
                    key={trivia.question}
                    question={trivia.question} 
                    answers={trivia.answers}
                    handleAnswerClick={handleAnswerClick}
                    endGame={endGame.isDone}
                />
    })

    return (
        <main>
            { endGame.isDone && endGame.results === 5 && <Confetti />}
            <img className="yellowBackground" src={blob1} alt="yellow background"/>
            <img className="blueBackground" src={blob2} alt="blue background"/>
            <div className="trivia">
                <MyTimer 
                    expiryTimestamp={time} 
                    endGame={endGame} 
                    endTheGame={endTheGame}
                />
                {triviaElements}
                <div style={{textAlign: "center"}}>
                    {endGame.isDone && <p className="score">You scored {endGame.results} / 5 correct answers</p>}
                    <Button onClick={endGame.isDone ?  (e) => replayGame(e) : endTheGame}> 
                        {endGame.isDone ? "Play again" : "Check answers"}
                    </Button>
                </div>
            </div>
        </main>
    )
}