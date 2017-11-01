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

#ifndef CORE_NATIVE_TYPE_TRAITS_H_
#define CORE_NATIVE_TYPE_TRAITS_H_

#include <napi.h>
#include <string>
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
  static inline typename NativeTypeTraitsBase<T>::ImplType IsTypeEquals(
      const Napi::Value& js_value);
};

// The boolean type has two values: true and false.
template <>
struct NativeTypeTraits<IDLBoolean> : public NativeTypeTraitsBase<IDLBoolean> {
  static bool NativeValue(const Napi::Env& env, const Napi::Value& js_value) {
    if (!js_value.IsBoolean()) {
      Napi::TypeError::New(env, "It's an invalid value.")
          .ThrowAsJavaScriptException();
      return false;
    }

    return js_value.ToBoolean().Value();
  }

  static bool IsTypeEquals(const Napi::Value& js_value) {
    return js_value.IsBoolean();
  }
};

// The byte type is a signed integer type that has values in the range [-128,
// 127].
template <>
struct NativeTypeTraits<IDLByte> : public NativeTypeTraitsBase<IDLByte> {
  static int8_t NativeValue(const Napi::Env& env, const Napi::Value& js_value) {
    if (!js_value.IsNumber()) {
      Napi::TypeError::New(env, "It's an invalid number.")
          .ThrowAsJavaScriptException();
      return 0;
    }
    return static_cast<int8_t>(js_value.ToNumber().Int32Value());
  }

  static bool IsTypeEquals(const Napi::Value& js_value) {
    return js_value.IsNumber();
  }
};

// The double type is a floating point numeric type that corresponds to the set
// of finite double-precision 64 bit IEEE 754 floating point numbers.
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

  static bool IsTypeEquals(const Napi::Value& js_value) {
    return js_value.IsNumber();
  }
};

// The long type is a signed integer type that has values in the range
// [−2147483648, 2147483647].
template <>
struct NativeTypeTraits<IDLLong> : public NativeTypeTraitsBase<IDLLong> {
  static int32_t NativeValue(const Napi::Env& env,
                             const Napi::Value& js_value) {
    if (!js_value.IsNumber()) {
      Napi::TypeError::New(env, "It's an invalid number.")
          .ThrowAsJavaScriptException();
      return 0;
    }

    return js_value.ToNumber().Int32Value();
  }

  static bool IsTypeEquals(const Napi::Value& js_value) {
    return js_value.IsNumber();
  }
};

// The long long type is a signed integer type that has values in the range
// [−9223372036854775808, 9223372036854775807].
template <>
struct NativeTypeTraits<IDLLongLong>
    : public NativeTypeTraitsBase<IDLLongLong> {
  static int64_t NativeValue(const Napi::Env& env,
                             const Napi::Value& js_value) {
    if (!js_value.IsNumber()) {
      Napi::TypeError::New(env, "It's an invalid number.")
          .ThrowAsJavaScriptException();
      return 0;
    }

    return js_value.ToNumber().Int64Value();
  }

  static bool IsTypeEquals(const Napi::Value& js_value) {
    return js_value.IsNumber();
  }
};

// The octet type is an unsigned integer type that has values in the range [0,
// 255].
template <>
struct NativeTypeTraits<IDLOctet> : public NativeTypeTraitsBase<IDLOctet> {
  static uint8_t NativeValue(const Napi::Env& env,
                             const Napi::Value& js_value) {
    if (!js_value.IsNumber()) {
      Napi::TypeError::New(env, "It's an invalid number.")
          .ThrowAsJavaScriptException();
      return 0;
    }
    return static_cast<uint8_t>(js_value.ToNumber().Int32Value());
  }

  static bool IsTypeEquals(const Napi::Value& js_value) {
    return js_value.IsNumber();
  }
};

// The short type is a signed integer type that has values in the range [−32768,
// 32767].
template <>
struct NativeTypeTraits<IDLShort> : public NativeTypeTraitsBase<IDLShort> {
  static int16_t NativeValue(const Napi::Env& env,
                             const Napi::Value& js_value) {
    if (!js_value.IsNumber()) {
      Napi::TypeError::New(env, "It's an invalid number.")
          .ThrowAsJavaScriptException();
      return 0;
    }

    return static_cast<int16_t>(js_value.ToNumber().Int32Value());
  }

  static bool IsTypeEquals(const Napi::Value& js_value) {
    return js_value.IsNumber();
  }
};

template <>
struct NativeTypeTraits<IDLString> : public NativeTypeTraitsBase<IDLString> {
  static std::string NativeValue(const Napi::Env& env,
                                 const Napi::Value& js_value) {
    if (!js_value.IsString()) {
      Napi::TypeError::New(env, "It's an invalid string.")
          .ThrowAsJavaScriptException();
      return std::string();
    }

    return js_value.ToString().Utf8Value();
  }

  static bool IsTypeEquals(const Napi::Value& js_value) {
    return js_value.IsString();
  }
};

#endif  // CORE_NATIVE_TYPE_TRAITS_H_
