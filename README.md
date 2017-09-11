Bacardi
=======

[![Linux/Mac Build Status](https://travis-ci.org/lunchclass/bacardi.svg?branch=master)](https://travis-ci.org/lunchclass/bacardi)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/vk8qn0pilfg39x0a/branch/master?svg=true)](https://ci.appveyor.com/project/romandev/bacardi/branch/master)

Bacardi project is an effort to provide multi-language binding for Node.js
native layer.

## System requirements
- This project is multi-platform oriented, so we support Linux, Mac and Windows platforms.

#### Linux
- You MUST have git, python, wget and g++ compilers.
  - ```sudo apt-get install g++ git make python wget```
#### Mac
- You MUST have Xcode with command line tools. You can install them as follows:
  - ```xcode-select --install```
#### Windows
- You MUST have git. Others will be installed automatically when ```bacardi``` command is executed.
  - Visit to https://git-for-windows.github.io in order to install git.

## Build
- You can just run the following command to build.
  - ```./bacardi build```

## Test
- You can just run the following command to test.
  - ```./bacardi test```

## Coding style
- We are following Chromium coding style. You can see the details in the following link.
  - [Chromium C++ style guide](https://chromium.googlesource.com/chromium/src/+/master/styleguide/c++/c++.md)
- If you want, you can just run the following command to format source codes you modified automatically.
  - ```./bacardi format```
