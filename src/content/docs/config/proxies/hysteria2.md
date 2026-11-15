---
title: "Hysteria2"
---

[Configuration Reference](https://hysteria.network/docs/advanced/Full-Client-Config/)

```yaml
proxies:
- name: "hysteria2"
  type: hysteria2
  server: server.com
  port: 443
  ports: 443-8443
  hop-interval: 30
  password: yourpassword
  up: "30 Mbps"
  down: "200 Mbps"
  # bbr-profile: "" # Available: "standard", "conservative", "aggressive". Default: "standard"
  obfs: salamander # Defaults to empty. If filled, obfs will be enabled. Currently supports `salamander` and `gecko`.
  obfs-password: yourpassword
  # obfs-min-packet-size: 512
  # obfs-max-packet-size: 1200
  sni: server.com
  skip-cert-verify: false
  name-cert-verify: example.com
  fingerprint: xxxx # Configuring the fingerprint provides SSL pinning. Obtain it with: openssl x509 -noout -fingerprint -sha256 -inform pem -in yourcert.pem
  alpn:
    - h3
  # realm-opts:
  #   enable: true # Must be turned on manually
  #   server-url: https://realm.hy2.io
  #   token: public
  #   realm-id: my-cabin-1f3a8c2e9b
  #   stun-servers:
  #     - stun.nextcloud.com:3478
  #     - stun.sip.us:3478
  #     - global.stun.twilio.com:3478
  #   # The following supports entering TLS configuration for the server-url (sni, skip-cert-verify, name-cert-verify, fingerprint, certificate, private-key, alpn)
  #   # skip-cert-verify： false
  #   # name-cert-verify: example.com
  #   # ......
  # handshake-timeout: 30
  # client-fingerprint: chrome # 👻 the browser of the QUIC handshake: chrome (default), firefox or safari
  # disable-chrome-parrot: false # 👻 true: quic-go's own QUIC handshake instead of the browser's
  ###Special quic-go options. Do not modify them unless you know what you are doing.###
  # initial-stream-receive-window： 8388608
  # max-stream-receive-window： 8388608
  # initial-connection-receive-window： 20971520
  # max-connection-receive-window： 20971520
```

[Common Fields](/config/proxies/)

[TLS Fields](/config/proxies/tls/)

## ports

Configuring this enables port jumping, ignoring `port`. Refer to [Port Range](/handbook/syntax/#port-ranges) for format.

## hop-interval

Port hop interval, in seconds, default is 30.

Entering "15-30" will randomly select one value as the switching interval each time. Only one range is supported (commas are not allowed).

## password

Authentication password.

## up/down

Brutal rate control; if no unit is specified, the default is Mbps.

## obfs

QUIC traffic obfuscator type. Can be set to `salamander` or `gecko`. If left blank, obfuscation is disabled.

## obfs-password

QUIC traffic obfuscator password.

## obfs-min-packet-size

Minimum wire packet size (in bytes). Restricted to `gecko` only.

## obfs-max-packet-size

Maximum wire packet size (in bytes). Restricted to `gecko` only.

## realm-opts

## handshake-timeout

Specified in seconds. When set, the handshake timeout is independent of the outer connection timeout. The default value is `0`, meaning the handshake uses only the outer connection timeout.

## client-fingerprint 👻

The browser whose QUIC handshake the proxy sends, as `tlsSettings.fingerprint` picks it in Xray: `firefox` is Firefox 160, `safari` is Safari 27.2 (Chrome with `ech-opts`), anything else, empty included, is Chrome. mihomo ignores the key for hysteria2. See [Browser QUIC handshake](/config/proxies/quic-parrot/#which-browser).

## disable-chrome-parrot 👻

By default the QUIC handshake of this proxy looks like a browser's, as with the official Hysteria client and Xray: the browser's Initial packets (1250 bytes for Chrome, 1230 over IPv6), connection IDs, TLS ClientHello and transport parameters. `true` sends quic-go's own handshake, as in mihomo and as `finalmask.quicParams.disableChromeParrot` in Xray. Default `false`.

- The server needs nothing, but its certificate must be ECDSA or RSA: the browsers offer no Ed25519 signature, so a server with an Ed25519 certificate needs `disable-chrome-parrot: true`.
- The browser's windows replace `initial-stream-receive-window` and `initial-connection-receive-window` (Chrome: 6 MiB per stream, 15 MiB per connection). The `max-*` options cap the auto-tuning, but values below the browser's windows are raised to them.
- Port hopping and reconnects keep the shape. With `obfs` the packets are obfuscated and the shape is not visible on the wire.

What each browser sends, what the server needs and how Xray JSON and links map to these keys: [Browser QUIC handshake](/config/proxies/quic-parrot/).

:::caution[After the update]
Up to v1.19.34-r1 hysteria2 sent quic-go's handshake. Now every hysteria2 node parrots a browser without anything in its config changing, as in Xray: a server with an Ed25519 certificate stops working for it, and `initial-stream-receive-window` / `initial-connection-receive-window` no longer apply. Such a server needs an ECDSA or RSA certificate, or `disable-chrome-parrot: true` on the node ([via the Remnawave host mapper](/remnawave/quic-handshake/)).
:::
