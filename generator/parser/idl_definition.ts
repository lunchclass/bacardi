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

export default abstract class IDLDefinition {
  public readonly name: string;
  public readonly idl_base_name: string;
  public readonly idl_dir_name: string;
  protected readonly raw_idl_definition_info: {};

  protected constructor(name: string, raw_idl_definition_info: {}) {
    this.name = name;
    this.idl_base_name = raw_idl_definition_info['idlBaseName'];
    this.idl_dir_name = raw_idl_definition_info['idlDirName'];
    this.raw_idl_definition_info = raw_idl_definition_info;
  }

  public abstract render(): void;

  public isIDLInterface(): boolean {
    return this.raw_idl_definition_info['type'] == 'interface';
  }

  public isIDLEnum(): boolean {
    return this.raw_idl_definition_info['type'] == 'enum';
  }

  public isIDLDictionary(): boolean {
    return this.raw_idl_definition_info['type'] == 'dictionary';
  }
}
