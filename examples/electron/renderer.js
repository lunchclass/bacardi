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

// This is JS porting implementation from simrank/example/main.cpp.

const bacardi = require('bindings')('bacardi.node');

let electronNative = new bacardi.ElectronNative(5, 0.8);
let nodes = ['Univ', 'ProfA', 'ProfB', 'StudentA', 'StudentB'];

electronNative.addEdge(nodes[0], nodes[1]);
electronNative.addEdge(nodes[0], nodes[2]);
electronNative.addEdge(nodes[1], nodes[3]);
electronNative.addEdge(nodes[3], nodes[0]);
electronNative.addEdge(nodes[2], nodes[4]);
electronNative.addEdge(nodes[4], nodes[2]);

electronNative.calculateSimRank();

nodes.forEach(node_a => {
  nodes.forEach(node_b => {
    if (node_a >= node_b)
      return;
    let s = electronNative.similarity(node_a, node_b);
    if (s > 0) {
      document.write(
          'similarity(' + node_a + ', ' + node_b + ') = ' + s + '<br>');
    }
  });
});
