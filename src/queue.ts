import { delay, FreshContext, PirschNodeApiClient } from "../deps.ts";
import { Message } from "./types.ts";

const UPLOAD_DELAY = 1000;

function toMessage(req: Request, ctx: FreshContext): Message {
  return {
    url: req.url,
    socket: {
      remoteAddress: req.headers.get("x-forwarded-for") ||
        ctx.remoteAddr.hostname,
    },
    headers: {
      dnt: req.headers.get("dnt"),
      "user-agent": req.headers.get("user-agent"),
      "accept-language": req.headers.get("accept-language"),
      referer: req.headers.get("referer"),
    },
  };
}

export function createEnqueue(
  hostname: string,
  accessToken: string,
  protocol: "https" | "http",
) {
  const client = new PirschNodeApiClient({
    hostname,
    protocol,
    accessToken,
  });

  const messages: Message[] = [];
  let uploading = false;

  async function upload() {
    while (messages.length > 0) {
      const message = messages.shift();

      try {
        await client.hit(client.hitFromRequest(message));
      } catch (err) {
        console.error("error recording page view", err);
        await delay(UPLOAD_DELAY);
      }
    }

    uploading = false;
  }

  return function enqueue(req: Request, ctx: FreshContext) {
    messages.push(toMessage(req, ctx));

    if (!uploading) {
      uploading = true;
      setTimeout(upload, UPLOAD_DELAY);
    }
  };
}
