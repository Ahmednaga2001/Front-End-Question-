# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collection of JavaScript learning exercises covering JS fundamentals and common gotchas. All code lives in a single `main.js` file organized into numbered tasks (1–15).

## Running

```bash
node main.js
```

No dependencies, no build step, no package.json.

## Architecture

`main.js` contains self-contained code snippets, each preceded by a `//task N` comment. Topics covered:

- Object references vs spread copies (task 1)
- Closure over `var` in loops (task 2)
- `this` binding and `self` pattern (task 3)
- Event loop / setTimeout ordering (task 4)
- Sparse arrays (task 5)
- Async/await and Promise states (task 6)
- ES6 module export semantics (task 7)
- setInterval return value; object reference equality (task 8)
- Array.sort string coercion (task 9)
- Object key coercion vs Set (task 10)
- Falsy values (task 11)
- catch block variable scoping (task 12)
- Array.reduce (task 13)
- Method binding / `this` loss (task 14)
- indexOf returning 0 as falsy (task 15)

Task 7 simulates a multi-file ES module scenario inline (won't actually run as-is with `node main.js` since it uses `import`/`export` syntax outside a module context).
