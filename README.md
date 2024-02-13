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
  // in order to report analytics, you'll first have to provide the hostname,
  // client id and secret you have configured via the Pirsch dashboard.
  hostname: "<hostname>",
  id: "<client_id>",
  secret: "<client_secret or access_key>",
  // filter out any requests that that you do not wish to track
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
