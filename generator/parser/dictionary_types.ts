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

import IDLDefinition from './idl_definition';
import IDLDictionary from './idl_dictionary';

export default class DictionaryTypes {
  readonly dictionaries: IDLDictionary[];

  constructor(definitions: IDLDefinition[]) {
    this.dictionaries = [];
    definitions.forEach((definition) => {
      if (definition.isIDLDictionary()) {
        this.dictionaries.push(definition as IDLDictionary);
      }
    });
  }

  public isDictionaryType(source: string): IDLDictionary {
    for (const item of this.dictionaries) {
      if (item.name == source) {
        return item;
      }
    }
    return null;
  }
}
