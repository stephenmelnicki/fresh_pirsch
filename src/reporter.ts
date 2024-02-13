import { type FreshContext } from "$fresh/server.ts";

import { Queue } from "./queue.ts";
import { createClient } from "./utils.ts";
import { PirschPluginOptions } from "./types.ts";

interface Reporter {
  (
    request: Request,
    context: FreshContext,
  ): void;
}

export function createReporter(options: PirschPluginOptions): Reporter {
  const {
    hostname = Deno.env.get("PIRSCH_HOSTNAME"),
    id = Deno.env.get("PIRSCH_CLIENT"),
    secret = Deno.env.get("PIRSCH_SECRET"),
    filter = () => true,
  } = options;

  if (!hostname || !id || !secret) {
    console.log(
      "PIRSCH_HOSTNAME, PIRSCH_CLIENT, and PIRSCH_SECRET environment variables not set. Pirsch reporting disabled.",
    );
  }

  const queue = new Queue(createClient(hostname, id, secret));

  return function report(
    request: Request,
    context: FreshContext,
  ) {
    // if plugin options are not set, do not report
    if (!hostname || !id || !secret) {
      return;
    }

    // do not report any filtered requests
    if (!filter(request)) {
      return;
    }

    queue.push(request, context);
  };
}
