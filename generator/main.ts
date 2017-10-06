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

import * as mkdirp from 'mkdirp';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

import * as file from './base/file';
import * as reader from './reader/simple_reader';

import snakeCase = require('snake-case');

import IDLDefinition from './parser/idl_definition';
import Parser from './parser/parser';

const TEMPLATE_DIR = path.resolve(__dirname, '../../../template');

async function generateBacardi(
    env: nunjucks.Environment, output_path: string,
    definitions: IDLDefinition[]) {
  const [cpp_tmpl] = await Promise.all(
      [file.read(path.resolve(TEMPLATE_DIR, 'bacardi_cpp.njk'))]);
  const cpp_file_path = path.resolve(output_path, 'bacardi.cc');

  let idl_interface_names: string[] = [];
  definitions.forEach(async (definition) => {
    if (definition.isIDLInterface()) {
      idl_interface_names.push(definition.name);
    }
  });

  return file.write(
      cpp_file_path, env.renderString(cpp_tmpl, {names: idl_interface_names}));
}

async function generateInterface(
    env: nunjucks.Environment, output_path: string,
    definitions: IDLDefinition[]) {
  const [header_tmpl, cpp_tmpl] = await Promise.all([
    file.read(path.resolve(TEMPLATE_DIR, 'interface_header.njk')),
    file.read(path.resolve(TEMPLATE_DIR, 'interface_cpp.njk'))
  ]);

  definitions.forEach(async (definition) => {
    if (definition.isIDLInterface()) {
      // FIXME(zino): The examples/ directory should be changed to better fixed
      // path.
      const header_file_path = path.resolve(
          output_path, 'examples/' + snakeCase(definition.name) + '_bridge.h');
      const cpp_file_path = path.resolve(
          output_path, 'examples/' + snakeCase(definition.name) + '_bridge.cc');

      await file.write(
          header_file_path, env.renderString(header_tmpl, definition));
      await file.write(cpp_file_path, env.renderString(cpp_tmpl, definition));
    }
  });
}

async function main([out_dir, ...idl_files]) {
  var env = new nunjucks.Environment();
  env.addFilter('camelcase', function(str, count) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      return index == 0 ? match.toUpperCase() : match;
    });
  });
  env.addFilter('snakecase', function(str, count) {
    return snakeCase(str);
  });

  let definitions: IDLDefinition[] =
      await Parser.parse(await reader.readAll(idl_files));
  await generateInterface(env, out_dir, definitions);
  await generateBacardi(env, out_dir, definitions);

  return 0;
}

main(process.argv.slice(2)).then(process.exit).catch(error => {
  console.log(error);
  process.exit(2);
});
