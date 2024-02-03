import { useState } from 'react'
import React from 'react'
import './App.css'

function App() {
  const[answer,setAnswer]=useState("")
  const[expression,setExpression]=useState("")
  const et=expression.trim();
  const isOperator=(symbol) => {
    return /[*/+-]/.test(symbol);
  };
  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression));
    } else {
      setAnswer(eval(newExpression));
    }
    setExpression("");
  };
  document.addEventListener('keydown',(event)=>{
    const keyPress=event.key;
    const keyMappings = {
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '+': '+',
      '-': '-',
      '*': '*',
      '/': '/',
      '.': '.',
      '=': '=',
      'Enter': '='
    };
    if (keyMappings[keyPress]) {
      buttonPress(keyMappings[keyPress]);
    }
  })
  return (
    <>
      <div id=''className='Calculator'>
        <h1>Calculator</h1>
        <div id='display' style={{textAlign:"right"}}>
          <div id="expression">{expression}</div>
          <div id="answer">{answer}</div> 
        </div>
        <div id=''className='click'>
        <button onClick={()=>buttonPress("clear")} id='clear'className='white'>AC</button>
        <button onClick={()=>buttonPress("negative")} id='negative'className='white'>+/-</button>
        <button onClick={()=>buttonPress("percent")} id='percent'className='white'>%</button>
        <button onClick={()=>buttonPress("/")} id='divide'className='green'>/</button>
        <button onClick={()=>buttonPress("7")} id='seven'className='light-green'>7</button>
        <button onClick={()=>buttonPress("8")} id='eight'className='light-green'>8</button>
        <button onClick={()=>buttonPress("9")} id='nine'className='light-green'>9</button>
        <button onClick={()=>buttonPress("*")} id='multiply'className='green'>*</button>
        <button onClick={()=>buttonPress("4")} id='four'className='light-green'>4</button>
        <button onClick={()=>buttonPress("5")} id='five'className='light-green'>5</button>
        <button onClick={()=>buttonPress("6")} id='six'className='light-green'>6</button>
        <button onClick={()=>buttonPress("-")} id='subtract'className='green'>-</button>
        <button onClick={()=>buttonPress("3")} id='three'className='light-green'>3</button>
        <button onClick={()=>buttonPress("2")} id='two'className='light-green'>2</button>
        <button onClick={()=>buttonPress("1")} id='one'className='light-green'>1</button>
        <button onClick={()=>buttonPress("+")} id='add'className='green'>+</button>
        <button onClick={()=>buttonPress("0")} id='zero'className='light-green'>0</button>
        <button onClick={()=>buttonPress(".")} id='decimal'className='green'>.</button>
        <button onClick={()=>buttonPress("=")} id='equals'className='red'>=</button>
        </div>
        
            
      </div>
    </>
  )
}

export default App
