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

import {
    DefinitionInfo, DictionaryInfo, EnumInfo, InterfaceInfo
  } from 'generator/new_parser/definition_info';

interface DefinitionInfoStore {
  [index: string]: DefinitionInfo;
}

const store: DefinitionInfoStore = {};

// FIXME(zino): Can we merge updateInterfaceInfo() with updateDictionaryInfo()?
// They have the same logic but it's not resolved as a generic type.
function updateInterfaceInfo(info: InterfaceInfo): void {
  const storedInfo: DefinitionInfo = store[info.name];

  if (storedInfo === undefined) {
    store[info.name] = info;

    return;
  }

  if (storedInfo.type !== info.type) {
    throw new SyntaxError('IDL defintions are duplicated');
  }

  // In this case, one of thing is partial interface. So, we should merge them.
  storedInfo.partial = false;
  storedInfo.inheritance = storedInfo.inheritance || info.inheritance;
  storedInfo.members = storedInfo.members.concat(info.members);
}

function updateDictionaryInfo(info: DictionaryInfo): void {
  const storedInfo: DefinitionInfo = store[info.name];

  if (storedInfo === undefined) {
    store[info.name] = info;

    return;
  }

  if (storedInfo.type !== info.type) {
    throw new SyntaxError('IDL defintions are duplicated');
  }

  // In this case, one of thing is partial interface. So, we should merge them.
  storedInfo.partial = false;
  storedInfo.inheritance = storedInfo.inheritance || info.inheritance;
  storedInfo.members = storedInfo.members.concat(info.members);
}

function updateEnumInfo(info: EnumInfo): void {
  const storedInfo: DefinitionInfo = store[info.name];

  if (storedInfo === undefined) {
    store[info.name] = info;

    return;
  }

  throw new SyntaxError('IDL defintions are duplicated');
}

function updateDefinitionInfo(info: DefinitionInfo): void {
  switch (info.type) {
  case 'interface':
    updateInterfaceInfo(info as InterfaceInfo);
    break;
  case 'dictionary':
    updateDictionaryInfo(info as DictionaryInfo);
    break;
  case 'enum':
    updateEnumInfo(info as EnumInfo);
    break;
  default:
  }
}

/**
 * Raw definition information mapping table (exposed to global scope)
 */
export class DefinitionInfoMap {
  public static update(definitionInfos: DefinitionInfo[]): void {
    definitionInfos.forEach((info: DefinitionInfo) => {
      updateDefinitionInfo(info);
    });
  }

  public static getByTypeName(typeName: string): DefinitionInfo {
    return store[typeName];
  }
}
