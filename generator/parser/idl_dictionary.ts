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
import IDLIdentifier from './idl_identifier';

class DictionaryMember implements IDLIdentifier {
  readonly type: string;
  readonly name: string;

  constructor(raw_member_info: {}) {
    this.type = raw_member_info['idlType']['idlType'];
    this.name = raw_member_info['name'];
  }
}

export default class IDLDictionary extends IDLDefinition {
  readonly members: DictionaryMember[];

  constructor(raw_idl_dic_info: {}) {
    super(raw_idl_dic_info['name'], raw_idl_dic_info);

    this.members = [];

    raw_idl_dic_info['members'].forEach(raw_member_info => {
      this.members.push(new DictionaryMember(raw_member_info));
    });
  }

  render(): void {
    // TODO(zino): We should implement this function.
  }
}
