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

TestInterface::TestInterface() : called_constructor_info_("Constructor()") {}

TestInterface::TestInterface(long createTime)
    : called_constructor_info_("Constructor(long)") {}

TestInterface::TestInterface(long arg1, long arg2)
    : called_constructor_info_("Constructor(long, long)") {}

TestInterface::TestInterface(const std::string& msg1, const std::string& msg2)
    : called_constructor_info_("Constructor(string, string)") {}

const std::string& TestInterface::GetCalledConstructorInfo() const {
  return called_constructor_info_;
}
