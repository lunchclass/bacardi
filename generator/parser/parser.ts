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

import * as path from 'path';
import * as webidl from 'webidl2';

import IDLDefinition from './idl_definition';
import IDLDefinitionFactory from './idl_definition_factory';

export default class Parser {
  static async parse(idl_fragments: [string, string][]):
      Promise<IDLDefinition[]> {
    let definitions: IDLDefinition[] = [];

    idl_fragments.forEach((idl_fragment) => {
      const parsed_data: {}[] = this.parseIDLFragment(idl_fragment);

      parsed_data.forEach((definition_info) => {
        definitions.push(IDLDefinitionFactory.create(definition_info));
      });
    });

    return definitions;
  }

  private static parseIDLFragment(idl_fragment: [string, string]) {
    const idl_fragment_path = idl_fragment[0];
    const idl_fragment_contents = idl_fragment[1];

    let parsed_data: {}[] = webidl.parse(idl_fragment_contents);

    parsed_data.forEach((definition_info) => {
      definition_info['idlBaseName'] = path.basename(idl_fragment_path);
      definition_info['idlDirName'] = path.dirname(idl_fragment_path);
    });

    return parsed_data;
  }
}
