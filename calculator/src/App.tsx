import { useReducer } from "react";
import "./styles.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

type CalculatorState = {
  currentOperand: string | undefined;
  previousOperand: string | undefined;
  operation: string | undefined;
  overwrite?: boolean;
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

function evaluate(state: CalculatorState): string{
  const prev = parseFloat(state.previousOperand ?? "")
  const current = parseFloat(state.currentOperand ?? "")
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = 0;
  switch (state.operation){
    case "+":
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      if(current === 0)
        return "Division by zero";
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
})

function formatOperand(operand: string){
  if(operand === "") return
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(parseFloat(integer));
  return `${INTEGER_FORMATTER.format(parseFloat(integer))}.${decimal}`
}

function reducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    // Handle different action types here and update the state accordingly
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand: action.payload?.digit?.toString(),
          overwrite: false
        }
      }
      if (action.payload?.digit === 0 && state.currentOperand === "0") return state;
      if (action.payload?.digit === '.' && state.currentOperand?.includes('.')) return state;
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
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === "" && state.previousOperand === "") return state;
      if (state.currentOperand === ""){
        return {
          ...state,
          operation: action.payload?.operand
        }
      }
      if (state.previousOperand === ""){
        return{
          ...state,
          operation: action.payload?.operand,
          previousOperand: state.currentOperand,
          currentOperand: ""
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload?.operand,
        currentOperand: ""
      }
    case ACTIONS.EVALUATE:
      if(state.operation === "" || state.currentOperand === "" || state.previousOperand === "") return state;
      return {
        ...state,
        previousOperand: "",
        operation: "",
        currentOperand: evaluate(state),
        overwrite: true
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite){
        return{
          ...state,
          overwrite: false,
          currentOperand: ""
        }
      }
      if (state.currentOperand === undefined) return state;
      if (state.currentOperand?.length === 1){
        return{
          ...state,
          currentOperand: ""
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
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
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button onClick={() => dispatch({ type:ACTIONS.CLEAR})} className="span-two">AC</button>
      <button onClick={() => dispatch( {type: ACTIONS.DELETE_DIGIT})}>DEL</button>
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
      <button onClick={ () => dispatch({ type: ACTIONS.EVALUATE})} className="span-two">=</button>
    </div>
    </div>
  );
}

export default App;
