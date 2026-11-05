---
title: "DNS"
---

```yaml
proxies:
- name: "dns-out"
  type: dns
```

The `dns` outbound hijacks requests to the internal [DNS](/config/dns/) module, where all requests are handled internally.
