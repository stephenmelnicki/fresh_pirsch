import {
  Plugin,
  PluginMiddleware,
  ResolvedFreshConfig,
} from "https://deno.land/x/fresh@1.6.3/server.ts";

// import { Pirsch, PirschNodeApiClient } from "pirsch";

import { PirschPluginOptions } from "./src/types.ts";

function initPirsch(
  config: ResolvedFreshConfig,
  options: PirschPluginOptions,
) {
  return {
    hostname: config.basePath, // TODO: fix this
    clientId: options.clientId,
    clientSecret: options.clientSecret,
  };
}

export default function pirsch(options: PirschPluginOptions): Plugin {
  let client: Record<string, string> | undefined;

  const pirschMiddleware: PluginMiddleware = {
    path: "/",
    middleware: {
      handler: async (_req, ctx) => {
        let res;
        let err;

        console.log(client);

        try {
          res = await ctx.next() as Response;
        } catch (error) {
          err = error as Error;
          throw err;
        } finally {
          console.log("reporting...");
        }

        return res;
      },
    },
  };

  const middlewares: PluginMiddleware[] = [];

  return {
    name: "pirsch-plugin",
    configResolved(config) {
      client = initPirsch(config, options);
      middlewares.push(pirschMiddleware);
    },
    middlewares,
  };
}
