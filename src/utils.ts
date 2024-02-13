import { PirschHit, PirschNodeApiClient } from "../deps.ts";

export function createClient(
  hostname?: string,
  clientId?: string,
  clientSecret?: string,
): PirschNodeApiClient | undefined {
  if (!hostname || !clientId || !clientSecret) {
    return;
  }

  return new PirschNodeApiClient({
    hostname,
    clientId,
    clientSecret,
  });
}

export function createHit(request: Request, ip: string): PirschHit {
  return {
    url: request.url,
    ip,
    dnt: request.headers.get("dnt"),
    user_agent: request.headers.get("user-agent")!,
    accept_language: request.headers.get("accept-language"),
    sec_ch_ua: request.headers.get("sec-ch-ua"),
    sec_ch_ua_mobile: request.headers.get("sec-ch-ua-mobile"),
    sec_ch_ua_platform: request.headers.get("sec-ch-ua-platform"),
    sec_ch_ua_platform_version: request.headers.get(
      "sec-ch-ua-platform-version",
    ),
    sec_ch_width: request.headers.get("sec-ch-width"),
    sec_ch_viewport_width: request.headers.get("sec-ch-viewport-width"),
    title: request.headers.get("title"),
    referrer: request.headers.get("referer"),
  } as PirschHit;
}
