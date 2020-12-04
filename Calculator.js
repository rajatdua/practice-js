/**
 created by rajatdua on 02/12/20
 */
(function(){
  // const PRECEDENCE = ['/', '*', '+', '-'];
  const OPERATIONS = ['+', '-', '/', '*', 'C', 'B', '='];
  const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let stack = [];
  const numberPad = document.getElementById('numberPad');
  const screen = document.getElementById('screen');

  screen.innerHTML = `<span>Start Pressing Buttons</span>`

  const handler = (expression) => {
    if(
      (stack.length === 0 && OPERATIONS.includes(expression)) ||
      (OPERATIONS.includes(stack[stack.length - 1]) && OPERATIONS.includes(expression))
    ) {
      return;
    }
    // if(NUMBERS.includes(stack[stack.length - 1]) && NUMBERS.includes(expression)){
    // }
    stack.push(expression);
    screen.innerHTML = `<span>${stack.join('')}</span>`
  };

  const calculate = () => {
    // evaluate stack;
    // const regexNumber = new RegExp('[' + NUMBERS.join('') + ']');
    // const regexOperation = new RegExp('[' + OPERATIONS.join('') + ']');
    // const stackToString = stack.join('');
    // const operations = stackToString.split(regexNumber).filter(item => item !== '');
    // const numbers = stackToString.split(regexOperation);

    // console.log({ numbers, operations })
    if(stack.length <= 1){
      return;
    }
    if(OPERATIONS.includes(stack[stack.length - 1])){
      return;
    }
    screen.innerHTML = `<span>${eval(stack.join(''))}</span>`
  };

  const clearAll = () => {
    stack = [];
    screen.innerHTML = `<span>Start Pressing Buttons</span>`
  };

  const backspace = () => {
    if(stack.length > 0){
      stack.pop();
    }
    if(stack.length === 0){
      screen.innerHTML = `<span>Start Pressing Buttons</span>`
      return;
    }
    screen.innerHTML = `<span>${stack.join('')}</span>`
  };

  const createButton = (identity) => {
    const button = document.createElement('button');
    button.innerText = identity;
    switch(identity){
      case '=':
        button.onclick = () => calculate();
        break;
      case 'C':
        button.onclick = () => clearAll();
        break;
      case 'B':
        button.onclick = () => backspace();
        break;
      default:
        button.onclick = () => handler(identity);
        break;
    }
    return button;
  };

  for(const numIndex in NUMBERS){
    numberPad.appendChild(createButton(NUMBERS[numIndex]));
  }

  for(const opIndex in OPERATIONS){
    numberPad.appendChild(createButton(OPERATIONS[opIndex]));
  }

})();