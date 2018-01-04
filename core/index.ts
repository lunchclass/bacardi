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

import {IDLTypeMap} from 'core/parser/idl_type_map';
import {DefinitionInfo} from 'core/parser/idl_types';
import {Parser} from 'core/parser/parser';
import * as file from 'generator/base/file';

async function readAndParse(idlFilePath: string): Promise<void> {
  const idlFragment: string = await file.read(idlFilePath);
  const idlDefinitionInfos: DefinitionInfo[] = await Parser.parse(idlFragment);
  IDLTypeMap.update(idlDefinitionInfos);
}

async function buildIDLTypeMap(idlFilePaths: string[]): Promise<void> {
  const tasks: Promise<void>[] = [];
  idlFilePaths.forEach((idlFilePath) => {
    tasks.push(readAndParse(idlFilePath));
  });

  await Promise.all(tasks);
}

export async function run(idlFilePaths: string[]): Promise<number> {
  await buildIDLTypeMap(idlFilePaths);

  return 0;
}
