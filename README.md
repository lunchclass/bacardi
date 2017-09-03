Bacardi
=======

[![Linux/Mac Build Status](https://travis-ci.org/lunchclass/bacardi.svg?branch=master)](https://travis-ci.org/lunchclass/bacardi)

Bacardi project is an effort to provide multi-language binding for Node.js
native layer.

## System requirements
- This project is multi-platform oriented, but we support Linux and Mac for now.
  - We have a plan to support for MS Windows platform but you can try it using
    Docker for now.
#### Linux
- You MUST have git, python, wget and g++ compilers.
  - ```sudo apt-get install g++ git make python wget```
#### Mac
- You MUST have Xcode with command line tools. You can install them as follows:
  - ```xcode-select --install```

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
