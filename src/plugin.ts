import { type Plugin } from "$fresh/server.ts";

import { createReporter } from "./reporter.ts";
import { PirschPluginOptions } from "./types.ts";

export default function pirschPlugin(options: PirschPluginOptions): Plugin {
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
