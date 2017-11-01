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

#ifndef CORE_JS_TYPE_TRAITS_H_
#define CORE_JS_TYPE_TRAITS_H_

#include <napi.h>

template <typename T>
inline Napi::Value JSTypeTraits(Napi::Env env, T value) {
  // This should be unreachable.
  return T();
}

#define JS_TYPE_TRAITS_NUMBER(type)                            \
  template <>                                                  \
  inline Napi::Value JSTypeTraits(Napi::Env env, type value) { \
    return Napi::Number::New(env, value);                      \
  }

#define JS_TYPE_TRAITS_BOOLEAN(type)                           \
  template <>                                                  \
  inline Napi::Value JSTypeTraits(Napi::Env env, type value) { \
    return Napi::Boolean::New(env, value);                     \
  }

#define JS_TYPE_TRAITS_STRING(type)                            \
  template <>                                                  \
  inline Napi::Value JSTypeTraits(Napi::Env env, type value) { \
    return Napi::String::New(env, value);                      \
  }

// TODO(corona10): Auto generate JS_TYPE_TRAITS_XXXX.

JS_TYPE_TRAITS_NUMBER(int8_t);
JS_TYPE_TRAITS_NUMBER(uint8_t);
JS_TYPE_TRAITS_NUMBER(int16_t);
JS_TYPE_TRAITS_NUMBER(int32_t);
JS_TYPE_TRAITS_NUMBER(int64_t);
JS_TYPE_TRAITS_NUMBER(double);

JS_TYPE_TRAITS_BOOLEAN(bool);

JS_TYPE_TRAITS_STRING(std::string);

#endif  // CORE_JS_TYPE_TRAITS_H_
