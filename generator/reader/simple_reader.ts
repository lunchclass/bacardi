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

import * as file from '../../core/base/file';

export async function readAll(idl_files: string[]):
    Promise<[string, string][]> {
  let read_tasks: Promise<string>[] = [];
  idl_files.forEach((idl_file: string) => {
    read_tasks.push(file.read(idl_file));
  });

  let idl_contents: string[] = await Promise.all(read_tasks);
  // assert idl_files.length == idl_contents.length;

  let idl_fragments: [string, string][] = [];
  for (let i: number = 0; i < idl_files.length; i++) {
    idl_fragments.push([idl_files[i], idl_contents[i]]);
  }

  return idl_fragments;
}
