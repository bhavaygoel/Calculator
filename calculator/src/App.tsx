import { useReducer } from "react";
import "./styles.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

type CalculatorState = {
  currentOperand: string;
  previousOperand: string;
  operation: string;
};

export type CalculatorAction = {
  type: string; // You can use specific action type strings if needed
  payload?: {
    digit?: number | string,
    operand?: string;
  }; // The payload type can be adjusted based on the actions you want to handle
};

export enum ACTIONS  {
  ADD_DIGIT = 'add_digit',
  CHOOSE_OPERATION = 'choose_operation',
  CLEAR = 'clear',
  DELETE_DIGIT = 'delete_digit',
  EVALUATE = 'evaluate'
}

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    // Handle different action types here and update the state accordingly
    case ACTIONS.ADD_DIGIT:
      if (action.payload?.digit === 0 && state.currentOperand === "0") return state;
      if (action.payload?.digit === '.' && state.currentOperand.includes('.')) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${action.payload?.digit}`
      }

    case ACTIONS.CLEAR:
      return {
        currentOperand: "",
        previousOperand: "",
        operation: ""
      }
    // case ACTIONS.CHOOSE_OPERATION:

    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {
      currentOperand: "",
      previousOperand: "",
      operation: "",
    }
  );

  return (
    <div className="parent">
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button onClick={() => dispatch({ type:ACTIONS.CLEAR})} className="span-two">AC</button>
      <button>DEL</button>
      <OperationButton operand="/" dispatch={dispatch} />
      <DigitButton digit={1} dispatch={dispatch} />
      <DigitButton digit={2} dispatch={dispatch} />
      <DigitButton digit={3} dispatch={dispatch} />
      <OperationButton operand="*" dispatch={dispatch} />
      <DigitButton digit={4} dispatch={dispatch} />
      <DigitButton digit={5} dispatch={dispatch} />
      <DigitButton digit={6} dispatch={dispatch} />
      <OperationButton operand="+" dispatch={dispatch} />
      <DigitButton digit={7} dispatch={dispatch} />
      <DigitButton digit={8} dispatch={dispatch} />
      <DigitButton digit={9} dispatch={dispatch} />
      <OperationButton operand="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit={0} dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
    </div>
  );
}

export default App;
