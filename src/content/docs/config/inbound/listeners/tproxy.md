---
title: "TPROXY"
---

```yaml
listeners:
- name: tproxy-in
  type: tproxy
  port: 7894
  listen: 0.0.0.0
  udp: true
```

## [General Fields](/config/inbound/listeners/)

## Protocol Configuration

### udp

Whether to listen for UDP.
