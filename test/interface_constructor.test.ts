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

test('Default constructor', async () => {
  let test_interface: bacardi.TestInterface = new bacardi.TestInterface();
  expect(test_interface instanceof bacardi.TestInterface).toBe(true);
});

test('Calling undefined constructor should throw error', async () => {
  expect(() => {
    // There is no TestInterface(string) constructor.
    new bacardi.TestInterface('Wrong argument');
  }).toThrowError();

  expect(() => {
    // There is no TestInterface(number, number, number) constructor.
    new bacardi.TestInterface(1, 2, 3);
  }).toThrowError();
});

test('When creating two objects, should be different instances', async () => {
  let instance1: bacardi.TestInterface = new bacardi.TestInterface();
  let instance2: bacardi.TestInterface = new bacardi.TestInterface();
  expect(instance1 !== instance2).toBe(true);
});

test('Test for constructor overloading', async () => {
  let constructor1 = new bacardi.TestInterface();
  expect(bacardi.TestInterface.getLastCallInfo()).toBe('Constructor()');

  let constructor2 = new bacardi.TestInterface(1);
  expect(bacardi.TestInterface.getLastCallInfo()).toBe('Constructor(long)');

  let constructor3 = new bacardi.TestInterface(2, 3);
  expect(bacardi.TestInterface.getLastCallInfo())
      .toBe('Constructor(long, long)');

  let constructor4 = new bacardi.TestInterface('hello', 'world');
  expect(bacardi.TestInterface.getLastCallInfo())
      .toBe('Constructor(string, string)');
});
