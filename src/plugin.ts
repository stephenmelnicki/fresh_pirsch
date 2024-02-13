import type { Plugin } from "$fresh/server.ts";

import { createReporter } from "./reporter.ts";
import { PirschOptions } from "./types.ts";

export function pirschPlugin(options: PirschOptions): Plugin {
  const report = createReporter(options);

  return {
    name: "pirsch-plugin",
    middlewares: [{
      path: "/",
      middleware: {
        handler: async (req, ctx) => {
          let res;
          let err;

          try {
            res = await ctx.next();
          } catch (error) {
            err = error;
            throw err;
          } finally {
            report(req, ctx);
          }

          return res;
        },
      },
    }],
  };
}
