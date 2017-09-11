/*
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

export interface TypedIdentifier {
  name: string;
  type: string;
}

export interface Argument extends TypedIdentifier {
}

export interface InterfaceMember extends TypedIdentifier {
  arguments: Array<Argument>;
}

export interface Interface {
  name: string;
  members: Array<InterfaceMember>;
}

export class ArgumentImpl implements Argument {
  name: string;
  type: string;

  constructor(argument_info) {
    this.name = argument_info.name;
    this.type = argument_info.idlType.idlType;
  }
}

export class InterfaceMemberImpl implements InterfaceMember {
  name: string;
  type: string;
  arguments: Array<Argument>;

  constructor(member_info) {
    this.name = member_info.name;
    this.type = member_info.idlType.idlType;

    this.arguments = new Array<Argument>();
    if (member_info['type'] == 'operation') {
      member_info.arguments.forEach(argument => {
        this.arguments.push(new ArgumentImpl(argument));
      });
    }
  }
}

export class InterfaceImpl implements Interface {
  name: string;
  members: Array<InterfaceMemberImpl>;

  constructor(raw_idl_info: any) {
    this.name = raw_idl_info.name;

    this.members = new Array<InterfaceMemberImpl>();
    raw_idl_info.members.forEach(member => {
      this.members.push(new InterfaceMemberImpl(member));
    });
  }
}
