---
title: "GOST relay"
---

A hop through a [GOST](https://gost.run/) `relay` server. It is meant to be used as a [`dialer-proxy`](/config/proxies/dialer-proxy/) under another proxy (ss, vmess, vless, trojan…).

```yaml
proxies:
- name: "gost-relay-hop"
  type: gost-relay
  server: relay.example.com
  port: 443
  udp: true
  tls: true
  # forward: false
  # mux: true            # relay+mtls when tls is also true
  # sni: relay.example.com
  # username: user
  # password: pass
  # client-fingerprint: chrome
  # fingerprint: xxxx
  # certificate: ./client.crt
  # private-key: ./client.key
  # skip-cert-verify: true

- name: "ss-over-gost"
  type: ss
  # dialed from the relay server side: an SS server on the relay host itself
  server: 127.0.0.1
  port: 12345
  cipher: chacha20-ietf-poly1305
  password: "password"
  udp: true
  dialer-proxy: gost-relay-hop
```

[Common fields](/config/proxies/)

## forward

`false` (default, dynamic mode): the relay connects to the address the upper proxy asks for, so `server`/`port` of the upper proxy are dialed from the relay server. `true` (forward mode): the relay server sends the stream to the target configured on it; the upper proxy's address is only used to ask the `dialer-proxy` for a stream.

## tls

Wrap the relay connection in TLS (`relay+tls`). With `mux: true` as well it is `relay+mtls`.

## mux

Multiplex streams over one connection.

## username / password

Relay authentication.

## TLS fields

`sni`, `skip-cert-verify`, `name-cert-verify`, `fingerprint`, `certificate`, `private-key` and `client-fingerprint` work as in the [TLS configuration](/config/proxies/tls/).
