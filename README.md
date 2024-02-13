# fresh_pirsch

A Fresh plugin for server side processing of Pirsch Analytics.🍋🦕

## Usage

This plugin is designed to generate tracking messages for each request processed
by a deno fresh server. These messages are then queued and asychronously batched
to Pirsch Analytics.

```ts
// in fresh.config.ts

import { defineConfig } from "$fresh/server.ts";
import {
  pirschPlugin,
  PirschPluginOptions,
} from "https://deno.land/x/fresh_pirsch@1.0.0/mod.ts";

const options: PirschPluginOptions = {
  // hostname of the website in pirsch
  hostname: "<hostname>",
  // provide the id and secret of client created via
  // https://dashboard.pirsch.io/settings/integration
  id: "<client_id>",
  secret: "<secret or access_key>",
  // filter any request that that may not need to be tracked
  // i.e. favicon.ico, fonts, etc.
  filter: (req) => !req.url.includes("favicon.ico"),
};

export default defineConfig({
  plugins: [
    // ...
    pirschPlugin(options),
  ],
});
```
