import React from 'react';
import { ACTIONS } from './App';
import { CalculatorAction } from './App';

interface DigitButtonProps {
  dispatch: React.Dispatch<CalculatorAction>; // Assuming CalculatorAction is your action type
  digit: number | string;
}

function DigitButton({ dispatch, digit }: DigitButtonProps) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  );
}

export default DigitButton;
