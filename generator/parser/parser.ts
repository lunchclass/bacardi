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

import * as webidl from 'webidl2';

import IDLDefinition from './idl_definition';
import IDLDefinitionFactory from './idl_definition_factory';

export default class Parser {
  static async parse(idl_fragment: string): Promise<IDLDefinition[]> {
    const parsed_data: {}[] = webidl.parse(idl_fragment);

    let definitions: IDLDefinition[] = [];
    parsed_data.forEach((definition_info) => {
      definitions.push(IDLDefinitionFactory.create(definition_info));
    });

    return definitions;
  }
}
