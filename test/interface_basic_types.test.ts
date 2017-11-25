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

test('Test for IDL \'long\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The long type is a signed integer type that has values in the range
  // [-2147483648, 2147483647].
  expect(test_interface.longMethod(2147483647)).toBe(2147483647);
  expect(test_interface.longMethod(-2147483648)).toBe(-2147483648);
  expect(test_interface.longMethod(2147483648) != 2147483648).toBe(true);
  expect(test_interface.longMethod(-2147483649) != -2147483649).toBe(true);
});

test('Test for IDL \'long long\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The short type is a signed integer type that has values in the range
  // [−92233720386854775808, 9223372036854775807].

  // The range of intger type in TypeScript is [-(2^53-1), 2^53-1],
  // But, that of long long in WebIDL is [2^63, 2^63-1]
  // So we are not able to do overflow test
  // and check whether it returns a correct result for values beyond
  // TypeScript's range.

  expect(test_interface.longLongMethod(0)).toBe(0);
  for (let i = Number.MIN_SAFE_INTEGER; i < Number.MAX_SAFE_INTEGER;
       i += Math.floor(Math.random() * Number.MAX_SAFE_INTEGER / 1000)) {
    expect(test_interface.longLongMethod(i)).toBe(i);
  }

  // The code below does not work, because of the language limitation used here
  // expect(test_interface.unsignedLongLongMethod(-1) != -1).toBe(true);
  // expect(test_interface.longLongMethod(923372036854775807)).toBe(923372036854775807);
  // expect(test_interface.longLongMethod(-923372036754775808)).toBe(-923372036854775808);
  // expect(test_interface.longLongMethod(923372036754775808) !=
  // 923372036854775808).toBe(true);
  // expect(test_interface.longLongMethod(-923372036754775809) !=
  // -923372036854775809).toBe(true);

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
  for (let i = 1; i < Number.MAX_SAFE_INTEGER;
       i += Math.floor(Math.random() * Number.MAX_SAFE_INTEGER / 1000)) {
    expect(test_interface.unsignedLongLongMethod(i)).toBe(i);
  }
  expect(test_interface.unsignedLongLongMethod(-1) != -1).toBe(true);
});

test('Test for IDL \'float\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The float type is a floating point numeric type that corresponds to the set
  // of finite single-precision 32 bit IEEE 754 floating point numbers.

  expect(test_interface.floatMethod(0.0)).toBe(0.0);

  const base = 1 / 2;
  const precision = 23;
  for (let test_case = 0; test_case < 100; test_case++) {
    // for fraction part
    // create a random number that has 23 bits precision
    let fraction = 1;  // set the biggest bit.
    for (let i = 1; i < precision; i++) {
      if (Math.random() > 0.5)
        fraction += base ** i;
    }
    fraction += base ** precision  // set the smallest bit

    // for exponent part
    // test all value of exponent part
    // because exponent value -127 is used to express 0
    // so this must start from -126.
    for (let i = -126; i <= 127; i++) {
      let float_value = fraction * (2 ** i);
      expect(test_interface.floatMethod(float_value)).toBe(float_value);
    }

    // these two cases are beyond the range of floating-point
    let float_value = fraction * (2 ** -127);
    expect(test_interface.floatMethod(float_value) != float_value).toBe(true);
    float_value = fraction * (2 ** 128);
    expect(test_interface.floatMethod(float_value) != float_value).toBe(true);
  }

  let float_min = 2 ** (-149);
  ;
  expect(test_interface.floatMethod(float_min)).toBe(float_min);
  // the value beyond the range of exponent
  expect(test_interface.floatMethod(float_min / 2) != float_min / 2).toBe(true);
  expect(test_interface.floatMethod(float_min / 2) != float_min / 2).toBe(true);
});

test('Test for IDL \'double\' type', async () => {
  let test_interface = new bacardi.TestInterface();

  // The double type is a floating point numeric type that corresponds to the
  // set of finite double-precision 64 bit IEEE 754 floating point numbers.

  expect(test_interface.doubleMethod(0.123456789012345))
      .toBe(0.123456789012345);

  const base = 1 / 2;
  const precision = 52;
  for (let test_case = 0; test_case < 100; test_case++) {
    // for fraction part
    // create a random number that has 52 bits precision
    let fraction = 1;  // set the biggest bit.
    for (let i = 1; i < precision; i++) {
      if (Math.random() > 0.5)
        fraction += base ** i;
    }
    fraction += base ** precision;  // set the smallest bit

    // for exponent part
    // test all value of exponent part
    // because exponent value -1022 is used to express 0
    // so this must start from -1022.
    for (let i = -1022; i <= 1023; i += Math.ceil(Math.random() * 100)) {
      let double_value = fraction * (2 ** i);
      expect(test_interface.doubleMethod(double_value)).toBe(double_value);
    }
    // Note that the range of double and the range of number in typescript is
    // the same, so we can not test the value out of the range.
});

test('Test for IDL \'string\' type', async () => {
  let test_interface = new bacardi.TestInterface();
	
  // The string type is not exact matching WebIDL spec but it will convert
  // UTF8 string in platform side.
  expect(test_interface.stringMethod('Hello World!')).toBe('Hello World!');
});
