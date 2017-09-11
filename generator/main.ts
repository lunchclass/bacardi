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
import * as nunjucks from 'nunjucks';
import * as webidl from 'webidl2';

async function main(idl_files: Array<string>) {
  for (let idl_file of idl_files) {
    let parsedData = webidl.parse(await file.read(idl_file));
    let idl_interface: idls.Interface = new idls.InterfaceImpl(parsedData[0]);
    nunjucks.configure({ trimBlocks:true, lstripBlocks: true });
    console.log(nunjucks.render('./template/interface_header.njk', idl_interface));
  }
  return 0;
}

main(process.argv.slice(2))
    .then(process.exit)
    .catch(() => process.exit(2));
