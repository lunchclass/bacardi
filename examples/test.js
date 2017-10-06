const bacardi = require('bindings')('bacardi.node');
const calculator = new bacardi.Calculator(0);

calculator.mul(10, 20);
