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
        '<!(<(bacardi_command) node -p "require(\'node-addon-api\').gyp")',
      ],
      'include_dirs': [
        './',
        '<@(SHARED_INTERMEDIATE_DIR)',
        '<!@(<(bacardi_command) node -p "require(\'node-addon-api\').include")',
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
          ],
          'outputs': [
            '<@(PRODUCT_DIR)/generator',
          ],
          'action': [
            '<(module_root_dir)/<(bacardi_command)',
            'tsc',
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
            '<!@(<(bacardi_command) list_idl_files --silent)',
          ],
          'outputs': [
            '<!@(<(bacardi_command) list_generated_cpp_files --silent)',
          ],
          'action': [
            '<(module_root_dir)/<(bacardi_command)',
            'node',
            '<@(PRODUCT_DIR)/generator/main.js',
            '<(module_root_dir)',
            '<@(SHARED_INTERMEDIATE_DIR)',
            '<@(_inputs)',
          ],
        },
      ],
    },
  ],
}
