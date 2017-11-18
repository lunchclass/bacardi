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

test('Test for enum', async () => {
  let test_interface = new bacardi.TestInterface();

  test_interface.voidMethodTestEnumArg('value1');
  expect(bacardi.TestInterface.getLastCallInfo())
      .toBe('VoidMethodTestEnumArg(value1)');

  test_interface.voidMethodTestEnumArg('value2');
  expect(bacardi.TestInterface.getLastCallInfo())
      .toBe('VoidMethodTestEnumArg(value2)');

  test_interface.voidMethodTestEnumArg('value3');
  expect(bacardi.TestInterface.getLastCallInfo())
      .toBe('VoidMethodTestEnumArg(value3)');
});

test('Passing unexpected enum value should throw error', async () => {
  let test_interface = new bacardi.TestInterface();

  expect(() => {
    test_interface.voidMethodTestEnumArg();
  }).toThrowError();

  expect(() => {
    test_interface.voidMethodTestEnumArg(1);
  }).toThrowError();

  expect(() => {
    test_interface.voidMethodTestEnumArg('');
  }).toThrowError();

  expect(() => {
    test_interface.voidMethodTestEnumArg('value');
  }).toThrowError();

  expect(() => {
    test_interface.voidMethodTestEnumArg(undefined);
  }).toThrowError();

  expect(() => {
    test_interface.voidMethodTestEnumArg({a: 1});
  }).toThrowError();

  expect(() => {
    test_interface.voidMethodTestEnumArg('value1', 1);
  }).toThrowError();
});

test('Test for returning enum value', async () => {
  let test_interface = new bacardi.TestInterface();

  // enumReturnMethod function will be return a string which is combined prefix
  // "value" and passed parameter value.
  // eg. enumReturnMethod(1) will be return "value1"

  expect(test_interface.enumReturnMethod(1)).toBe('value1');

  expect(test_interface.enumReturnMethod(2)).toBe('value2');

  expect(test_interface.enumReturnMethod(3)).toBe('value3');
});

// FIXME(hwanseung): when return values which is not included in enum,
// should be thrown error.
// test('Returning unexpected enum value should throw error',
// async () => {
//   let test_interface = new bacardi.TestInterface();

//   expect(() => {test_interface.enumReturnMethod(4)}).toThrowError();
// });
