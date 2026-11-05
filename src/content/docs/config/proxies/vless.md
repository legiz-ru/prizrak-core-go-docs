---
title: "VLESS"
---

```yaml
proxies:
- name: "vless"
  type: vless
  server: server
  port: 443
  udp: true
  uuid: uuid
  flow: xtls-rprx-vision
  packet-encoding: xudp

  tls: true
  servername: example.com
  alpn:
  - h2
  - http/1.1
  fingerprint: xxxx
  client-fingerprint: chrome
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
  reality-opts:
    public-key: xxxx
    short-id: xxxx
  encryption: ""

  network: tcp

  smux:
    enabled: false

  # 👻 Prizrak-Core only
  # udp-443: reject
  # mux.cool:
  #   enabled: true
  # finalmask:
  #   tcp:
  #     - type: fragment
  #       packets: tlshello
  #       lengths: ["1-1"]
  #       delays: ["0"]
```

:::::note
Meta's `xtls-*` flow control is effectively equivalent to `xtls-*-udp443` in Xray-core. To block UDP traffic on port 443, use the logical rule: `AND,((NETWORK,UDP),(DST-PORT,443)),REJECT`.
:::::

[Common fields](/config/proxies/)

[TLS fields](/config/proxies/tls/)

## uuid

Required, VLESS user ID.

## flow

VLESS sub-protocol. Available value: `xtls-rprx-vision`.

## packet-encoding

UDP packet encoding. Available values: `xudp` (supported by `xray`, used when the key is empty or has any other value) / `packetaddr` (supported by `v2ray 5+`).

## encryption

VLESS encryption client configuration:

`encryption: "mlkem768x25519plus.native/xorpub/random.1rtt/0rtt.(padding len).(padding gap).(X25519 Password).(ML-KEM-768 Client)..."`

XTLS Vision with native/xorpub can splice. Use only 1-RTT mode, or reuse 0-RTT if the ticket sent by the server has non-zero seconds.

Only one item can be selected before `/`; after that, at least one base64 item is required and more can be appended indefinitely. Generate values with `mihomo generate vless-x25519` and `mihomo generate vless-mlkem768`, and remove the parentheses when replacing values.

Padding is optional and only applies to 1-RTT to remove handshake length characteristics. The default value on both sides is `100-111-1111.75-0-111.50-0-3333`:

* After the 1-RTT client/server hello, append random padding of 111 to 1111 bytes with 100% probability.

* Wait a random 0 to 111 milliseconds with 75% probability (`probability-from-to`).

* Send random padding of 0 to 3333 bytes again with 50% probability. If the value is 0, no `Write()` occurs.

* The server and client can use different padding parameters. Parameters can be appended indefinitely in len/gap order. The first padding must have 100% probability and at least 35 bytes.

## network

Transport layer. Supports `ws`/`http`/`h2`/`grpc`/`xhttp` and 👻 `mkcp` (alias `kcp`, VLESS over mKCP as in Xray-core since finalmask, see [finalmask](/config/proxies/finalmask/#vless-over-mkcp)). If unset or set to another value, TCP is used.

See [Transport configuration](/config/proxies/transport/).

## finalmask 👻

Traffic masks from Xray-core's `finalmask`: `tcp` masks (fragment, header-custom, sudoku, xmc, noise…) under TLS and `udp` masks (xdns, xicmp, udphop, noise…) under mKCP and XHTTP/3. They must match the server inbound's `finalmask`. The block can also be written in Xray's form (nested `settings`, camelCase keys). See [finalmask](/config/proxies/finalmask/).

## Other 👻 options

- [`reality-opts.mldsa65-verify`](/config/proxies/reality/): checks the ML-DSA-65 signature of the REALITY certificate.
- [`xhttp-opts.h2-flow`](/config/proxies/xhttp/): the HTTP/2 flow governor of XHTTP.
- [`mux.cool`](/config/proxies/mux-cool/) and [`udp-443`](/config/proxies/udp-443/): see [common fields](/config/proxies/).
