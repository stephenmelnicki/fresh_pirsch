import { Plugin } from "../deps.ts";

import { createReporter } from "./reporter.ts";
import { PirschPluginOptions } from "./types.ts";

export function pirschPlugin(options: PirschPluginOptions): Plugin {
  const {
    hostname = Deno.env.get("PIRSCH_HOSTNAME"),
    accessToken = Deno.env.get("PIRSCH_TOKEN"),
    protocol = "https",
    filter = () => true,
  } = options;

  const report = createReporter(hostname, accessToken, protocol, filter);

  return {
    name: "fresh-pirsch-plugin",
    middlewares: [{
      path: "/",
      middleware: {
        handler: async (req, ctx) => {
          let res;

          try {
            res = await ctx.next();
          } catch (error) {
            throw error;
          } finally {
            report(req, ctx);
          }

          return res;
        },
      },
    }],
  };
}
