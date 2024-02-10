# pirsch

[![ci](https://github.com/stephenmelnicki/pirsch/workflows/ci/badge.svg)](https://github.com/stephenmelnicki/pirsch)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/pirsch/mod.ts)

A Fresh plugin for server side processing of Pirsch Analytics.

```js
// fresh.config.ts
import { defineConfig } from "$fresh/server.ts";
import { pirschPlugin } from "https://deno.land/x/fresh_pirsch@1.0.0/mod.ts";

export default defineConfig({
  plugins: [
    // ...
    pirschPlugin(id: "<client_id>", secret: "<access_key>"),
    // ...
  ]
});

## Usage

This plugin is designed to generate tracking messages for each request and
response processed by a deno fresh server. These messages are then queued and
asychronously batched to Pirsch Analytics.

### `pirschPlugin(key: string)`
```
