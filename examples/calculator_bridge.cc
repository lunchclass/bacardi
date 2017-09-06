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

#include "examples/calculator.h"

void CalculatorBridge::Init(Napi::Env env, Napi::Object exports) {
  Napi::Function js_constructor =
      DefineClass(env, "Calculator",
                  {
                      StaticMethod("add", &Add), StaticMethod("sub", &Sub),
                      StaticMethod("mul", &Mul), StaticMethod("div", &Div),
                  });
  exports.Set("Calculator", js_constructor);
}

CalculatorBridge::CalculatorBridge(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<CalculatorBridge>(info) {}

Napi::Value CalculatorBridge::Add(const Napi::CallbackInfo& info) {
  if (info.Length() != 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
    Napi::Error::New(info.Env(), "Wrong number of arguments.")
        .ThrowAsJavaScriptException();
    return Napi::Number();
  }
  
  double value0 = info[0].ToNumber().DoubleValue();
  double value1 = info[1].ToNumber().DoubleValue();

  return Napi::Number::New(info.Env(), Calculator::Add(value0, value1));
}

Napi::Value CalculatorBridge::Sub(const Napi::CallbackInfo& info) {
  if (info.Length() != 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
    Napi::Error::New(info.Env(), "Wrong number of arguments.")
        .ThrowAsJavaScriptException();
    return Napi::Number();
  }
  
  double value0 = info[0].ToNumber().DoubleValue();
  double value1 = info[1].ToNumber().DoubleValue();

  return Napi::Number::New(info.Env(), Calculator::Sub(value0, value1));
}

Napi::Value CalculatorBridge::Mul(const Napi::CallbackInfo& info) {
  if (info.Length() != 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
    Napi::Error::New(info.Env(), "Wrong number of arguments.")
        .ThrowAsJavaScriptException();
    return Napi::Number();
  }
  
  double value0 = info[0].ToNumber().DoubleValue();
  double value1 = info[1].ToNumber().DoubleValue();

  return Napi::Number::New(info.Env(), Calculator::Mul(value0, value1));
}

Napi::Value CalculatorBridge::Div(const Napi::CallbackInfo& info) {
  if (info.Length() != 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
    Napi::Error::New(info.Env(), "Wrong number of arguments.")
        .ThrowAsJavaScriptException();
    return Napi::Number();
  }
  
  double value0 = info[0].ToNumber().DoubleValue();
  double value1 = info[1].ToNumber().DoubleValue();

  return Napi::Number::New(info.Env(), Calculator::Div(value0, value1));
}
