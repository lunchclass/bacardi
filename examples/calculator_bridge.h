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

#ifndef EXAMPLES_CALCULATOR_BRIDGE_H_
#define EXAMPLES_CALCULATOR_BRIDGE_H_

#include <node_api.h>

class CalculatorBridge {
 public:
  static void Init(napi_env env, napi_value exports);

  static napi_value New(napi_env env, napi_callback_info info);

  // JS bridge implementation for Calculator.
  static napi_value Add(napi_env env, napi_callback_info info);
  static napi_value Sub(napi_env env, napi_callback_info info);
  static napi_value Mul(napi_env env, napi_callback_info info);
  static napi_value Div(napi_env env, napi_callback_info info);
};

#define EXPOSE_STATIC_METHOD(name, func) \
  { name, 0, func, 0, 0, 0, napi_static, 0 }

#endif  // EXAMPLES_CALCULATOR_BRIDGE_H_
