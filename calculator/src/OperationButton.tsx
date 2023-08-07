import React from 'react';
import { ACTIONS } from './App';
import { CalculatorAction } from './App';

interface DigitButtonProps {
  dispatch: React.Dispatch<CalculatorAction>; // Assuming CalculatorAction is your action type
  operand: string;
}

function OperationButton({ dispatch, operand }: DigitButtonProps) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operand } })}>
      {operand}
    </button>
  );
}

export default OperationButton;
