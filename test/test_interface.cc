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

#include "test/test_interface.h"

// static
std::string TestInterface::last_call_info_;
double TestInterface::static_double_number_;

TestInterface::TestInterface() {
  last_call_info_ = "Constructor()";
}

TestInterface::TestInterface(long number) {
  last_call_info_ = "Constructor(long)";
}

TestInterface::TestInterface(long number1, long number2) {
  last_call_info_ = "Constructor(long, long)";
}

TestInterface::TestInterface(const std::string& string1,
                             const std::string& string2) {
  last_call_info_ = "Constructor(string, string)";
}

const std::string& TestInterface::GetLastCallInfo() {
  return last_call_info_;
}

void TestInterface::StaticMethod1() {
  last_call_info_ = "static void staticMethod1()";
}

bool TestInterface::StaticMethod2(long number, const std::string& string) {
  last_call_info_ = "static boolean staticMethod2(long, string)";
  return 0;
}

bool TestInterface::BooleanMethod(bool boolean) {
  return boolean;
}

int8_t TestInterface::ByteMethod(int8_t number) {
  return number;
}

uint8_t TestInterface::OctetMethod(uint8_t number) {
  return number;
}

short TestInterface::ShortMethod(short number) {
  return number;
}

uint16_t TestInterface::UnsignedShortMethod(uint16_t number) {
  return number;
}

uint32_t TestInterface::UnsignedLongMethod(uint32_t number) {
  return number;
}

double TestInterface::DoubleMethod(double number) {
  return number;
}

const std::string TestInterface::StringMethod(const std::string& string) {
  return string;
}

void TestInterface::VoidMethodTestEnumArg(const std::string& string) {
  last_call_info_ = "VoidMethodTestEnumArg(" + string + ")";
}

double TestInterface::StaticTest(double number) {
  return TestInterface::static_double_number_;
}

void TestInterface::ReadonlyAssignTest(double number) {
  readonly_double_number_ = number;
}

double TestInterface::GetDoubleNumber() {
  return double_number_;
}
void TestInterface::SetDoubleNumber(double number) {
  double_number_ = number;
}

double TestInterface::GetReadonlyDoubleNumber() {
  return readonly_double_number_;
}

double TestInterface::GetStaticDoubleNumber() {
  return TestInterface::static_double_number_;
}

void TestInterface::SetStaticDoubleNumber(double number) {
  TestInterface::static_double_number_ = number;
}
