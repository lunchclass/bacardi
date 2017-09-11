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

#ifndef EXAMPLES_CALCULATOR_BRIDGE_H_
#define EXAMPLES_CALCULATOR_BRIDGE_H_

#include <memory>
#include <napi.h>

#include "examples/calculator.h"

class CalculatorBridge : public Napi::ObjectWrap<CalculatorBridge> {
 public:
  static void Init(Napi::Env env, Napi::Object exports);

  explicit CalculatorBridge(const Napi::CallbackInfo& info);

  // JS bridge implementation for Calculator.
  Napi::Value Add(const Napi::CallbackInfo& info);
  Napi::Value Sub(const Napi::CallbackInfo& info);
  Napi::Value Mul(const Napi::CallbackInfo& info);
  Napi::Value Div(const Napi::CallbackInfo& info);

 private:
  std::unique_ptr<Calculator> impl_;
};

#endif  // EXAMPLES_CALCULATOR_BRIDGE_H_
