import { useEffect, useState, useRef } from 'react';
import React from 'react';
import './index.css'
import './App.css'
import Footer from './Footer';
import Header from './Header';
const App = () => {
    const [guess, setGuess] = useState([[""], ["", ""], ["", "", ""], ["", "", "", ""], ["", "", "", "", ""]])
    const [status, setStatus] = useState([[""], ["", ""], ["", "", ""], ["", "", "", ""], ["", "", "", "", ""]])
    const [message, setMessage] = useState('')
    const [word, setWord] = useState('')
    const [currentRow, setCurrentRow] = useState(0);
    const [validGuesses, setValidGuesses] = useState([[], [], [], [], []])
    const [validAnswers, setValidAnswers] = useState([])
    const [invalidGuess, setInvalidGuess] = useState([false, false, false, false, false]);
    const [bounce, setBounce] = useState(false);
    const inputRefs = useRef(
        Array.from(
            { length: 5 }, (_, i) => Array.from({ length: i + 1 }, () => React.createRef())
        )
    );
    useEffect(() => {
        switch (currentRow) {
            case 0: inputRefs.current[0][0].current.focus(); break;
            case 1: inputRefs.current[1][0].current.focus(); break;
            case 2: inputRefs.current[2][0].current.focus(); break;
            case 3: inputRefs.current[3][0].current.focus(); break;
            case 4: inputRefs.current[4][0].current.focus(); break;
        }
    }, [currentRow])
    useEffect(() => {
        fetch('/wordle-La.txt')
            .then(res => res.text())
            .then(text => {
                const words = text.split("\n").map(w => w.trim())
                const toGuess = words.at(Math.floor(Math.random() * words.length)).trim();
                setValidAnswers(words)
                setWord(toGuess)
                console.log(toGuess);
            })
        const loadGuess = async () => {
            for (var i = 0; i < 5; i++) {
                const res = await fetch(`/wordle-${i + 1}-letter-guesses.txt`)
                const text = await res.text();
                const words = text.split("\n").map(w => w.trim());
                validGuesses[i] = words
                setValidGuesses(validGuesses);
            }
        }
        loadGuess()
    }, [])
    const handleEnter = async (e, i, j) => {
        if (e.key === 'Enter' && i != j) {
            shakeyshake(i);
        }
        if (e.key === 'Backspace' && e.target.value === "" && j > 0) {
            inputRefs.current[i][j - 1]?.current?.focus();
        }
        if (e.key === 'Enter' && i === j) {
            const trimmed = guess[i].join("").toLowerCase().trim();
            const validGuess = (validGuesses[i].includes(trimmed) || validAnswers.includes(trimmed)) && trimmed.length === (i + 1);
            console.log(trimmed);
            console.log(validGuesses[i]);
            if (!validGuess) {
                shakeyshake(i);
            } else {
                evaluate(i);
                if (i < 4) setCurrentRow(i + 1);
                else setMessage(word == trimmed ? "well done!" : word)
            }
        }
    }
    const evaluate = (row) => {
        const words = word.split("");
        const m = new Map();
        for (var j = 0; j < words.length; j++) {
            if (m.get(words[j]) === undefined) m.set(words[j], 0);
            m.set(words[j], m.get(words[j]) + 1);
        }
        for (var i = 0; i < guess[row].length; i++) {
            if (guess[row][i] === words[i]) {
                status[row][i] = "correct"
                m.set(words[i], m.get(words[i]) - 1);
            }
        }
        for (var k = 0; k < guess[row].length; k++) {
            if (m.get(guess[row][k]) !== undefined && m.get(guess[row][k]) > 0 && status[row][k] !== "correct") {
                status[row][k] = "present";
                m.set(guess[row][k], m.get(guess[row][k]) - 1);
            }
            else if (status[row][k] !== "correct") status[row][k] = "absent"
        }
        setStatus(status);
    }
    const shakeyshake = (i) => {
        var arr = [...invalidGuess]
        arr[i] = true
        setInvalidGuess(arr)
        setTimeout(() => {
            var arr = [...invalidGuess]
            arr[i] = false
            setInvalidGuess(arr)
        }, 500)
    }
    const bouncey = () => {
        setBounce(true);
        setTimeout(() => {
            setBounce(false);
        }, 500);
    }
    const handleGuess = (e, i, j) => {
        const val = e.target.value;
        if (/^[a-zA-Z]$/.test(val) || val === "") {
            const newGuess = [...guess];
            newGuess[i][j] = val;
            setGuess(newGuess);
            if (j < i && val !== "") {
                inputRefs.current[i][j + 1]?.current?.focus();
            }
        }

    }
    return (
        <>
            <Header />
            <p id = "message" className={message===""?"hidden":""}>{message}</p>
            <div className="pyramid">
                <div className="row">
                    <input type="text" autoComplete="off" ref={inputRefs.current[0][0]} disabled={currentRow !== 0} id="guess11" className={`square ${invalidGuess[0] ? 'shake' : ''}${status[0][0]}`} minLength="0" maxLength="1" value={guess[0][0]} onChange={(e) => handleGuess(e, 0, 0)} onKeyDown={(e) => handleEnter(e, 0, 0)} />
                </div>

                <div className="row">
                    <input type="text" autoComplete="off" ref={inputRefs.current[1][0]} disabled={currentRow !== 1} id="guess21" className={`square ${invalidGuess[1] ? 'shake' : ''}${status[1][0]}`} minLength="0" maxLength="1" value={guess[1][0]} onChange={(e) => handleGuess(e, 1, 0)} onKeyDown={(e) => handleEnter(e, 1, 0)} />
                    <input type="text" autoComplete="off" ref={inputRefs.current[1][1]} disabled={currentRow !== 1} id="guess22" className={`square ${invalidGuess[1] ? 'shake' : ''}${status[1][1]}`} minLength="0" maxLength="1" value={guess[1][1]} onChange={(e) => handleGuess(e, 1, 1)} onKeyDown={(e) => handleEnter(e, 1, 1)} />
                </div>

                <div className="row">
                    <input type="text" autoComplete="off" ref={inputRefs.current[2][0]} disabled={currentRow !== 2} id="guess31" className={`square ${invalidGuess[2] ? 'shake' : ''}${status[2][0]}`} minLength="0" maxLength="1" value={guess[2][0]} onChange={(e) => handleGuess(e, 2, 0)} onKeyDown={(e) => handleEnter(e, 2, 0)} />
                    <input type="text" autoComplete="off" ref={inputRefs.current[2][1]} disabled={currentRow !== 2} id="guess32" className={`square ${invalidGuess[2] ? 'shake' : ''}${status[2][1]}`} minLength="0" maxLength="1" value={guess[2][1]} onChange={(e) => handleGuess(e, 2, 1)} onKeyDown={(e) => handleEnter(e, 2, 1)} />
                    <input type="text" autoComplete="off" ref={inputRefs.current[2][2]} disabled={currentRow !== 2} id="guess33" className={`square ${invalidGuess[2] ? 'shake' : ''}${status[2][2]}`} minLength="0" maxLength="1" value={guess[2][2]} onChange={(e) => handleGuess(e, 2, 2)} onKeyDown={(e) => handleEnter(e, 2, 2)} />
                </div>

                <div className="row">
                    <input type="text" autoComplete="off" ref={inputRefs.current[3][0]} disabled={currentRow !== 3} id="guess41" className={`square ${invalidGuess[3] ? 'shake' : ''}${status[3][0]}`} minLength="0" maxLength="1" value={guess[3][0]} onChange={(e) => handleGuess(e, 3, 0)} onKeyDown={(e) => handleEnter(e, 3, 0)} />
                    <input type="text" autoComplete="off" ref={inputRefs.current[3][1]} disabled={currentRow !== 3} id="guess42" className={`square ${invalidGuess[3] ? 'shake' : ''}${status[3][1]}`} minLength="0" maxLength="1" value={guess[3][1]} onChange={(e) => handleGuess(e, 3, 1)} onKeyDown={(e) => handleEnter(e, 3, 1)} />
                    <input type="text" autoComplete="off" ref={inputRefs.current[3][2]} disabled={currentRow !== 3} id="guess43" className={`square ${invalidGuess[3] ? 'shake' : ''}${status[3][2]}`} minLength="0" maxLength="1" value={guess[3][2]} onChange={(e) => handleGuess(e, 3, 2)} onKeyDown={(e) => handleEnter(e, 3, 2)} />
                    <input type="text" autoComplete="off" ref={inputRefs.current[3][3]} disabled={currentRow !== 3} id="guess44" className={`square ${invalidGuess[3] ? 'shake' : ''}${status[3][3]}`} minLength="0" maxLength="1" value={guess[3][3]} onChange={(e) => handleGuess(e, 3, 3)} onKeyDown={(e) => handleEnter(e, 3, 3)} />
                </div>

                <div className="row">
                    <input type="text" autoComplete="off" ref={inputRefs.current[4][0]} disabled={currentRow !== 4} id="guess51" className={`square ${invalidGuess[4] ? 'shake' : ''}${status[4][0]}`} minLength="0" maxLength="1" value={guess[4][0]} onChange={(e) => handleGuess(e, 4, 0)} onKeyDown={(e) => handleEnter(e, 4, 0)} />
                    <input type="text" autoComplete="off" ref={inputRefs.current[4][1]} disabled={currentRow !== 4} id="guess52" className={`square ${invalidGuess[4] ? 'shake' : ''}${status[4][1]}`} minLength="0" maxLength="1" value={guess[4][1]} onChange={(e) => handleGuess(e, 4, 1)} onKeyDown={(e) => handleEnter(e, 4, 1)} />
                    <input type="text" autoComplete="off" ref={inputRefs.current[4][2]} disabled={currentRow !== 4} id="guess53" className={`square ${invalidGuess[4] ? 'shake' : ''}${status[4][2]}`} minLength="0" maxLength="1" value={guess[4][2]} onChange={(e) => handleGuess(e, 4, 2)} onKeyDown={(e) => handleEnter(e, 4, 2)} />
                    <input type="text" autoComplete="off" ref={inputRefs.current[4][3]} disabled={currentRow !== 4} id="guess54" className={`square ${invalidGuess[4] ? 'shake' : ''}${status[4][3]}`} minLength="0" maxLength="1" value={guess[4][3]} onChange={(e) => handleGuess(e, 4, 3)} onKeyDown={(e) => handleEnter(e, 4, 3)} />
                    <input type="text" autoComplete="off" ref={inputRefs.current[4][4]} disabled={currentRow !== 4} id="guess55" className={`square ${invalidGuess[4] ? 'shake' : ''}${status[4][4]}`} minLength="0" maxLength="1" value={guess[4][4]} onChange={(e) => handleGuess(e, 4, 4)} onKeyDown={(e) => handleEnter(e, 4, 4)} />
                </div>
            </div>
            <Footer />
        </>
    )
}
export default App