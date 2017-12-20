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

import {DefinitionInfo} from 'generator/new_parser/definition_info';

interface DefinitionInfoStore {
  [index: string]: DefinitionInfo;
}

const store: DefinitionInfoStore = {};

/**
 * Raw definition information mapping table (exposed to global scope)
 */
export class DefinitionInfoMap {
  public static update(definitionInfos: DefinitionInfo[]): void {
    definitionInfos.forEach((definitionInfo: DefinitionInfo) => {
      store[definitionInfo.name] = definitionInfo;
    });
  }

  public static getByTypeName(typeName: string): DefinitionInfo {
    return store[typeName];
  }
}
