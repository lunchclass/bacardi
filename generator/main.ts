/*
 * Copyright (c) 2017 The Lunch Class Authors.
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

import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as webidl from 'webidl2';

async function readFile(path: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}

async function main(idls: Array<string>) {
  for (let idl of idls) {
    let parsedData = webidl.parse(await readFile(idl));
    console.log(nunjucks.render('./template/example.njk', {
        context: parsedData[0]
    }));
  }
  return 0;
}

main(process.argv.slice(2))
    .then(process.exit)
    .catch(() => process.exit(2));
