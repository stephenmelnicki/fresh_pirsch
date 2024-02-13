import { FreshContext } from "$fresh/server.ts";
import { PirschHit, PirschNodeApiClient } from "pirsch";
import { delay } from "$std/async/mod.ts";

import { createHit } from "./utils.ts";

const UPLOAD_DELAY = 1000;

export class Queue {
  private items: PirschHit[] = [];
  private uploading = false;

  private readonly client?: PirschNodeApiClient;

  constructor(client?: PirschNodeApiClient) {
    this.client = client;
  }

  push(request: Request, context: FreshContext) {
    this.items.push(createHit(request, context));

    if (!this.uploading) {
      this.uploading = true;
      setTimeout(this.upload.bind(this), UPLOAD_DELAY);
    }
  }

  private async upload() {
    while (this.items.length > 0) {
      const item = this.items.shift();

      try {
        await this.client?.hit(item!);
      } catch (err) {
        console.error(err);
        await delay(UPLOAD_DELAY);
      }
    }

    this.uploading = false;
  }
}
