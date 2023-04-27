- Need something slow
  - MD parsing a big tutorial doc
  - just forced setTimeouts
  - do a HUGE mock.shop query
  - ye old github releases viewer ✅
    - need local data too in case internet sucks
- Strategies
  - HTTP Cache Control
    - need a good CDN (fastly / cloudflare)
    - caches entire documents and entire JSON payloads
    - Good alternative to SSG, but not great for mixed dynamic/static pages
  - LRU Cache
    - uses memory, so needs a long running server
  - Redis / KV
    - stored outside of the app so works on serverless
- Invalidation