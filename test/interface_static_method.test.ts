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

test('Basic of static method', async () => {
  // We can call the static methods without object instantiation.
  bacardi.TestInterface.staticMethod1();
  expect(bacardi.TestInterface.getLastCallInfo())
      .toBe('static void staticMethod1()');
  bacardi.TestInterface.staticMethod2(10, 'test');
  expect(bacardi.TestInterface.getLastCallInfo())
      .toBe('static boolean staticMethod2(long, string)');
});

test('Calling undefined static method should throw error', async () => {
  expect(() => {
    bacardi.TestInterface.undefinedStaticMethod1();
  }).toThrowError(TypeError);

  expect(() => {
    bacardi.TestInterface.undefinedStaticMethod2(10, 'test');
  }).toThrowError(TypeError);
});

test('Static method with invalid arguments should throw error', async () => {
  expect(() => {
    bacardi.TestInterface.staticMethod2(10, 20);
  }).toThrowError();
});

test('Static method with invalid signature should throw error', async () => {
  expect(() => {
    bacardi.TestInterface.staticMethod1(10);
  }).toThrowError();

  expect(() => {
    bacardi.TestInterface.staticMethod2();
  }).toThrowError();
});
