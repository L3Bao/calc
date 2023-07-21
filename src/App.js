import React from 'react';
import './App.css';

// Constructor for the input
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operand1: '',
      operand2: '',
      operator: null,
    };
  }

  /*
  This method is used to assign the values for the 2 operands:
  if the value of the operator is null, any numbers inputted is assigned to the first operand
  if the value if the operator is not null, any numbers inputted is assigned to the second operand
  */

  inputDigit = (digit) => {
    const { operator, operand1, operand2 } = this.state;
    if (operator === null) {
      this.setState({ operand1: operand1 + digit });
    } else {
      this.setState({ operand2: operand2 + digit });
    }
  };

  //This method is used to assign the value for the operator
  inputOperator = (operator) => {
    this.setState({ operator });
  };

  //This method is used to do the calculation and set the result to operand1 while clearing the second operand and the operator to do a new calculation
  calculate = () => {
    const { operator, operand1, operand2 } = this.state;
    let result;
    switch (operator) {
      case '+':
        result = Number(operand1) + Number(operand2);
        break;
      case '-':
        result = Number(operand1) - Number(operand2);
        break;
      case '*':
        result = Number(operand1) * Number(operand2);
        break;
      case '/':
        if (Number(operand2) !== 0) {
          result = Number(operand1) / Number(operand2);
        } else {
          alert('Division by 0 is undefined');
          this.clear();
          return;
        }
        break;
      default:
        return;
    }
    this.setState({ operand1: result.toString(), operand2: '', operator: null });
  };

  clear = () => {
    this.setState({ operand1: '', operand2: '', operator: null });
  };

  render() {
    const { operator, operand1, operand2 } = this.state;
    const displayValue = operator ? operand2 : operand1;

    return (
      <div className="Calculator container mt-5">
        <input type="text" readOnly className="calculator-screen form-control mb-3" value={displayValue} />

        
        <div className="calculator-keys">
          <div className="row">
            {[1, 2, 3].map((num) => (
              <button key={num} className="btn border col" onClick={() => this.inputDigit(num)}>{num}</button>
            ))}
            <button className="btn border col" onClick={() => this.inputOperator('+')}>+</button>
          </div>

          <div className="row">
            {[4, 5, 6].map((num) => (
              <button key={num} className="btn border col" onClick={() => this.inputDigit(num)}>{num}</button>
            ))}
            <button className="btn border col" onClick={() => this.inputOperator('-')}>-</button>
          </div>

          <div className="row">
            {[7, 8, 9].map((num) => (
              <button key={num} className="btn border col" onClick={() => this.inputDigit(num)}>{num}</button>
            ))}
            <button className="btn border col" onClick={() => this.inputOperator('*')}>*</button>
          </div>

          <div className="row">
            <button className="btn border col" onClick={() => this.inputDigit(0)}>0</button>
            <button className="btn border col" onClick={() => this.inputOperator('/')}>/</button>
            <button className="btn border col-6" onClick={this.calculate}>=</button>
          </div>
          <div className="row">
            <button className="btn border col" onClick={this.clear}>Clear</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
