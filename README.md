# fresh_pirsch

A Fresh plugin for server side processing of Pirsch Analytics.

## Usage

This plugin is designed to generate tracking messages for each request and
response processed by a deno fresh server. These messages are then queued and
asychronously batched to Pirsch Analytics.

```ts
// fresh.config.ts
import { defineConfig } from "$fresh/server.ts";
import pirschPlugin, {
  PirschPluginOptions,
} from "https://deno.land/x/fresh_pirsch@1.0.0/mod.ts";

const options: PirschPluginOptions = {
  hostname: "<hostname>",
  id: "<client_id>",
  secret: "<access_key>",
  filter: (req) => !req.url.includes("favicon.ico"),
};

export default defineConfig({
  plugins: [
    // ...
    pirschPlugin(options),
  ],
});
```
