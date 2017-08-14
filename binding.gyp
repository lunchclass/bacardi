# Copyright (c) 2017 The Lunch Class Authors.
#
# Licensed under the Apache License, Version 2.0 (the 'License');
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an 'AS IS' BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

{
  'targets': [
    {
      'target_name': 'bacardi',
      'variables': {
        'idl_files': [
          'examples/calculator.idl',
        ],
        'idl_output_files': [
          '<(INTERMEDIATE_DIR)/calculator_bridge.cc',
          '<(INTERMEDIATE_DIR)/calculator_bridge.h',
        ],
      },
      'sources': [
        'examples/calculator.cc',
        'examples/calculator.h',
        'examples/calculator_bridge.cc',
        'examples/calculator_bridge.h',
      ],
      'actions': [
        {
          'action_name': 'generate',
          'inputs': [
            'bootstrap/command/node',
            'generator/generator.js',
            '<@(idl_files)',
          ],
          'outputs': [
            '<@(idl_output_files)',
          ],
          'action': [
            'bootstrap/command/node',
            'generator/generator.js',
            '<@(idl_files)'
          ],
        },
      ]
    }
  ]
}
