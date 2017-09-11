/*
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

#ifndef CORE_NATIVE_TYPE_TRAITS_H_
#define CORE_NATIVE_TYPE_TRAITS_H_

#include <napi.h>
#include <type_traits>
#include "core/idl_base.h"
#include "core/idl_types.h"

template <typename T, typename SFINAEHelper = void>
struct NativeTypeTraitsBase {
  using ImplType = T;
};

template <typename T>
struct NativeTypeTraitsBase<
    T,
    typename std::enable_if<std::is_base_of<IDLBase, T>::value>::type> {
  using ImplType = typename T::ImplType;
};

template <typename T>
struct NativeTypeTraits : public NativeTypeTraitsBase<T> {
  static inline typename NativeTypeTraitsBase<T>::ImplType NativeValue(
      const Napi::Env& env,
      const Napi::Value& js_value);
};

template <>
struct NativeTypeTraits<IDLDouble> : public NativeTypeTraitsBase<IDLDouble> {
  static double NativeValue(const Napi::Env& env, const Napi::Value& js_value) {
    if (!js_value.IsNumber()) {
      Napi::TypeError::New(env, "It's an invalid number.")
          .ThrowAsJavaScriptException();
      return 0.0;
    }

    return js_value.ToNumber().DoubleValue();
  }          
};

#endif  // CORE_NATIVE_TYPE_TRAITS_H_
