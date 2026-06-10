/**
 * URL builders for the authenticated data calls. buy/sell do NOT appear here —
 * they are signed widget URLs, not API calls.
 *
 * The data routes are versioned endpoints OWNED BY EACH SERVICE
 * (supported/quotes/transactions) behind the API gateway — deliberately not
 * the headless BFF, which is attested-clients-only. The paths are a cross-repo
 * contract with the `CLIENT_ROUTE_SCOPE_MAP` keys in core-utils
 * (`GET /supported/v2/sdk`, `GET /quotes/v2/sdk/...`,
 * `GET /transactions/v2/sdk/...`), where each route's required scope and
 * admitted tiers are defined. Only the session bootstrap (`tokens`) goes
 * through the headless proxy — it is an OAuth endpoint, not a data route.
 */
export class Endpoints {
  constructor(private readonly apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl.replace(/\/+$/, '');
  }

  /** Token exchange / refresh (RFC 6749-style OAuth wire format). */
  tokens(apiKey: string): string {
    return `${this.apiBaseUrl}/headless/v1/sdk/partners/${encodeURIComponent(apiKey)}/client-sessions/tokens`;
  }

  supported(): string {
    return `${this.apiBaseUrl}/supported/v2/sdk`;
  }

  quote(source: string, destination: string): string {
    return `${this.apiBaseUrl}/quotes/v2/sdk/${encodeURIComponent(source)}/${encodeURIComponent(destination)}`;
  }

  transaction(txId: string): string {
    return `${this.apiBaseUrl}/transactions/v2/sdk/${encodeURIComponent(txId)}`;
  }
}
