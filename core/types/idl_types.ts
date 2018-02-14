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

/**
 * IDL Definition Information
 */
export type DefinitionInfo = InterfaceInfo | DictionaryInfo | EnumInfo;

/**
 * IDL Type Information
 *
 * @see https://github.com/w3c/webidl2.js#idl-type
 */
export interface TypeInfo {
  readonly sequence: boolean;
  readonly generic?: string;
  readonly idlType: string;
  readonly nullable: boolean;
  readonly union: boolean;
}

/**
 * IDL Interface Information
 *
 * @see https://github.com/w3c/webidl2.js#interface
 */
export interface InterfaceInfo {
  readonly type: 'interface';
  readonly name: string;
  partial: boolean;
  members: InterfaceMemberInfo[];
  inheritance: string;
}

/**
 * IDL Interface Member Information
 *
 * @see https://github.com/w3c/webidl2.js#interface
 */
export type InterfaceMemberInfo = OperationMemberInfo;

/**
 * IDL Dictionary Information
 *
 * @see https://github.com/w3c/webidl2.js#dictionary
 */
export interface DictionaryInfo {
  readonly type: 'dictionary';
  readonly name: string;
  partial: boolean;
  members: DictionaryMemberInfo[];
  inheritance: string;
}

/**
 * IDL Dictionary Member Information
 *
 * @see @see https://github.com/w3c/webidl2.js#dictionary
 */
export interface DictionaryMemberInfo {
  readonly type: 'field';
  readonly name: string;
  readonly required: boolean;
  readonly idlType: TypeInfo;
  readonly default: TypeValue;
}

/**
 * IDL Enum Information
 *
 * @see https://github.com/w3c/webidl2.js#enum
 */
export interface EnumInfo {
  readonly type: 'enum';
  readonly name: string;
  readonly values: TypeValue[];
}

/**
 * IDL Operation Member Information
 *
 * @see https://github.com/w3c/webidl2.js#enum
 */
export interface OperationMemberInfo {
  readonly type: 'operation';
  readonly getter: boolean;
  readonly setter: boolean;
  readonly deleter: boolean;
  readonly static: boolean;
  readonly stringifier: boolean;
  readonly idlType: TypeInfo;
  readonly name: string;
  readonly arguments: ArgumentInfo[];
}

/**
 * IDL Argument(e.g. for an operation) Information
 *
 * @see https://github.com/w3c/webidl2.js#arguments
 */
export interface ArgumentInfo {
  readonly optional: boolean;
  readonly variadic: boolean;
  readonly idlType: TypeInfo;
  readonly name: string;
}

/**
 * IDL TypeValue Information
 *
 * @see https://github.com/w3c/webidl2.js#default-and-const-values
 */
export interface TypeValue {
  readonly type: string;
  readonly value: string;
}
