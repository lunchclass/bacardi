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

. $BACARDI_PATH/bootstrap/common/path_info.sh
. $BACARDI_PATH/bootstrap/common/platform_info.sh

# Check whether the specified command can use in this platform or not.
# Return: 0 if the command can use in this platform.
function can_use_command() {
  type "$1" > /dev/null 2>&1
  return $?
}

# Download file in remote URL starting with http(s).
# $1: Remote file url which is start with http(s).
# $2: The location where the file will be downloaded.
# Return: 0 if the file is downloaded successfully.
function download() {
  local url=$1
  local path=${2:-./}

  if [ -z "$url" ]; then
    return 1
  fi

  echo "Downloading... $url"
  if can_use_command wget; then
    mkdir -p $path && wget $url -P $path > /dev/null 2>&1
  else
    mkdir -p $path && cd $path && \
        { curl -LO $url > /dev/null 2>&1; cd - > /dev/null; }
  fi

  return $?
}

function has_container_directory() {
  local src_path=$1

  if [ "$(dirname $(tar -tf $src_path | head -n 1))" = "." ]; then
    return 0
  fi
  return 1
}

function extract_archive() {
  local src_path=$1
  local dest_path=${2:-./}

  if [ -z "$src_path" ]; then
    return 1
  fi

  if [ ! -f "$src_path" ]; then
    return 2
  fi

  if is_windows_platform; then
    set_path_env $(third_party_path)/win-unzip/bin
  fi

  mkdir -p $dest_path
  echo "Extracting files..."
  case $src_path in
    *.tar.gz|*.tgz) tar -xvzf $src_path -C $dest_path > /dev/null 2>&1 ;;
    *.zip) unzip $src_path -d $dest_path > /dev/null 2>&1 ;;
  esac

  return $?
}
