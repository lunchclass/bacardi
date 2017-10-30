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
import IDLEnum from './idl_enum';
import IDLIdentifier from './idl_identifier';

// FIXME(zino): We should consider attribute and operation concept.

class Argument implements IDLIdentifier {
  readonly type: string;
  readonly name: string;
  enum?: IDLEnum;

  constructor(raw_argument_info: {}) {
    this.type = raw_argument_info['idlType']['idlType'];
    this.name = raw_argument_info['name'];
    this.enum = null;
  }
}

class InterfaceConstructor implements IDLIdentifier {
  readonly type: string;
  readonly name: string;
  readonly arguments: Argument[];

  constructor(raw_constructor_info: {}) {
    this.type = raw_constructor_info['name'];
    this.name = raw_constructor_info['name'];
    this.arguments = [];
    raw_constructor_info['arguments'].forEach(argument => {
      this.arguments.push(new Argument(argument));
    });
  }
}

class InterfaceMember implements IDLIdentifier {
  readonly type: string;
  readonly name: string;
  readonly arguments?: Argument[];
  readonly is_static: boolean;
  readonly is_readonly: boolean;
  readonly member_type: string;

  constructor(raw_member_info: {}) {
    this.type = raw_member_info['idlType']['idlType'];
    this.name = raw_member_info['name'];
    this.is_static = raw_member_info['static'];
    this.is_readonly = raw_member_info['readonly'];
    this.member_type = raw_member_info['type'];
    if (this.member_type == 'operation') {
      this.arguments = [];
      raw_member_info['arguments'].forEach(argument => {
        this.arguments.push(new Argument(argument));
      });
    } else {
      this.arguments = null;
    }
  }
}


export default class IDLInterface extends IDLDefinition {
  constructors: InterfaceConstructor[];
  members: InterfaceMember[];

  constructor(raw_idl_interface_info: {}) {
    super(raw_idl_interface_info['name'], raw_idl_interface_info);

    this.members = [];
    raw_idl_interface_info['members'].forEach(raw_member_info => {
      this.members.push(new InterfaceMember(raw_member_info));
    });

    this.constructors = [];
    raw_idl_interface_info['extAttrs'].forEach(raw_constructor_info => {
      this.constructors.push(new InterfaceConstructor(raw_constructor_info));
    });
  }

  render(): void {
    // TODO(zino): We should implement this function.
  }
}
