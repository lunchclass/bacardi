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

#ifndef CORE_IDL_TYPES_H_
#define CORE_IDL_TYPES_H_

#include "core/idl_base.h"

struct IDLBoolean final : public IDLBaseHelper<bool> {};
struct IDLByte final : public IDLBaseHelper<int8_t> {};
struct IDLDouble final : public IDLBaseHelper<double> {};
struct IDLLongLong final : public IDLBaseHelper<int64_t> {};
struct IDLLong final : public IDLBaseHelper<int32_t> {};
struct IDLOctet final : public IDLBaseHelper<uint8_t> {};
struct IDLShort final : public IDLBaseHelper<int16_t> {};
struct IDLString final : public IDLBaseHelper<std::string> {};

#endif  // CORE_IDL_TYPES_H_
