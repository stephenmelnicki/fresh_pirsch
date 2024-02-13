# fresh_pirsch

A Fresh plugin for server side processing of Pirsch Analytics.

## Usage

This plugin is designed to generate tracking messages for each request processed
by a deno fresh server. These messages are then queued and asychronously batched
to Pirsch Analytics.

```ts
// in fresh.config.ts

import { defineConfig } from "$fresh/server.ts";
import pirschPlugin from "https://deno.land/x/fresh_pirsch@1.0.0/mod.ts";

export default defineConfig({
  plugins: [
    // ...
    pirschPlugin({
      hostname: "<hostname>",
      id: "<client_id>",
      secret: "<access_key>",
    }),
  ],
});
```
