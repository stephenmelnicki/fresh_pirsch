import { Queue } from "./queue.ts";
import { createClient, createHit } from "./utils.ts";
import { PirschPluginOptions } from "./types.ts";

interface Reporter {
  (
    request: Request,
    ip: string,
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
    ip: string,
  ) {
    // if plugin options are not set, do not report
    if (!hostname || !id || !secret) {
      return;
    }

    // do not report any filtered requests
    if (!filter(request)) {
      return;
    }

    queue.push(createHit(request, ip));
  };
}
