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

export const enum IdentifierType {
  RightHandSide,
}

export interface Definition {
  name: string;
}

export interface Identifier { type: IdentifierType; }

export interface ExtendedAttribute {
  name: string;
  arguments: Array<Argument>;
  rhs: RightHandSide;
}

export interface Interface extends Definition {
  members: Array<InterfaceMember>;
  extAttrs: Array<ExtendedAttribute>;
}

export interface Enum extends Definition {}

export interface RightHandSide extends Identifier {}

export class RightHandSideImpl implements RightHandSide {
  type: IdentifierType;

  constructor(rhs_info) {
    this.type = IdentifierType.RightHandSide;
  }
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
  is_static: boolean;

  constructor(member_info) {
    this.name = member_info.name;
    this.type = member_info.idlType.idlType;
    this.is_static = member_info.static;

    this.arguments = new Array<Argument>();
    if (member_info['type'] == 'operation') {
      member_info.arguments.forEach(argument => {
        this.arguments.push(new ArgumentImpl(argument));
      });
    }
  }
}

export class ExtendedAttributeImpl implements ExtendedAttribute {
  name: string;
  arguments: Array<Argument>;
  rhs: RightHandSide;

  constructor(extAttr_info) {
    this.name = extAttr_info.name;
    this.rhs = new RightHandSideImpl(extAttr_info.rhs);

    this.arguments = new Array<Argument>();
    extAttr_info.arguments.forEach(argument => {
      this.arguments.push(new ArgumentImpl(argument));
    });
  }
}

export class InterfaceImpl implements Interface {
  name: string;
  members: Array<InterfaceMemberImpl>;
  extAttrs: Array<ExtendedAttributeImpl>;

  constructor(interface_info: any) {
    this.name = interface_info.name;

    this.members = new Array<InterfaceMemberImpl>();
    interface_info.members.forEach(member => {
      this.members.push(new InterfaceMemberImpl(member));
    });

    this.extAttrs = new Array<ExtendedAttributeImpl>();
    interface_info.extAttrs.forEach(extAttr => {
      this.extAttrs.push(new ExtendedAttributeImpl(extAttr));
    });
  }
}

export class InterfaceNames {
  names: Array<String>;

  constructor(interface_names) {
    this.names = new Array<String>();
    for (let name of interface_names) {
      this.names.push(new String(name));
    }
  }
}

export class EnumImpl implements Enum {
  name: string;

  // FIXME(hwanseung): should be implement Enum
  constructor(enum_info: any) {
    this.name = enum_info.name;
  }
}

export class Fragments {
  definitions: Array<Definition>;

  constructor(raw_idl_infos: any) {
    this.definitions = new Array<Definition>();
    raw_idl_infos.forEach(raw_idl_info => {
      if (raw_idl_info['type'] == 'interface') {
        this.definitions.push(new InterfaceImpl(raw_idl_info));
      } else if (raw_idl_info['type'] == 'enum') {
        this.definitions.push(new EnumImpl(raw_idl_info));
      } else {
        // FIXME: should implement dictionaries, typedefs or etc.
      }
    });
  }
}
