# GitHub Copilot Instructions for Bitburner (v3.0.0+ / NS2)

## 1. Project Context & Environment
- **Game**: Bitburner v3.0.0+ (Cyberpunk incremental RPG).
- **Language**: TypeScript (strict mode) or JavaScript (ES6+) .
- **Framework**: Standard ES modules (ESM) targeting the browser environment.
- **Sync Tool**: `bb-external-editor` (bundles TS/JS via esbuild and pushes to game).
- **File Hierarchy**: Files must be created inside `servers/<server-name>/...` (e.g., `servers/home/hack.ts` maps directly to `home` server inside the game).
- **Note**: TypeScript should be prioritized whenever possible.

## 2. Strict Netscript 2 (NS2) Architecture Rules
- **No NS1 Legacy**: Do NOT generate any legacy NS1 code (`.script`). All scripts must be asynchronous NS2 modules (`.ts` or `.js`).
- **Entry Point**: Every standalone script must export an asynchronous main function:
  ```typescript
  import { NS } from "@ns";
  export async function main(ns: NS): Promise<void> {
      // Logic here
  }
  ```
- **Parameter Strictness (No Fuzzy Matching)**: All parameters passed to `ns` functions must be precise and exact match. Avoid fuzzy arguments.
- **Asynchronous Execution**: Every game-blocking call (`ns.hack`, `ns.grow`, `ns.weaken`, `ns.sleep`, `ns.prompt`) **MUST** be explicitly prepended with the `await` keyword.

## 3. v3.0.0+ Specific API Adjustments (Crucial)
- **UI Namespaces**: Legacy independent tail/ui functions are deprecated. All terminal/log interface manipulations must utilize the `ns.ui` namespace (e.g., use `ns.ui.clearTerminal` or `ns.ui.tail`).
- **Darknet & Scanning**: `ns.scan()` no longer returns the `darkweb` server. To interact with or locate darknet elements, strictly utilize `ns.dnet.probe()`.
- **Renamed APIs**: Never use `ns.setAutoJobAssignment`. Always use the updated API name: `ns.setJobAssignment`.
- **String Formatting**: Use the specific formatting interfaces instead of legacy top-level format functions.

## 4. RAM & Optimization Rules
- **Memory Efficiency**: Write highly optimized, low-RAM footprint scripts. Use stateless functional utilities over heavy OOP classes to prevent RAM inflation in the NS2 virtual machine.
- **Dynamic Calculation**: Calculate resource availability at runtime using `ns.getServerMaxRam` and `ns.getServerUsedRam`.

## 5. React & UI Components (In-Game)
- **Architecture**: Use the native, pre-installed instances of React and ReactDOM embedded in Bitburner.
- **Imports**: Do NOT install or add `react` to `package.json`. Import them directly as ESModules:
  ```typescript
  import React, { useState, useEffect } from 'react';
  ```
- **Cleanup**: Always ensure event listeners, hooks, or custom intervals are terminated on component unmount to prevent memory leaks within the game document context.
