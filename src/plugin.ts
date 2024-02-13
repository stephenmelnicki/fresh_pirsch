import { Plugin } from "../deps.ts";

import { createReporter } from "./reporter.ts";
import { PirschPluginOptions } from "./types.ts";

export function pirschPlugin(options: PirschPluginOptions): Plugin {
  const report = createReporter(options);

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
            report(req, ctx.remoteAddr.hostname);
          }

          return res;
        },
      },
    }],
  };
}
