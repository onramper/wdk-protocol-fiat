/**
 * URL builders for the API calls. buy/sell do NOT appear here — they are
 * signed widget URLs, not API calls.
 *
 * Two auth families:
 *   - supported/quotes are the existing public endpoints, authenticated by the
 *     publishable apiKey alone (`Authorization` header).
 *   - the checkout session-transaction lookup and the token exchange carry the
 *     SDK session envelope (access token + DPoP). Checkout v2 accepts that
 *     envelope as an alternative to the partner's Security V2 signature, so
 *     existing signature-authenticated integrations are unaffected.
 */
export class Endpoints {
  constructor(private readonly apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl.replace(/\/+$/, '');
  }

  /**
   * Token exchange / refresh (RFC 6749-style OAuth wire format).
   *
   * Routes directly to the partners-api public tier-2 route; the DPoP `htu`
   * the client signs is this exact URL, so it binds proof-of-possession to the
   * correct origin and path (WS2/WS5 contract).
   */
  tokens(apiKey: string): string {
    return `${this.apiBaseUrl}/partners/v2/${encodeURIComponent(apiKey)}/client-sessions/tokens`;
  }

  supported(): string {
    return `${this.apiBaseUrl}/supported`;
  }

  supportedCountries(): string {
    return `${this.apiBaseUrl}/supported/countries`;
  }

  quote(source: string, destination: string): string {
    return `${this.apiBaseUrl}/quotes/${encodeURIComponent(source)}/${encodeURIComponent(destination)}`;
  }

  /** Checkout v2 transaction lookup, keyed by the checkout session id. */
  checkoutTransaction(sessionId: string): string {
    return `${this.apiBaseUrl}/checkout/session/${encodeURIComponent(sessionId)}/transaction`;
  }
}
