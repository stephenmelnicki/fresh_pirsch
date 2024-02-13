export interface PirschOptions {
  hostname?: string;
  id?: string;
  secret?: string;
  filter?: (req: Request) => boolean;
}
