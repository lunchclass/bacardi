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

var calculator = require('bindings')('bacardi.node')
console.log(calculator.add(1, 2));
console.log(calculator.add(3.3, 4.3));
console.log(calculator.add(3.3, -4.3));
console.log(calculator.add(-3.3, 4.3));
console.log(calculator.add(1.2, 0));
console.log(calculator.add(4.5878, 1.1234));
