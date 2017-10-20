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

#ifndef EXAMPLES_CALCULATOR_H_
#define EXAMPLES_CALCULATOR_H_

#include <string>

class Calculator {
 public:
  Calculator();
  Calculator(long createTime);
  Calculator(long arg1, long arg2);
  Calculator(const std::string& message1, const std::string& message2);
  static void Print(const std::string& message);

  int32_t Add(int32_t number1, int32_t number2);
  int16_t Sub(int16_t number1, int16_t number2);
  int64_t Mul(int64_t number1, int64_t number2);
  double Div(double number1, double number2);
  bool IsEquals(int16_t number1, int16_t number2);
  double Calculate(const std::string& operatorStr,
                   double number1,
                   double number2);
};

#endif  // EXAMPLES_CALCULATOR_H_
