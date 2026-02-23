import { execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";
import { env } from "../../config/env";

export interface AideddListingPayload {
  enHtml: string;
  frHtml: string;
}

export interface AideddDetailPayload {
  url: string;
  html: string;
}

const execFile = promisify(execFileCallback);

export class AideddClient {
  async fetchListings(): Promise<AideddListingPayload> {
    const [enHtml, frHtml] = await Promise.all([
      this.fetchHtml(env.magicItemsListingEnUrl),
      this.fetchHtml(env.magicItemsListingFrUrl),
    ]);

    return { enHtml, frHtml };
  }

  async fetchDetailPages(urls: string[]): Promise<AideddDetailPayload[]> {
    const uniqueUrls = [
      ...new Set(
        urls
          .filter((url) => url.length > 0)
          .map((url) => (url.startsWith("http") ? url : `https://www.aidedd.org${url}`)),
      ),
    ];
    const concurrency = 10;
    const payloads: AideddDetailPayload[] = [];

    for (let index = 0; index < uniqueUrls.length; index += concurrency) {
      const chunk = uniqueUrls.slice(index, index + concurrency);
      const chunkResults = await Promise.allSettled(
        chunk.map(async (url) => ({
          url,
          html: await this.fetchHtml(url),
        })),
      );

      for (const result of chunkResults) {
        if (result.status === "fulfilled") {
          payloads.push(result.value);
        }
      }
    }

    return payloads;
  }

  private async fetchHtml(url: string): Promise<string> {
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const timeoutController = new AbortController();
      const timeout = setTimeout(
        () => timeoutController.abort(),
        env.magicItemsImportTimeoutMs,
      );

      try {
        const response = await fetch(url, {
          signal: timeoutController.signal,
          headers: {
            "User-Agent": env.magicItemsImportUserAgent,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.text();
      } catch (error: unknown) {
        if (attempt === maxAttempts) {
          try {
            return await this.fetchHtmlWithCurl(url);
          } catch {
            const message = error instanceof Error ? error.message : "unknown error";
            throw new Error(`Aidedd request failed for ${url}: ${message}`);
          }
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 300 * attempt + Math.floor(Math.random() * 200)),
        );
      } finally {
        clearTimeout(timeout);
      }
    }

    throw new Error(`Aidedd request failed for ${url}`);
  }

  private async fetchHtmlWithCurl(url: string): Promise<string> {
    const { stdout } = await execFile(
      "curl",
      ["-sSL", "-A", env.magicItemsImportUserAgent, url],
      {
        timeout: env.magicItemsImportTimeoutMs,
        maxBuffer: 10 * 1024 * 1024,
      },
    );

    if (!stdout || stdout.trim().length === 0) {
      throw new Error(`Empty curl response for ${url}`);
    }

    return stdout;
  }
}
