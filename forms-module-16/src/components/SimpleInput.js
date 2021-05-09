import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // Если несколько полей input, то нужно ввести дополнительное состояние
  // const [formIsValid, setFormIsValid] = useState(false);

  // Сделано переменной вместо переменной состояния, так как мы можем
  // ее получить как производную enteredName и touched
  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const enteredEmailIsValid = pattern.test(enteredEmail);
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  // Вместо переменной общего состояния формы formIsValid и внедрения
  // useEffect можно использовать только переменную
  let formIsValid = false;

  // useEffect(() => {
  if (enteredNameIsValid && enteredEmailIsValid) {
    // setFormIsValid(true);
    formIsValid = true;
  }
  // else {
  // 	// setFormIsValid(false);
  // }
  // }, [enteredNameIsValid]);

  // Использование state для input или ref зависит от того, нужно
  // ли делать проверку валидации с каждым stroke для валидации или же нужно
  // просто получить значение input, например, при submit
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    // setEnteredName выполняет обновление не сразу, поэтому
    // используется в if проверка на event.target.value

    // Проверка выполняется переменной enteredNameIsValid выше
    // if (event.target.value.trim() !== "") {
    // 	setEnteredNameIsValid(true);
    // }
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  }

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
    // if (enteredName.trim() === "") {
    // 	setEnteredNameIsValid(false);
    // }
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    // setEnteredNameIsValid(true);

    console.log(enteredName);
    // const enteredValue = nameInputRef.current.value;
    // console.log(enteredValue);
    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
    // альтернатива сброса input с помощью ref - это непосредственное
    // обновление DOM и это неправильно, так как React должен это делать
    // nameInputRef.current.value = '';
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
      ? "form-control invalid"
      : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Email must be in right format</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
