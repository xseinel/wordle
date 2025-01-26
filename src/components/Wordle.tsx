import React, { useState } from "react";
import "./Wordle.css";
type CellState = "wgreen" | "wyellow" | "wred" | null;
interface CellProps {
  value: string;
  state: CellState;
}

const Cell: React.FC<CellProps> = ({ value, state }) => {
  return <div className={`cell ${state || ""}`}>{value}</div>;
};

const Board: React.FC<{ attempts: string[][]; results: CellState[][] }> = ({
  attempts,
  results,
}) => {
  return (
    <div className="board">
      {attempts.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={letter}
            state={results[rowIndex][colIndex]}
          />
        ))
      )}
    </div>
  );
};

const InputArea: React.FC<{
  onSubmit: (word: string) => void;
  disabled: boolean;
}> = ({ onSubmit, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.length === 5) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={5}
        placeholder="Введите слово"
        disabled={disabled}
      />
      <button onClick={handleSubmit} disabled={disabled}>
        Отправить
      </button>
    </div>
  );
};

const Wordle: React.FC = () => {
  const words = [
    "барак", "вагон", "вишня", "игрок", "карта", "лампа", "носок", "капля",
    "песок", "крест", "тесто", "шарик", "кошка", "полов", "огонь", "бренд",
    "макет", "крыса", "питон", "птица", "стенд", "горох", "мочка", "дочка",
    "корка", "стриж", "музей", "скала", "капот", "песок", "ЗАЧЕТ", "бочка",
    "кочка",
  ];

  const [selectedWord, setSelectedWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [attempts, setAttempts] = useState<string[][]>(Array(6).fill(Array(5).fill("")));
  const [results, setResults] = useState<CellState[][]>(
    Array(6).fill(Array(5).fill(null))
  );
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [message, setMessage] = useState("");

  const checkGuess = (guess: string) => {
    if (currentAttempt >= 6) return;

    const wordArray = selectedWord.split("");
    const guessArray = guess.split("");

    const newResults = results.slice();
    const newAttempts = attempts.slice();

    const rowResults: CellState[] = Array(5).fill(null);

    wordArray.forEach((char, i) => {
      if (guessArray[i] === char) {
        rowResults[i] = "wgreen";
      } else if (wordArray.includes(guessArray[i])) {
        rowResults[i] = "wyellow";
      } else {
        rowResults[i] = "wred";
      }
    });

    newAttempts[currentAttempt] = guessArray;
    newResults[currentAttempt] = rowResults;
    setAttempts(newAttempts);
    setResults(newResults);

    if (guess === selectedWord) {
      setMessage("Поздравляю, вы угадали слово!");
    } else if (currentAttempt + 1 === 6) {
      setMessage(`Вы не угадали слово. Это было: ${selectedWord}`);
    }

    setCurrentAttempt(currentAttempt + 1);
  };

  return (
    <div className="game-container">
      <div className="header">
        <h1>Wordle</h1>
      </div>
      <Board attempts={attempts} results={results} />
      <InputArea
        onSubmit={(word) => checkGuess(word.toLowerCase())}
        disabled={currentAttempt >= 6 || message !== ""}
      />
      <p id="message">{message}</p>
    </div>
  );
};

export default Wordle;
