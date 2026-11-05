---
title: "Common Fields"
---

```yaml
proxies:
- name: "ss"
  type: ss
  server: server
  port: 443
  ip-version: ipv4
  udp: true
  interface-name: eth0
  routing-mark: 1234
  tfo: false
  mptcp: false

  dialer-proxy: ss1

  smux:
    enabled: true
    protocol: smux
    max-connections: 4
    min-streams: 4
    max-streams: 0
    statistic: false
    only-tcp: false
    padding: true
    brutal-opts:
      enabled: true
      up: 50
      down: 100
```

Proxy nodes are written as an array.

## name

Required, proxy name. Must be unique.

## type

Required, proxy node type.

## server

Required, proxy node server (domain/IP).

## port

Required, proxy node port.

## ip-version

IP version used by outbound proxy connections. If the proxy is not `direct`, this affects which IP address is used when `server` is a domain name.

Available values: `dual`/`ipv4`/`ipv6`/`ipv4-prefer`/`ipv6-prefer`. Default: `dual`.

* `ipv4`: use IPv4 only.
* `ipv6`: use IPv6 only.
* `ipv4-prefer`: prefer IPv4. For TCP, dual-stack resolution is performed and connections are raced, but IPv4 connections are preferred. For UDP, dual-stack resolution is performed and the first IPv4 result is used.
* `ipv6-prefer`: prefer IPv6. For TCP, dual-stack resolution is performed and connections are raced, but IPv6 connections are preferred. For UDP, dual-stack resolution is performed and the first IPv6 result is used.

## udp

Whether to allow UDP through the proxy. Default: `false`.

:::::note
This option is enabled by default for UDP-based protocols such as `TUIC`, and for the `direct` and `dns` types.
:::::

## interface-name

Specifies the interface bound by the node. Connections are initiated from this interface.

## routing-mark

Routing mark attached when the node initiates connections.

## tfo

Enables `TCP Fast Open`. Only effective for the `TCP` protocol.

## mptcp

Enables `TCP Multi Path`. Only effective for the `TCP` protocol.

## dialer-proxy

Specifies that the current `proxies` entry establishes network connections through `dialer-proxy`. The value can be the `name` of a [proxy group](/config/proxy-groups/) or an [outbound proxy](/config/proxies/). See the [dialer-proxy documentation](/config/proxies/dialer-proxy/) for usage.

## udp-443 👻

`allow` (default) or `reject`. With `reject`, UDP traffic to port 443 (QUIC) that a rule sends through this proxy goes into REJECT, so browsers fall back to TCP. `quic` is an alias. Every proxy type takes it. See [udp-443](/config/proxies/udp-443/).

## mux.cool 👻

Xray-compatible multiplexing (Mux.Cool, XUDP), a block with `enabled`, `max-carriers`, `max-concurrency`, `max-connections`, `xudp-concurrency` and `xudp-proxy-udp443`. Cannot be enabled together with `smux`. See [mux.cool](/config/proxies/mux-cool/).

## smux

sing-mux, only for protocols using TCP transport.

### smux.enabled

Whether to enable multiplexing.

### smux.protocol

Multiplexing protocol. The following protocols are supported. Default: `h2mux`.

| Protocol | Description                            |
|----------|----------------------------------------|
| `smux`   | &lt;https://github.com/xtaci/smux>        |
| `yamux`  | &lt;https://github.com/hashicorp/yamux>   |
| `h2mux`  | &lt;https://golang.org/x/net/http2>       |

### smux.max-connections

Maximum number of connections.

Conflicts with `max-streams`.

### smux.min-streams

Minimum number of multiplexed streams in a connection before opening a new connection.

Conflicts with `max-streams`.

### smux.max-streams

Maximum number of multiplexed streams in a connection before opening a new connection.

Conflicts with `max-connections` and `min-streams`.

### smux.statistic

Controls whether the underlying connection is displayed in the dashboard, making it easier to interrupt the underlying connection.

### smux.only-tcp

Allows TCP only. If set to true, smux settings do not take effect for UDP; UDP connections use the node's default UDP transport directly.

### smux.padding

Enables padding.

### smux.brutal-opts

TCP Brutal settings.

#### smux.brutal-opts.enabled

Enables the TCP Brutal congestion control algorithm.

#### smux.brutal-opts.up/down

Upload and download bandwidth. Defaults to Mbps.
