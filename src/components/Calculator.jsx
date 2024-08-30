import { useReducer, useState } from "react";
import "./Calculator.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

function Calculator() {
  function theme1() {
    document.body.classList.remove("theme-2");
    document.body.classList.remove("theme-3");
    document.body.classList.add("theme-1");
    document.getElementById("indicator").style.left = "0";
  }

  function theme2() {
    document.body.classList.remove("theme-1");
    document.body.classList.remove("theme-3");
    document.body.classList.add("theme-2");
    document.getElementById("indicator").style.left = "35%";
  }

  function theme3() {
    document.body.classList.remove("theme-1");
    document.body.classList.remove("theme-2");
    document.body.classList.add("theme-3");
    document.getElementById("indicator").style.left = "70%";
  }

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: "", previousOperand: "", operation: "" }
  );

  function reducer(state, { type, payload }) {
    switch (type) {
      case "add-digit":
        if (payload.digit == "0" && state.currentOperand == "0") return state;
        if (payload.digit == "." && state.currentOperand.includes("."))
          return state;
        return {
          ...state,
          currentOperand: state.currentOperand + payload.digit,
        };

      case "clear":
        return {};

      case "choose-operation":
        if (state.currentOperand == "" && state.previousOperand == "")
          return state;
        if (state.previousOperand == "") {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: "",
          };
        }
        if (state.currentOperand == "") {
          return {
            ...state,
            operation: payload.operation,
          };
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: "",
        };

      case "evaluate":
        if (
          state.currentOperand == null ||
          state.previousOperand == null ||
          state.operation == null
        )
          return state;

        return {
          ...state,
          overwrite: true,
          previousOperand: "",
          operation: "",
          currentOperand: evaluate(state),
        };

      case "delete-digit":
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: "",
            overwrite: false,
          };
        }
        if (state.currentOperand == "") return state;
        if (state.currentOperand.length === 1) {
          return {
            ...state,
            currentOperand: "",
          };
        }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };
    }
  }

  function evaluate({ currentOperand, previousOperand, operation }) {
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(previous) || isNaN(current)) return "";
    var computation = 0;
    switch (operation) {
      case "+":
        computation = previous + current;
        break;

      case "-":
        computation = previous - current;
        break;

      case "*":
        computation = previous * current;
        break;

      case "/":
        computation = previous / current;
        break;
    }
    return computation.toString();
  }

  return (
    <div className="calculator-container">
      <div className="claculator-header">
        <p>calc</p>
        <div className="theme-toggle-container">
          <span>THEME</span>
          <div className="theme-toggle">
            <div className="theme-number">
              <span onClick={theme1}>1</span>
              <span onClick={theme2}>2</span>
              <span onClick={theme3}>3</span>
            </div>
            <span className="indicator" id="indicator"></span>
          </div>
        </div>
      </div>

      <div className="input-box">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <div className="keypad">
        <DigitButton digit={7} dispatch={dispatch} />
        <DigitButton digit={8} dispatch={dispatch} />
        <DigitButton digit={9} dispatch={dispatch} />
        <button
          className="delete"
          onClick={() => dispatch({ type: "delete-digit" })}
        >
          DEL
        </button>
        <DigitButton digit={4} dispatch={dispatch} />
        <DigitButton digit={5} dispatch={dispatch} />
        <DigitButton digit={6} dispatch={dispatch} />
        <OperationButton operation={"+"} dispatch={dispatch} />
        <DigitButton digit={1} dispatch={dispatch} />
        <DigitButton digit={2} dispatch={dispatch} />
        <DigitButton digit={3} dispatch={dispatch} />
        <OperationButton operation={"-"} dispatch={dispatch} />
        <DigitButton digit={"."} dispatch={dispatch} />
        <DigitButton digit={0} dispatch={dispatch} />
        <OperationButton operation={"/"} dispatch={dispatch} />
        <OperationButton operation={"*"} dispatch={dispatch} />
        <button
          className="sapn-two reset"
          onClick={() => dispatch({ type: "clear" })}
        >
          RESET
        </button>
        <button
          className="sapn-two equal"
          onClick={() => dispatch({ type: "evaluate" })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
