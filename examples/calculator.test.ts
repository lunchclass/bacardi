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

import * as bindings from 'bindings';

const bacardi = bindings('bacardi.node');
const calculator = new bacardi.Calculator(0);
const ternary_calculator = new bacardi.TernaryCalculator();

test('Test for constructor function', async () => {
  new bacardi.Calculator(1000);

  expect(() => {
    new bacardi.Calculator('wrong argument');
  }).toThrowError();

  expect(() => {
    new bacardi.Calculator(1000, 2000, 3000);
  }).toThrowError();
});

test('Test for static function', async () => {
  bacardi.Calculator.print('hello bacardi!');
});

test('isEquals function test for bool type', async () => {
  expect(calculator.isEquals(calculator.sub(1, 2), calculator.sub(3, 4)))
      .toBe(true);
});

test('add function test for long type', async () => {
  expect(calculator.add(1, 2)).toBe(1 + 2);
  expect(calculator.add(3, 4)).toBe(3 + 4);
  expect(calculator.add(3, -4)).toBe(3 + -4);
  expect(calculator.add(-3, 4)).toBe(-3 + 4);
  expect(calculator.add(1, 0)).toBe(1 + 0);
});

test('sub function test for short type', async () => {
  expect(calculator.sub(1, 2)).toBe(1 - 2);
  expect(calculator.sub(3, 4)).toBe(3 - 4);
  expect(calculator.sub(3, -4)).toBe(3 - -4);
  expect(calculator.sub(-3, 4)).toBe(-3 - 4);
  expect(calculator.sub(1, 0)).toBe(1 - 0);
});

test('mul function test for long long', async () => {
  expect(calculator.mul(2147483647, 100)).toBe(214748364700);
  expect(calculator.mul(3, 4)).toBe(3 * 4);
  expect(calculator.mul(3, -4)).toBe(3 * -4);
  expect(calculator.mul(1223372036854775807, 4)).toBe(4893488147419103000);
  expect(calculator.mul(2147483647, 3000)).toBe(6442450941000);
});

test('div function test for double', async () => {
  expect(calculator.div(1, 2)).toBe(1 / 2);
  expect(calculator.div(3.3, 4.3)).toBe(3.3 / 4.3);
  expect(calculator.div(3.3, -4.3)).toBe(3.3 / -4.3);
  expect(calculator.div(-3.3, 4.3)).toBe(-3.3 / 4.3);
  expect(calculator.div(4.5878, 1.1234)).toBe(4.5878 / 1.1234);
});

test('Test for invalid arguments', async () => {
  expect(() => {
    calculator.add('1', '2');
  }).toThrowError();  // TypeError
  expect(() => {
    calculator.sub(undefined, undefined);
  }).toThrowError();  // TypeError
  expect(() => {
    calculator.mul(null, null);
  }).toThrowError();  // TypeError
  expect(() => {
    calculator.div([], {});
  }).toThrowError();  // TypeError

  expect(() => {
    calculator.add();
  }).toThrowError();  // RangeError
  expect(() => {
    calculator.sub(10);
  }).toThrowError();  // RangeError
  expect(() => {
    calculator.mul(20, 30, 40);
  }).toThrowError();  // RangeError
  expect(() => {
    calculator.div(20, 30, 40, 50);
  }).toThrowError();  // RangeError
});

test('generate one more bridge classes from one more interfaces', async () => {
  expect(calculator.add(1, 2)).toBe(1 + 2);
  expect(ternary_calculator.add(1, 2, 3)).toBe(1 + 2 + 3);
});

test('enum type test', async () => {
  expect(calculator.calculate('add', 1, 2)).toBe(1 + 2);
  expect(calculator.calculate('sub', 2, 1)).toBe(2 - 1);
  expect(calculator.calculate('mul', 2, 1)).toBe(2 * 1);
  expect(calculator.calculate('div', 4, 2)).toBe(4 / 2);

  expect(() => {
    calculator.calculate('add', 1, 1, 1);
  }).toThrowError();  // RangeError
  expect(() => {
    calculator.calculate(1, 1, 1);
  }).toThrowError();  // TypeError
  expect(() => {
    calculator.calculate('not_match_value', 1, 1);
  }).toThrowError();  // TypeError
});
