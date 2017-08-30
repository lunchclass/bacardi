/*
 * Copyright (c) 2017 The Lunch Class Authors.
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

#include <node_api.h>
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
      napi_env env,
      napi_value jsValue);
};

template <>
struct NativeTypeTraits<IDLDouble> : public NativeTypeTraitsBase<IDLDouble> {
  static double NativeValue(napi_env env, napi_value js_value) {
    napi_valuetype js_type;
    napi_typeof(env, js_value, &js_type);
    if (js_type != napi_number) {
      // TODO(zino): We need a way to inform this exception to caller.
      napi_throw_type_error(env, nullptr, "Wrong arguments");
      return 0.0;
    }

    double native_value;
    napi_get_value_double(env, js_value, &native_value);
    return native_value;
  }          
};

#endif  // CORE_NATIVE_TYPE_TRAITS_H_
