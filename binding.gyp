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
  'includes': [
    'examples/examples.gypi',
    'generator/generator.gypi',
  ],

  'targets': [
    {
      'target_name': 'bacardi',
      'dependencies': [
      ],
      'sources': [
        '<@(examples_cpp_files)',
      ]
    },

    {
      'target_name': 'tsc',
      'type': 'none',
      'actions': [
        {
          'action_name': 'tsc',
          'inputs': [
            '<@(generator_files)',
          ],
          'outputs': [
            '<@(PRODUCT_DIR)/generator',
          ],
          'action': [
            '<@(PRODUCT_DIR)/../../bootstrap/command/tsc',
            '<@(_inputs)',
            '--outDir',
            '<@(_outputs)',
          ],
        },
      ],
    },

    {
      'target_name': 'idl',
      'type': 'none',
      'dependencies': [
        'tsc'
      ],
      'actions': [
        {
          'action_name': 'idl',
          'inputs': [
            '<@(examples_idl_files)',
          ],
          'outputs': [
            '<@(examples_idl_output_files)',
          ],
          'action': [
            '<@(PRODUCT_DIR)/../../bootstrap/command/node',
            '<@(PRODUCT_DIR)/generator/main.js',
            '<@(_inputs)'
          ],
        },
      ],
    },
  ],
}
