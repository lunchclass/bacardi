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

void CalculatorBridge::Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_property_descriptor properties[] = {
      EXPOSE_STATIC_METHOD("add", Add), EXPOSE_STATIC_METHOD("sub", Sub),
      EXPOSE_STATIC_METHOD("mul", Mul), EXPOSE_STATIC_METHOD("div", Div),
  };

  napi_value cons;
  status = napi_define_class(env, "Calculator", New, nullptr,
                             4 /* properties count */, properties, &cons);

  status = napi_set_named_property(env, exports, "Calculator", cons);
}

napi_value CalculatorBridge::New(napi_env env, napi_callback_info info) {
  // JS constructor is called but we ignores it.
  return nullptr;
}

napi_value CalculatorBridge::Add(napi_env env, napi_callback_info info) {
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

napi_value CalculatorBridge::Sub(napi_env env, napi_callback_info info) {
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

napi_value CalculatorBridge::Mul(napi_env env, napi_callback_info info) {
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

napi_value CalculatorBridge::Div(napi_env env, napi_callback_info info) {
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
