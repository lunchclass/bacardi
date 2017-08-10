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

#include "calculator.h"
#include "calculator_bridge.h"

void Init(napi_env env, napi_value exports, napi_value module, void* priv) {
  napi_property_descriptor addDescriptor = DECLARE_NAPI_METHOD("add", Add);
  napi_define_properties(env, exports, 1, &addDescriptor);
}

napi_value Add(napi_env env, napi_callback_info info) {
  // TODO(zino): Should take arguments and process them.
  napi_value sum;
  napi_status status = napi_create_number(env, Calculator::Add(1, 2), &sum);
  return status == napi_ok ? sum : nullptr;
}

NAPI_MODULE(calculator, Init);
