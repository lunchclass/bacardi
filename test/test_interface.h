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
  double DoubleMethod(double number);
  const std::string StringMethod(const std::string& string);

  // Enum
  void VoidMethodTestEnumArg(const std::string& string);

  // Attributes
  double doubleNumber;
  double readonlyDoubleNumber;
  static double staticDoubleNumber;
  double GetDoubleAttribute();
  void ReadonlyAssignTest(double number);
  static double StaticTest(double number);

 private:
  // FIXME(zino): Currently, we should set this variable in each methods. It's
  // not elegance way. We should find a way to get function name and signature
  // automatically. (I tried __FUNCTION__ and __PRETTY_FUNCTION__ but they are
  // dependent on each platform.
  static std::string last_call_info_;
};

#endif  // TEST_TEST_INTERFACE_H_
