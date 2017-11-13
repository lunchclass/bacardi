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

#ifndef TEST_TEST_INTERFACE_H_
#define TEST_TEST_INTERFACE_H_

#include <string>

class TestInterface {
 public:
  TestInterface();
  TestInterface(long number);
  TestInterface(long number1, long number2);
  TestInterface(const std::string& string1, const std::string& string2);

  static const std::string& GetLastCallInfo();

  static void StaticMethod1();
  static bool StaticMethod2(long number, const std::string& string);

  // Basic types
  bool BooleanMethod(bool boolean);
  int8_t ByteMethod(int8_t number);
  uint8_t OctetMethod(uint8_t number);
  short ShortMethod(short number);
  int32_t LongMethod(int32_t number);
  int64_t LongLongMethod(int64_t number);
  uint16_t UnsignedShortMethod(uint16_t number);
  uint32_t UnsignedLongMethod(uint32_t number);
  uint64_t UnsignedLongLongMethod(uint64_t number);
  double DoubleMethod(double number);
  const std::string StringMethod(const std::string& string);

  // Enum
  void VoidMethodTestEnumArg(const std::string& string);

  // Attributes
  void ReadonlyAssignTest(double number);
  static double StaticTest(double number);
  double GetDoubleNumber();
  void SetDoubleNumber(double number);
  double GetReadonlyDoubleNumber();
  static double GetStaticDoubleNumber();
  static void SetStaticDoubleNumber(double number);

 private:
  // FIXME(zino): Currently, we should set this variable in each methods. It's
  // not elegance way. We should find a way to get function name and signature
  // automatically. (I tried __FUNCTION__ and __PRETTY_FUNCTION__ but they are
  // dependent on each platform.
  static std::string last_call_info_;
  double double_number_;
  double readonly_double_number_;
  static double static_double_number_;
};

#endif  // TEST_TEST_INTERFACE_H_
