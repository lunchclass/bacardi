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

import * as file from './base/file';
import * as idls from './idl_parser/idls';
import * as mkdirp from 'mkdirp';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import * as webidl from 'webidl2';

const TEMPLATE_DIR = path.resolve(__dirname, '../../../template');

async function generateInterface(
    env: nunjucks.Environment, input_idl_path: string, output_path: string) {
  const parsedData =
      webidl.parse(await file.read(path.resolve(input_idl_path)));
  const idl_fragments: idls.Fragments = new idls.Fragments(parsedData);

  const [header_tmpl, cpp_tmpl] = await Promise.all([
    file.read(path.resolve(TEMPLATE_DIR, 'interface_header.njk')),
    file.read(path.resolve(TEMPLATE_DIR, 'interface_cpp.njk'))
  ]);

  const idl_name = input_idl_path.replace('.idl', '').replace('.', '');
  for (const definition of idl_fragments.definitions) {
    if (definition instanceof idls.InterfaceImpl) {
      const interfaceImpl: idls.InterfaceImpl =
          definition as idls.InterfaceImpl;

      // FIXME(Hwanseung) : when inferface name is CamelCase, should be change
      // to snake_case for bridges files.
      const header_file_path = path.resolve(
          output_path,
          path.dirname(idl_name) + '/' + interfaceImpl.name.toLowerCase() +
              '_bridge.h');
      const cpp_file_path = path.resolve(
          output_path,
          path.dirname(idl_name) + '/' + interfaceImpl.name.toLowerCase() +
              '_bridge.cc');

      await file.write(
          header_file_path, env.renderString(header_tmpl, interfaceImpl));
      await file.write(
          cpp_file_path, env.renderString(cpp_tmpl, interfaceImpl));
    }
  };

  return;
}

async function main([out_dir, ...idl_files]) {
  var env = new nunjucks.Environment();
  env.addFilter('camelcase', function(str, count) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      return index == 0 ? match.toUpperCase() : match;
    });
  });

  for (let idl_file of idl_files) {
    await generateInterface(env, idl_file, out_dir);
  }
  return 0;
}

main(process.argv.slice(2))
    .then(process.exit)
    .catch(error => {
      console.log(error);
      process.exit(2);
    });
