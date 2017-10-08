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

  const std::string& GetCalledConstructorInfo() const;

 private:
  const std::string called_constructor_info_;
};

#endif  // TEST_TEST_INTERFACE_H_
