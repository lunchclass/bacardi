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

test('Attribute should be readable and assignalbe', async () => {
  let test_interface = new bacardi.TestInterface();
  test_interface.doubleNumber = 0.123456789012345;
  expect(test_interface.doubleNumber).toBe(0.123456789012345);
  expect(test_interface.doubleNumber).toBe(test_interface.getDoubleAttribute());
});

test('Static Attribute should be readable and assignable', async () => {
  bacardi.TestInterface.staticDoubleNumber = 0;
  expect(bacardi.TestInterface.staticDoubleNumber).toBe(0);
  bacardi.TestInterface.staticDoubleNumber = 1024.20484096;
  expect(bacardi.TestInterface.staticDoubleNumber).toBe(1024.20484096);
});

test('Readonly attribute should not be assignable', async () => {
  const TEST_NUMBER = 0.123917483;
  let test_interface = new bacardi.TestInterface();
  test_interface.readonlyAssignTest(TEST_NUMBER);
  test_interface.readonlyDoubleNumber = 0.3294235732;
  expect(test_interface.readonlyDoubleNumber).toBe(TEST_NUMBER);
});