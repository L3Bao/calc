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
    let displayValue = `${operand1}${operator ? ' ' + operator : ''}${operand2 ? ' ' + operand2 : ''}`;



    const keypad = [
      [
        { value: '1', function: this.inputDigit },
        { value: '2', function: this.inputDigit },
        { value: '3', function: this.inputDigit },
        { value: '+', function: this.inputOperator },
      ],
      [
        { value: '4', function: this.inputDigit },
        { value: '5', function: this.inputDigit },
        { value: '6', function: this.inputDigit },
        { value: '-', function: this.inputOperator },
      ],
      [
        { value: '7', function: this.inputDigit },
        { value: '8', function: this.inputDigit },
        { value: '9', function: this.inputDigit },
        { value: '*', function: this.inputOperator },
      ],
      [
        { value: '0', function: this.inputDigit },
        { value: '/', function: this.inputOperator },
        { value: '=', function: this.calculate },
      ],
      [
        { value: 'Clear', function: this.clear },
      ],
    ];

    return (
      <div className="Calculator container mt-5">
        <input type="text" readOnly className="calculator-screen form-control mb-3" value={displayValue} />
        <div className="calculator-keys">
          {keypad.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((key, keyIndex) => (
                <button
                  className="btn border col"
                  onClick={() => key.function(key.value)}
                  key={keyIndex}
                >
                  {key.value}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );

  }
}

export default App;
