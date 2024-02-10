import { delay } from "https://deno.land/std@0.215.0/async/mod.ts";

export interface Message {
  content: string;
}

export class Queue {
  private messages: Message[] = [];
  private uploading = false;

  private static readonly UPLOAD_DELAY = 1000;

  get length() {
    return this.messages.length;
  }

  enqueue(message: Message) {
    console.log("Enqueueing message: ", message.content);
    this.messages.push(message);

    if (!this.uploading) {
      this.uploading = true;
      setTimeout(this.upload.bind(this), Queue.UPLOAD_DELAY);
    }
  }

  private async upload() {
    while (this.length > 0) {
      const message = this.messages.shift();

      try {
        const start = performance.now();
        await this.simulateFetch(message);
        const duration = performance.now() - start;
        console.log(`Message "${message?.content}" uploaded in ${duration}ms.`);
      } catch (err) {
        console.error(err);
        await delay(Queue.UPLOAD_DELAY);
      }
    }

    this.uploading = false;
  }

  private async simulateFetch(message?: Message): Promise<string | undefined> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(message?.content);
      }, Math.random() * 1000);
    });
  }
}

function setup(queue: Queue = new Queue()) {
  return async function sequence() {
    let id: number;
    let count = 1;

    return await new Promise((resolve) => {
      id = setInterval(() => {
        if (count > 10 && queue.length === 0) {
          clearInterval(id);
          return resolve(count);
        }

        if (count <= 10) {
          queue.enqueue({ content: `${count}` });
          count = count + 1;
        }
      }, 250);
    });
  };
}

if (import.meta.main) {
  const queue = new Queue();
  const sequence = setup(queue);
  console.log("Starting sequence...");
  await sequence();
  console.log("done.");
}
