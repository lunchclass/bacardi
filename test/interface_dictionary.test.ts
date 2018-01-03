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

test(
    'Test call function which take dictionaries type as parameter',
    async () => {
      let test_interface = new bacardi.TestInterface();

      var testDict = {a: 10, b: "test"};
      expect(test_interface.doubleMethodTestDictionaryArg(testDict)).toBe(10);
      expect(bacardi.TestInterface.getLastCallInfo())
          .toBe('DoubleMethodTestDictionaryArg() : test');
    });
