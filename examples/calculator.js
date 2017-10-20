/**
 * Copyright (c) 2017 The Bacardi Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const assert = require('assert');
const bacardi = require('bindings')('bacardi.node');
const calculator = new bacardi.Calculator(0);
const ternary_calculator = new bacardi.TernaryCalculator();

describe('Test for constructor function', () => {
  describe('there is constructor calculator(long createTime)', () => {
    it('should be create object without error', () => {
      new bacardi.Calculator(1000);
    });
  });
  describe('there is no constructor calculator()', () => {
    it('should be failed create object with error', () => {
      assert.throws(() => {
        new bacardi.Calculator('wrong argument');
      }, Error);
    });
    it('should be failed create object with error', () => {
      assert.throws(() => {
        new bacardi.Calculator(1000, 2000, 3000);
      }, Error);
    });
  });
  describe('when we create two objects', () => {
    it('should be different, two objects', () => {
      assert.notEqual(new bacardi.Calculator(0), new bacardi.Calculator(0));
    });
  });
});

describe('Test for constructor overloading', () => {
  it('should be create object without error', () => {
    new bacardi.Calculator();
    new bacardi.Calculator(1000);
    new bacardi.Calculator(100, 200);
    new bacardi.Calculator('hello', 'world');
  });
});

describe('Test for static function', () => {
  it('The static function can be called without instantiation.', () => {
    bacardi.Calculator.print('hello bacardi!');
  });
});

describe('isEquals function test for bool type', () => {
  it('should be equal with expected value', () => {
    assert.equal(
        calculator.isEquals(calculator.sub(1, 2), calculator.sub(3, 4)), true);
  });
});

describe('add function test for long type', () => {
  it('should be equal with expected value', () => {
    assert.equal(calculator.add(1, 2), 1 + 2);
    assert.equal(calculator.add(3, 4), 3 + 4);
    assert.equal(calculator.add(3, -4), 3 + -4);
    assert.equal(calculator.add(-3, 4), -3 + 4);
    assert.equal(calculator.add(1, 0), 1 + 0);
  });
});

describe('sub function test for short type', () => {
  it('should be equal with expected value', () => {
    assert.equal(calculator.sub(1, 2), 1 - 2);
    assert.equal(calculator.sub(3, 4), 3 - 4);
    assert.equal(calculator.sub(3, -4), 3 - -4);
    assert.equal(calculator.sub(-3, 4), -3 - 4);
    assert.equal(calculator.sub(1, 0), 1 - 0);
  });
});

describe('mul function test for long long', () => {
  it('should be equal with expected value', () => {
    assert.equal(calculator.mul(2147483647, 100), 214748364700);
    assert.equal(calculator.mul(3, 4), 3 * 4);
    assert.equal(calculator.mul(3, -4), 3 * -4);
    assert.equal(calculator.mul(1223372036854775807, 4), 4893488147419103000);
    assert.equal(calculator.mul(2147483647, 3000), 6442450941000);
  });
});

describe('div function test for double', () => {
  it('should be equal with expected value', () => {
    assert.equal(calculator.div(1, 2), 1 / 2);
    assert.equal(calculator.div(3.3, 4.3), 3.3 / 4.3);
    assert.equal(calculator.div(3.3, -4.3), 3.3 / -4.3);
    assert.equal(calculator.div(-3.3, 4.3), -3.3 / 4.3);
    assert.equal(calculator.div(4.5878, 1.1234), 4.5878 / 1.1234);
  });
});

describe('Test for invalid arguments', () => {
  it('Pass invalid numbers', () => {
    assert.throws(() => {
      calculator.add('1', '2');
    }, TypeError);
    assert.throws(() => {
      calculator.sub(undefined, undefined);
    }, TypeError);
    assert.throws(() => {
      calculator.mul(null, null);
    }, TypeError);
    assert.throws(() => {
      calculator.div([], {});
    }, TypeError);
  });

  it('No match function signatures', () => {
    assert.throws(() => {
      calculator.add();
    }, RangeError);
    assert.throws(() => {
      calculator.sub(10);
    }, RangeError);
    assert.throws(() => {
      calculator.mul(20, 30, 40);
    }, RangeError);
    assert.throws(() => {
      calculator.div(20, 30, 40, 50);
    }, RangeError);
  });
});

describe('generate one more bridge classes from one more interfaces', () => {
  it('should be equal with expected value', () => {
    assert.equal(calculator.add(1, 2), 1 + 2);
    assert.equal(ternary_calculator.add(1, 2, 3), 1 + 2 + 3);
  });
});

describe('enum type test', () => {
  it('should be equal with expected value', () => {
    assert.equal(calculator.calculate('add', 1, 2), 3);
    assert.equal(calculator.calculate('sub', 2, 1), 1);
    assert.equal(calculator.calculate('mul', 2, 1), 2);
    assert.equal(calculator.calculate('div', 4, 1), 4);
  });

  it('should be throw error when invalid argument passed.', () => {
    assert.throws(() => {
      calculator.calculate('add', 1, 1, 1);
    }, RangeError);
    assert.throws(() => {
      calculator.calculate(1, 1, 1);
    }, TypeError);
    assert.throws(() => {
      calculator.calculate('not_match_value', 1, 1);
    }, TypeError);
  });
});
