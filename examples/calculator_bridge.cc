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

#include "examples/calculator_bridge.h"

#include "core/native_type_traits.h"

void CalculatorBridge::Init(Napi::Env env, Napi::Object exports) {
  Napi::Function js_constructor =
      DefineClass(env, "Calculator",
                  {
                      InstanceMethod("add", &CalculatorBridge::Add),
                      InstanceMethod("sub", &CalculatorBridge::Sub),
                      InstanceMethod("mul", &CalculatorBridge::Mul),
                      InstanceMethod("div", &CalculatorBridge::Div),
                  });
  exports.Set("Calculator", js_constructor);
}

CalculatorBridge::CalculatorBridge(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<CalculatorBridge>(info), impl_(new Calculator()) {}

Napi::Value CalculatorBridge::Add(const Napi::CallbackInfo& info) {
  if (info.Length() != 2) {
    Napi::RangeError::New(info.Env(), "Wrong number of arguments.")
        .ThrowAsJavaScriptException();
    return Napi::Number();
  }

  double value0 = NativeTypeTraits<IDLDouble>::NativeValue(info.Env(), info[0]);
  double value1 = NativeTypeTraits<IDLDouble>::NativeValue(info.Env(), info[1]);

  return Napi::Number::New(info.Env(), impl_->Add(value0, value1));
}

Napi::Value CalculatorBridge::Sub(const Napi::CallbackInfo& info) {
  if (info.Length() != 2) {
    Napi::RangeError::New(info.Env(), "Wrong number of arguments.")
        .ThrowAsJavaScriptException();
    return Napi::Number();
  }

  double value0 = NativeTypeTraits<IDLDouble>::NativeValue(info.Env(), info[0]);
  double value1 = NativeTypeTraits<IDLDouble>::NativeValue(info.Env(), info[1]);

  return Napi::Number::New(info.Env(), impl_->Sub(value0, value1));
}

Napi::Value CalculatorBridge::Mul(const Napi::CallbackInfo& info) {
  if (info.Length() != 2) {
    Napi::RangeError::New(info.Env(), "Wrong number of arguments.")
        .ThrowAsJavaScriptException();
    return Napi::Number();
  }

  double value0 = NativeTypeTraits<IDLDouble>::NativeValue(info.Env(), info[0]);
  double value1 = NativeTypeTraits<IDLDouble>::NativeValue(info.Env(), info[1]);

  return Napi::Number::New(info.Env(), impl_->Mul(value0, value1));
}

Napi::Value CalculatorBridge::Div(const Napi::CallbackInfo& info) {
  if (info.Length() != 2) {
    Napi::RangeError::New(info.Env(), "Wrong number of arguments.")
        .ThrowAsJavaScriptException();
    return Napi::Number();
  }

  double value0 = NativeTypeTraits<IDLDouble>::NativeValue(info.Env(), info[0]);
  double value1 = NativeTypeTraits<IDLDouble>::NativeValue(info.Env(), info[1]);

  return Napi::Number::New(info.Env(), impl_->Div(value0, value1));
}
