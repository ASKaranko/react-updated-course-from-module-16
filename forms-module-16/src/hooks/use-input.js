import React, { useState, useReducer } from "react";

// useReducer используется только ради практики - в данном hook
// нет взаимосвязанных состояний в большом количестве и последовательностей
// состояний, тем не менее, можно его тоже использовать

const initialInputState = {
  value: '',
  isTouched: false
}

const inputStateReducer = (state, action) => {
  console.log(test);
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: state.isTouched
    }
  }

  if (action.type === 'BLUR') {
    return {
      value: state.value,
      isTouched: true
    }
  }

  if (action.type === 'RESET') {
    return initialInputState;
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);
  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  // const valueIsValid = validateValue(enteredValue);
  const valueIsValid = validateValue(inputState.value);
  // const hasError = !valueIsValid && isTouched;
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value})
    // setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    // setIsTouched(true);
    dispatch({type: 'BLUR'});
  };

  const reset = () => {
    // setEnteredValue('');
    // setIsTouched(false);
    dispatch({type: 'RESET'});
  };

  return {
    // value: enteredValue,
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;