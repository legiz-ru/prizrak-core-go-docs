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

## [Общие поля](/ru/config/inbound/listeners/)

## Настройка протокола

### udp

Прослушивать ли UDP
