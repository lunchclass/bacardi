/*
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
const calculator = new bacardi.Calculator();

describe('Test for static function', () => {
  it('The static function can be called without instantiation.', () => {
    bacardi.Calculator.print(0);
  });
});

describe('isequal function test for bool type', () => {
  it('should be equal with expected value', () => {
    assert.equal(
        calculator.equals(calculator.sub(1, 2), calculator.sub(3, 4)), true);
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

describe('mul function test for double', () => {
  it('should be equal with expected value', () => {
    assert.equal(calculator.mul(1, 2), 1 * 2);
    assert.equal(calculator.mul(3.3, 4.3), 3.3 * 4.3);
    assert.equal(calculator.mul(3.3, -4.3), 3.3 * -4.3);
    assert.equal(calculator.mul(-3.3, 4.3), -3.3 * 4.3);
    assert.equal(calculator.mul(1.2, 0), 1.2 * 0);
    assert.equal(calculator.mul(4.5878, 1.1234), 4.5878 * 1.1234);
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
