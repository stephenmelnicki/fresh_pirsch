import { FreshContext, Protocol } from "../deps.ts";
import { createEnqueue } from "./queue.ts";

interface Reporter {
  (
    req: Request,
    ctx: FreshContext,
  ): void;
}

export function createReporter(
  hostname: string | undefined,
  accessToken: string | undefined,
  protocol: Protocol,
  filter: (req: Request) => boolean,
): Reporter {
  if (!hostname || !accessToken) {
    console.log(
      "Pirsch hostname and access token not provided. Reporting disabled.",
    );
    return () => {};
  }

  const enqueue = createEnqueue(hostname, accessToken, protocol);

  return function report(req: Request, ctx: FreshContext) {
    // do not report any filtered requests
    if (!filter(req)) {
      return;
    }

    enqueue(req, ctx);
  };
}
