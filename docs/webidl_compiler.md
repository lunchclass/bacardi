# WebIDL compiler
This document explains how `./bacardi build_webidl` works internally.

- [Triggering WebIDL compiler](#triggering-webidl-compiler)

## Triggering WebIDL compiler

![Triggering WebIDL compiler process](/docs/images/triggering_webidl_compiler.png)
To request building WebIDL, you can just use `./bacardi build_webidl` command.

1. `bacardi build_webidl` command will run `gulp build_webidl` internally.
2. In our project, the `gulp` command will run on `ts-node` runtime.
So, `ts-node` will request to build all related TypeScript modules internally.
3. Then, `ts-node` will generate JS codes using TypeScript compiler.
4. In this step, queries all `*.idl` files in this project.
5. Pass the found WebIDL file list and request to compile WebIDL files.

### bootstrap
The bootstrap is set of scripts that provide required packages via auto-install
in multi-platform environment. With this module, we can handle everything to
build and run our project without any additional works.

### gulp
The [gulp](https://github.com/gulpjs/gulp) provides the streaming build system.
In our project, `./bacardi <command>` will trigger `gulp <task>` internally.

### ts-node
The [ts-node](https://github.com/TypeStrong/ts-node) is a runtime for TypeScript
for Node.js. It makes our TypeScript codes run on Node.js without explicit
TypeScript compile. So, this makes `gulpfile.ts` work. Also, When processing
gulp tasks such as the `build_webidl` as shown in the figure above, the WebIDL
compiler codes(TypeScript codes) is executed by performing TypeScript compiling
internally.

### WebIDL compiler
The WebIDL compiler(or often we called bindings generator) transcompiles WebIDL
to Native codes such as C++ codes.

## Reading/Processing IDL Files in parallel
When reading/processing a single IDL file, it should be each independent task.
Then, we can extend our compiler easily to support multi-threading or
distributed compiling in the future.

## Parsing WebIDL
The parsing step is corresponding to the front-end part of compiler. The goal in
this step, is that creating IDL definition objects as intermediated results.

### Creating AST(Abstract Syntax Tree)
To parse WebIDL(exactly,
[IDL Fragment](https://heycam.github.io/webidl/#dfn-idl-fragment)),
we just use [WebIDL2 parser](https://github.com/w3c/webidl2.js). It provides a
trivial API called parse(). If we use the API, the WebIDL2 parser returns a AST.
