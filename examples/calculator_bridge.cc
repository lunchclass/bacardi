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

#include "examples/calculator_bridge.h"
#include "core/native_type_traits.h"
#include "examples/calculator.h"

void Init(napi_env env, napi_value exports, napi_value module, void* priv) {
  napi_property_descriptor addDescriptor = DECLARE_NAPI_METHOD("add", Add);
  napi_property_descriptor subDescriptor = DECLARE_NAPI_METHOD("sub", Sub);
  napi_property_descriptor mulDescriptor = DECLARE_NAPI_METHOD("mul", Mul);
  napi_property_descriptor divDescriptor = DECLARE_NAPI_METHOD("div", Div);

  napi_define_properties(env, exports, 1, &addDescriptor);
  napi_define_properties(env, exports, 1, &subDescriptor);
  napi_define_properties(env, exports, 1, &mulDescriptor);
  napi_define_properties(env, exports, 1, &divDescriptor);
}

napi_value Add(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value args[2];
  napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

  if (argc < 2) {
    napi_throw_type_error(env, nullptr, "Wrong number of arguments");
    return nullptr;
  }

  double value0 = NativeTypeTraits<IDLDouble>::NativeValue(env, args[0]);
  double value1 = NativeTypeTraits<IDLDouble>::NativeValue(env, args[1]);

  napi_value sum;
  napi_create_double(env, Calculator::Add(value0, value1), &sum);

  return sum;
}

napi_value Sub(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value args[2];
  napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

  if (argc < 2) {
    napi_throw_type_error(env, nullptr, "Wrong number of arguments");
    return nullptr;
  }

  double value0 = NativeTypeTraits<IDLDouble>::NativeValue(env, args[0]);
  double value1 = NativeTypeTraits<IDLDouble>::NativeValue(env, args[1]);

  napi_value sum;
  napi_create_double(env, Calculator::Sub(value0, value1), &sum);

  return sum;
}

napi_value Mul(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value args[2];
  napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

  if (argc < 2) {
    napi_throw_type_error(env, nullptr, "Wrong number of arguments");
    return nullptr;
  }

  double value0 = NativeTypeTraits<IDLDouble>::NativeValue(env, args[0]);
  double value1 = NativeTypeTraits<IDLDouble>::NativeValue(env, args[1]);

  napi_value sum;
  napi_create_double(env, Calculator::Mul(value0, value1), &sum);

  return sum;
}

napi_value Div(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value args[2];
  napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

  if (argc < 2) {
    napi_throw_type_error(env, nullptr, "Wrong number of arguments");
    return nullptr;
  }

  double value0 = NativeTypeTraits<IDLDouble>::NativeValue(env, args[0]);
  double value1 = NativeTypeTraits<IDLDouble>::NativeValue(env, args[1]);

  napi_value sum;
  napi_create_double(env, Calculator::Div(value0, value1), &sum);

  return sum;
}

NAPI_MODULE(calculator, Init);
