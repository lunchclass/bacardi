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

test('Test for IDL \'boolean\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The boolean type has two values: true and false.
  expect(test_interface.booleanMethod(true)).toBe(true);
  expect(test_interface.booleanMethod(false)).toBe(false);
});

test('Test for IDL \'byte\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The byte type is a signed integer type that has values in the range
  // [-128, 127].
  expect(test_interface.byteMethod(127)).toBe(127);
  expect(test_interface.byteMethod(-128)).toBe(-128);
  expect(test_interface.byteMethod(128) != 128).toBe(true);
  expect(test_interface.byteMethod(-129) != -129).toBe(true);
});

test('Test for IDL \'octet\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The octet type is an unsigned integer type that has values in the range
  // [0, 255].
  expect(test_interface.octetMethod(255)).toBe(255);
  expect(test_interface.octetMethod(0)).toBe(0);
  expect(test_interface.octetMethod(256) != 256).toBe(true);
  expect(test_interface.octetMethod(-1) != -1).toBe(true);
});

test('Test for IDL \'short\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The short type is a signed integer type that has values in the range
  // [−32768, 32767].
  expect(test_interface.shortMethod(32767)).toBe(32767);
  expect(test_interface.shortMethod(-32768)).toBe(-32768);
  expect(test_interface.shortMethod(32768) != 32768).toBe(true);
  expect(test_interface.shortMethod(-32769) != -32769).toBe(true);
});

test('Test for IDL \'unsigned short\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The unsigned short type is an unsigned integer type that has values in the
  // range [0, 65535].
  expect(test_interface.unsignedShortMethod(65535)).toBe(65535);
  expect(test_interface.unsignedShortMethod(0)).toBe(0);
  expect(test_interface.unsignedShortMethod(65536) != 65536).toBe(true);
  expect(test_interface.unsignedShortMethod(-1) != -1).toBe(true);
});

test('Test for IDL \'unsigned long\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The unsigned long type is an unsigned integer type that has values in
  // the range [0, 4294967295].

  expect(test_interface.unsignedLongMethod(4294967295)).toBe(4294967295);
  expect(test_interface.unsignedLongMethod(0)).toBe(0);
  expect(test_interface.unsignedLongMethod(4294967296) != 4294967296)
      .toBe(true);
  expect(test_interface.unsignedLongMethod(-1) != -1).toBe(true);
});

test('Test for IDL \'unsigned long long\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The unsigned long long type is an unsigned integer type that has
  // values in the range [0, 18446744073709551615].

  // TypeScript does not support values greater than 2^53-1.
  // So we are not able to do overflow test and so on.

  expect(test_interface.unsignedLongLongMethod(0)).toBe(0);
  for (var i = 1; i < Number.MAX_SAFE_INTEGER;
       i += Math.floor(Math.random() * Number.MAX_SAFE_INTEGER / 1000)) {
    expect(test_interface.unsignedLongLongMethod(i)).toBe(i);
  }
  expect(test_interface.unsignedLongLongMethod(-1) != -1).toBe(true);
});


// FIXME(zino): We should write a test for long type.
// Please see: https://github.com/lunchclass/bacardi/issues/120

test('Test for IDL \'double\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The double type is a floating point numeric type that corresponds to the
  // set of finite double-precision 64 bit IEEE 754 floating point numbers.
  expect(test_interface.doubleMethod(0.123456789012345))
      .toBe(0.123456789012345);

  // FIXME(zino): We should test for comparing single-precision floating point.

  // FIXME(zino): We should check whether the type is restricted or
  // unrestricted.
});

test('Test for IDL \'string\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The string type is not exact matching WebIDL spec but it will convert
  // UTF8 string in platform side.
  expect(test_interface.stringMethod('Hello World!')).toBe('Hello World!');
});
