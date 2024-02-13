import { delay, PirschHit, PirschNodeApiClient } from "../deps.ts";

const UPLOAD_DELAY = 1000;

export class Queue {
  private items: PirschHit[] = [];
  private uploading = false;

  private readonly client?: PirschNodeApiClient;

  constructor(client?: PirschNodeApiClient) {
    this.client = client;
  }

  push(hit: PirschHit) {
    this.items.push(hit);

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
