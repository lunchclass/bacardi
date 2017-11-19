#!/bin/bash
#
# Copyright (c) 2017 The Bacardi Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This file is providing some APIs for string conversions.

# Convert the passed input string to lower string.
# $1: Input string to convert to lower string.
# Out: Converted lower string.
function to_lower() {
  echo $1 | tr '[:upper:]' '[:lower:]'
}

# Convert the passed input string to upper string.
# $1: Input string to convert to upper string.
# Out: Converted upper string.
function to_upper() {
  echo $1 | tr '[:lower:]' '[:upper:]'
}

# Extract input length characters of substring from input string at input
# position.
# $1: Input string
# $2: Input position
# $3: Input length
# Out: Extracted substring
function substr() {
  echo $1 | cut -c $2-$3
}
