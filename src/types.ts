export type Protocol = "http" | "https";

export interface PirschPluginOptions {
  hostname?: string;
  accessToken?: string;
  protocol?: Protocol;
  filter?: (req: Request) => boolean;
}

export interface Message {
  url: string;
  socket: {
    remoteAddress: string;
  };
  headers: {
    dnt: string | null;
    "user-agent": string | null;
    "accept-language": string | null;
    referer: string | null;
  };
}
