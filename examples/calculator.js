/*
 * Copyright (c) 2017 The Lunch Class Authors.
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

var calculator = require('bindings')('bacardi.node')
assert.equal(calculator.add(1, 2), 3);
assert.equal(calculator.add(3.3, 4.3), 7.6);
assert.equal(calculator.add(3.3, -4.3), -1);
assert.equal(calculator.add(-3.3, 4.3), 1);
assert.equal(calculator.add(1.2, 0), 1.2);
assert.equal(calculator.add(4.5878, 1.1234), 5.7112);

assert.equal(calculator.sub(1, 2), -1);
assert.equal(calculator.sub(3.3, 4.3), -1);
assert.equal(calculator.sub(3.3, -4.3), 7.6);
assert.equal(calculator.sub(-3.3, 4.3), -7.6);
assert.equal(calculator.sub(1.2, 0), 1.2);
// TODO(chivalryko): return wrong value
// Please see : https://github.com/lunchclass/bacardi/issues/18
// assert.equal(calculator.sub(4.5878, 1.1234), 3.4644);

assert.equal(calculator.mul(1, 2), 2);
assert.equal(calculator.mul(3.3, 4.3), 14.19);
assert.equal(calculator.mul(3.3, -4.3), -14.19);
assert.equal(calculator.mul(-3.3, 4.3), -14.19);
assert.equal(calculator.mul(1.2, 0), 0);
// TODO(chivalryko): return wrong value
// Please see : https://github.com/lunchclass/bacardi/issues/18
// assert.equal(calculator.mul(4.5878, 1.1234), 5.15393452);

assert.equal(calculator.div(1, 2), 0.5);
// TODO(chivalryko): return wrong value
// Please see : https://github.com/lunchclass/bacardi/issues/18
// assert.equal(calculator.div(3.3, 4.3), 0.76744186);
// assert.equal(calculator.div(3.3, -4.3), -0.76744186);
// assert.equal(calculator.div(-3.3, 4.3), -0.76744186);
assert.equal(calculator.div(1.2, 0), 0);
// TODO(chivalryko): return wrong value
// Please see : https://github.com/lunchclass/bacardi/issues/18
// assert.equal(calculator.div(4.5878, 1.1234), 0.767442);
