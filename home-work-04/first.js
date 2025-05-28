import React, { useState } from 'react';
import './App.css';

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const [history, setHistory] = useState([]);
  
  const [color, setColor] = useState('black');

  const increment = () => {
    const newCount = count + step;
    setCount(newCount);
    updateHistory(newCount);
  };

  const decrement = () => {
    const newCount = count - step;
    setCount(newCount);
    updateHistory(newCount);
  };

  const reset = () => {
    setCount(0);
    updateHistory(0);
  };

  const updateHistory = (newCount) => {
    setHistory(prev => {
      const newHistory = [newCount, ...prev].slice(0, 5);
      return newHistory;
    });
  };

  const handleStepChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setStep(value);
  };

  const toggleColor = () => {
    setColor(prev => prev === 'black' ? 'blue' : 'black');
  };

  return (
    <div className="counter-app">
      <h1>Інтерактивний лічильник</h1>
      
      <div className="counter-display" style={{ color: color }}>
        Поточне значення: {count}
      </div>
      
      <div className="controls">
        <div className="step-control">
          <label>
            Крок зміни:
            <input 
              type="number" 
              value={step} 
              onChange={handleStepChange}
              min="1"
            />
          </label>
        </div>
        
        <div className="buttons">
          <button onClick={decrement}>Зменшити (-{step})</button>
          <button onClick={increment}>Збільшити (+{step})</button>
          <button onClick={reset}>Скинути</button>
          <button onClick={toggleColor}>Змінити колір</button>
        </div>
      </div>
      
      <div className="history">
        <h3>Історія змін (останні 5):</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <SecondCounter />
    </div>
  );
}

function SecondCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="second-counter">
      <h2>Другий лічильник</h2>
      <div>Значення: {count}</div>
      <div className="buttons">
        <button onClick={() => setCount(c => c - 1)}>-1</button>
        <button onClick={() => setCount(c => c + 1)}>+1</button>
      </div>
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}
export default App;