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

#include "examples/calculator.h"

#include <stdio.h>

Calculator::Calculator() {
  printf("new Calculator()\n");
}

Calculator::Calculator(long createTime) {
  printf("new Calculator(long createTime) => %ld\n", createTime);
}

Calculator::Calculator(long arg1, long arg2) {
  printf("new Calculator(long arg1, long arg2) => %ld %ld\n", arg1, arg2);
}

Calculator::Calculator(const std::string& msg1, const std::string& msg2) {
  printf(
      "new Calculator(const std::string& msg1, const std::string& msg2)"
      " => %s %s\n",
      msg1.c_str(), msg2.c_str());
}

void Calculator::Print(const std::string& message) {
  printf("%s\n", message.c_str());
}

int32_t Calculator::Add(int32_t number1, int32_t number2) {
  return number1 + number2;
}

int16_t Calculator::Sub(int16_t number1, int16_t number2) {
  return number1 - number2;
}

int64_t Calculator::Mul(int64_t number1, int64_t number2) {
  return number1 * number2;
}

double Calculator::Div(double number1, double number2) {
  return (number2 != 0) ? (number1 / number2) : 0;
}

bool Calculator::IsEquals(int16_t number1, int16_t number2) {
  return number1 == number2;
}

double Calculator::Calculate(const std::string& operatorStr,
                             double number1,
                             double number2) {
  if (operatorStr.compare("add") == 0) {
    return number1 + number2;
  } else if (operatorStr.compare("sub") == 0) {
    return number1 - number2;
  } else if (operatorStr.compare("mul") == 0) {
    return number1 * number2;
  } else if (operatorStr.compare("div") == 0) {
    return number1 / number2;
  }
  return 0;
}
