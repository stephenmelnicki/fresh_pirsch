# fresh_pirsch

A Fresh plugin for server side processing of Pirsch Analytics.🍋🦕

## Usage

This plugin is designed to generate tracking messages for each request processed
by a deno fresh server. These messages are then queued and asychronously batched
to Pirsch Analytics.

```ts
// in fresh.config.ts

import { defineConfig } from "$fresh/server.ts";
import pirschPlugin, {
  PirschPluginOptions,
} from "https://deno.land/x/fresh_pirsch@0.1.2/mod.ts";

const options: PirschPluginOptions = {
  hostname: "<hostname>",
  id: "<client_id>",
  secret: "<access_key>",
};

export default defineConfig({
  plugins: [
    // ...
    pirschPlugin(options),
  ],
});
```
