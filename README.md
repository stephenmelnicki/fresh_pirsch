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
} from "https://deno.land/x/fresh_pirsch@1.0.1/mod.ts";

const options: PirschPluginOptions = {
  // in order to report analytics, you'll first have to provide the hostname
  // and access key you have configured via the Pirsch dashboard.
  hostname: "<hostname>",
  accessToken: "<access_key>",
  // "http" or "https" (will default to https)
  protocol: "https",
  // filter out any requests that that you don't want to track
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
