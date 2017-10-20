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

#ifndef EXAMPLES_ELECTRON_NATIVE_ELECTRON_NATIVE_H_
#define EXAMPLES_ELECTRON_NATIVE_ELECTRON_NATIVE_H_

#include <string>

#include "third_party/simrank/simrank.hpp"

class ElectronNative : public SimRank<std::string> {
 public:
  ElectronNative();
  ElectronNative(int32_t k, double c);

  void AddEdge(const std::string& head, const std::string& tail);
  void CalculateSimRank();
  double Similarity(const std::string& node1, const std::string& node2);
};

#endif  // EXAMPLES_ELECTRON_NATIVE_ELECTRON_NATIVE_H_
