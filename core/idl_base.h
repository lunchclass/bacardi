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

#ifndef CORE_IDL_BASE_H_
#define CORE_IDL_BASE_H_

// This is the base type for all WebIDL types, such as the ones defined in
// IDLTypes.h. It is defined in a separate location to avoid circular header
// inclusions when one only needs to check if a type inherits from IDLBase.
struct IDLBase {
  using ImplType = void;
};

// If a child class returns a simple type known at the time it is declared, it
// can inherit from IDLBaseHelper to avoid having to set ImplType on its own.
//
// Example:
// struct MyType<double> final : public IDLBaseHelper<double> {};
template <typename T>
struct IDLBaseHelper : public IDLBase {
  using ImplType = T;
};

#endif  // CORE_IDL_BASE_H_
