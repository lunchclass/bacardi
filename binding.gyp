# Copyright (c) 2017 The Bacardi Authors.
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
    'generator/generator.gypi',
  ],

  'variables': {
    'bacardi_command%': './bacardi',
    'conditions': [
      ['OS == "win"', {
        'bacardi_command': 'bacardi.cmd',
      }],
    ],
  },

  'targets': [
    {
      'target_name': 'bacardi',
      'dependencies': [
        'idl',
      ],
      'conditions': [
        ['OS!="win"',
        {
          'dependencies': [
            '<!@(./bootstrap/command/node -p \'require("node-addon-api").gyp\')',
          ],
          'include_dirs': [
            './',
            '<@(SHARED_INTERMEDIATE_DIR)',
            '<!@(./bootstrap/command/node -p \'require("node-addon-api").include\')',
          ],
        }],
        ['OS=="win"',
        {
          'dependencies': [
            '<!(third_party\\node\\node.exe -p "require(\'node-addon-api\').gyp")',
          ],
          'include_dirs': [
            './',
            '<@(SHARED_INTERMEDIATE_DIR)',
            '<!@(third_party\\node\\node.exe -p "require(\'node-addon-api\').include")',
          ],
        }],
      ],
      'sources': [
        '<!@(<(bacardi_command) list_cpp_files --silent)',
        '<!@(<(bacardi_command) list_generated_cpp_files --silent)',
        '<(SHARED_INTERMEDIATE_DIR)/bacardi.cc',
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
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
          'conditions': [
            ['OS!="win"',
            {
              'action': [
                '<@(PRODUCT_DIR)/../../bootstrap/command/tsc',
                '<@(_inputs)',
                '--outDir',
                '<@(_outputs)',
                ],
            }],
            ['OS=="win"',
            {
              'action': [
                '<@(PRODUCT_DIR)/../../third_party/node/node.exe <@(PRODUCT_DIR)/../../node_modules/typescript/bin/tsc --lib es2015',
                '<@(_inputs)',
                '--outDir',
                '<@(_outputs)',
                ],
            }],
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
            '<!@(<(bacardi_command) list_idl_files --silent)',
          ],
          'outputs': [
            '<!@(<(bacardi_command) list_generated_cpp_files --silent)',
          ],
          'conditions': [
            ['OS!="win"',
            {
              'action': [
                '<@(PRODUCT_DIR)/../../bootstrap/command/node',
                '<@(PRODUCT_DIR)/generator/main.js',
                '<(module_root_dir)',
                '<@(SHARED_INTERMEDIATE_DIR)',
                '<@(_inputs)',
              ],
            }],
            ['OS=="win"',
            {
              'action': [
                '<@(PRODUCT_DIR)/../../third_party/node/node.exe',
                '<@(PRODUCT_DIR)/generator/main.js',
                '<(module_root_dir)',
                '<@(SHARED_INTERMEDIATE_DIR)',
                '<@(_inputs)',
              ],
            }],
          ],
        },
      ],
    },
  ],
}
