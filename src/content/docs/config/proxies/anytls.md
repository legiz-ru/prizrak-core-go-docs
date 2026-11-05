---
title: "AnyTLS"
---

```yaml
proxies:
- name: anytls
  type: anytls
  server: 1.2.3.4
  port: 443
  password: "<your password>"
  client-fingerprint: chrome
  udp: true
  # client-metadata: ""
  idle-session-check-interval: 30
  idle-session-timeout: 30
  min-idle-session: 0
  sni: "example.com"
  alpn:
    - h2
    - http/1.1
  skip-cert-verify: true
  name-cert-verify: example.com
  shadow-tls-opts:
    version: 3
    password: shadow-tls-password
  restls-opts:
    password: restls-password
    version-hint: tls13
  jls-opts:
    username: jls-user
    password: jls-password
```

[Common fields](/config/proxies/)

[TLS fields](/config/proxies/tls/)

:::::tip
Mihomo does not support AnyTLS+Reality, and will not support this combination in the future. If you want to hide SNI, use [ECH](/config/proxies/tls/#ech-opts), or combine AnyTLS with [ShadowTLS](/config/proxies/tls/#shadow-tls-opts), [ResTLS](/config/proxies/tls/#restls-opts), or [JLS](/config/proxies/tls/#jls-opts). If you must use Reality, choose the [VMess](/config/proxies/vmess/), [VLESS](/config/proxies/vless/), or [Trojan](/config/proxies/trojan/) protocol.
:::::

## client-metadata

Optional. Client metadata sent to the server.

:::::caution
Since `client-metadata` may be used to collect client information and treat clients differently, this data is no longer sent by default starting from v1.19.30. If needed, specify it manually.
:::::

## idle-session-check-interval

Interval for checking idle sessions. Default: 30 seconds.

## idle-session-timeout

During checks, sessions idle longer than this value are closed. Default: 30 seconds.

## min-idle-session

During checks, keep at least the first n idle sessions open. Default: n=0.
