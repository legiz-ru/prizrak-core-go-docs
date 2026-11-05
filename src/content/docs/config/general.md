---
title: "General configuration"
---

## Allow LAN

Allows other devices to access the internet through Clash [proxy port](/config/inbound/port/).

Optional values: `true/false`

```yaml
allow-lan: true
```

Binding address, only allows other devices to access through this address.

- `"*"` binds to all IP addresses.
- `"192.168.31.31"` binds to a single IPV4 address.
- `"[aaaa::a8aa:ff:fe09:57d8]"` binds to a single IPV6 address.

```yaml
bind-address: "*"
```

Allowed IP address ranges for connection, applicable only when `allow-lan` is set to `true`.
Default values are `0.0.0.0/0` and `::/0`.

```yaml
lan-allowed-ips:
- 0.0.0.0/0
- ::/0
```

Disallowed IP address ranges for connection. Blacklist takes precedence over whitelist, default is empty.

```yaml
lan-disallowed-ips:
- 192.168.0.3/32
```

### User Authentication

User authentication for http(s), socks, and mixed proxies.

```yaml
authentication:
- "user1:pass1"
- "user2:pass2"
```

Set the IP ranges allowed to skip authentication.

```yaml
skip-auth-prefixes:
- 127.0.0.1/8
- ::1/128
```

## Operation Mode

- `rule` Rule-based matching
- `global` Global proxy (requires selecting proxy/strategy in GLOBAL proxy group)
- `direct` Global direct connection

defaulting to `rule` mode.

```yaml
mode: rule
```

## Log Level

Controls the logging level of Clash core, only output to console and control page.

```yaml
log-level: info
```

- `silent` Silent, no output.
- `error` Outputs logs of errors and unusable logs.
- `warning` Outputs logs of errors that do not affect operations, and logs of error level.
- `info` Outputs general operational logs, as well as logs of error and warning levels.
- `debug` Outputs as much information as possible during runtime.

## IPv6

Whether to allow the kernel to accept IPv6 traffic.

Available values: `true/false`. Default: `true`.

```yaml
ipv6: true
```

## TCP Keep Alive Settings

Modify this item to reduce the [power consumption issue](https://github.com/vernesong/OpenClash/issues/2614) on mobile devices

The interval for TCP Keep Alive packets, measured in seconds.

```yaml
keep-alive-interval: 15
```

The maximum idle time for TCP Keep Alive.

```yaml
keep-alive-idle: 15
```

Disable TCP Keep Alive; on Android, this is forcibly enabled by default.

```yaml
disable-keep-alive: false
```

## Process Matching Mode

Controls whether Clash matches processes.

- `always` Enables, forces matching of all processes.
- `strict` Default, Clash determines whether to enable.
- `off` Does not match processes, recommended for use on routers.

```yaml
find-process-mode: strict
```

## External Control (API)

External controller, allows controlling your Clash kernel using RESTful API.

API listening address, you can change `127.0.0.1` to `0.0.0.0` to listen on all IPs.

```yaml
external-controller: 127.0.0.1:9090
```

API CORS Header Configuration

```yaml
external-controller-cors:
  allow-origins:
    - '*'
  allow-private-network: true
```

Unix socket API listening address

:::::caution
Accessing API endpoints via Unix socket does not verify secrets. If enabled, please ensure security measures are in place.
:::::

```yaml
external-controller-unix: mihomo.sock
```

Windows Named Pipe API Listening Address

:::::caution
Accessing the API interface via Windows Named Pipe does not validate the secret. If enabled, please ensure your security.
:::::

```yaml
external-controller-pipe: \\.\pipe\mihomo
```

HTTPS-API listening address, requires configuring the tls section for certificate and private key configuration, external-controller must also be filled in.

```yaml
external-controller-tls: 127.0.0.1:9443
```

Sets the routing mark for the listening sockets of `external-controller` and `external-controller-tls`. Linux only.

```yaml
external-controller-routing-mark: 0
```

Starts a DoH server on the RESTful API port.

:::::caution
This URL does not verify the API secret. If enabled, make sure it is secured appropriately.
:::::

```yaml
external-doh-server: /dns-query
```

Access key for the API.

```yaml
secret: ""
```

## External User Interface

Allows running static webpage resources (such as Clash-dashboard) on Clash API, path is API address/ui.

```yaml
external-ui: /path/to/ui/folder
```

Can be an absolute path or a relative path to the Clash working directory.

:::::note
Note that if the path is not in the Clash working directory, please manually set the `SAFE_PATHS` environment variable to add it to the safe path. The syntax of this environment variable is the same as the PATH environment variable parsing rules of this operating system (i.e., semicolon-separated in Windows and colon-separated in other systems).
:::::

## Custom External User Interface Name

```yaml
external-ui-name: xd      # Merged into external-ui/xd
```

Not mandatory, will be updated to the specified folder during updates, if not configured, it will be updated directly to the `external-ui` directory.

## Custom External User Interface Download URL

```yaml
external-ui-url: "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip" # Get from GitHub Pages branch
```

## Cache

```yaml
profile:
  store-selected: true
  # Stores API selections for strategy groups for use on the next start
  store-fake-ip: true
  # Stores the fakeip mapping table, using the original mapping address when the domain connects again
  smart-collector-size: 100
  # 👻 Max size of smart_weight_data.csv in MB (collectdata of the smart group)
```

### smart-collector-size 👻

Largest size, in MB, of `smart_weight_data.csv`, the file that a [`smart` group](/config/proxy-groups/smart/) with `collectdata: true` writes to the working directory. Default: `100`.

## Smart group: LightGBM model 👻

Top-level keys for the LightGBM model of the [`smart` group](/config/proxy-groups/smart/) (used with `uselightgbm: true`).

```yaml
lgbm-auto-update: false
lgbm-update-interval: 72
lgbm-url: "https://github.com/vernesong/mihomo/releases/download/LightGBM-Model/Model.bin"
```

| Key | Default | Description |
|---|---|---|
| `lgbm-auto-update` | `false` | Download the model again on a schedule |
| `lgbm-update-interval` | `72` | Update interval in hours; at start the model is updated at once if it is older than that |
| `lgbm-url` | the vernesong `LightGBM-Model/Model.bin` release | Where to download `Model.bin` from |

The model is kept as `Model.bin` in the working directory. `POST /upgrade/lgbm` in the [API](/api/) downloads it right away.

## Unified Delay

When unified delay is enabled, RTT is calculated to eliminate latency differences caused by connection handshakes and other variations between proxy types.

Available values: `true/false`.

```yaml
unified-delay: true
```

## TCP Concurrency

Enable TCP concurrent connections, which will use all IP addresses resolved by DNS for connections, using the first successful connection.

Available values: `true/false`.

```yaml
tcp-concurrent: true
```

<a id="outbound-interface"></a>

## Outbound Interface

mihomo's traffic outbound interface.

```yaml
interface-name: en0
```

<a id="routing-mark"></a>

## Routing Mark

Provides a default traffic mark for outbound connections on Linux.

```yaml
routing-mark: 6666
```

## TLS

Currently only used for https in API.

```yaml
tls:
  certificate: string # Certificate PEM format or certificate path
  private-key: string # Private key PEM format corresponding to the certificate, or private key path
  ech-key: |-
    -----BEGIN ECH KEYS-----
    ACATwY30o/RKgD6hgeQxwrSiApLaCgU+HKh7B6SUrAHaDwBD/g0APwAAIAAgHjzK
    madSJjYQIf9o1N5GXjkW4DEEeb17qMxHdwMdNnwADAABAAEAAQACAAEAAwAIdGVz
    dC5jb20AAA==
    -----END ECH KEYS-----
  # ECH keys, if not empty, ECH will be enabled.
```

:::::note
Starting from version v1.19.18, automatic reloading is supported when `certificate`, `private-key`, or `ech-key` are local files.
:::::

## Global Client Fingerprint

:::::caution
Global TLS fingerprinting has been deprecated. Please set the [client-fingerprint](/config/proxies/tls/#client-fingerprint) directly within the proxy.
:::::

## GEO Data Mode

Changes the file used for GeoIP data between `mmdb` and `dat`. Available values: `true/false`; `true` selects `dat`. Default: `false`.

```yaml
geodata-mode: true
```

## GEO File Loading Mode

Optional loading modes are as follows:

- `standard`: Standard loader
- `memconservative`: Loader optimized for memory-limited (small memory) devices (default)

```yaml
geodata-loader: memconservative
```

## Auto Update GEO

```yaml
geo-auto-update: false
```

Update interval, unit is hours

```yaml
geo-update-interval: 24
```

## Custom GEO Download Address

```yaml
geox-url:
  geoip: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat"
  geosite: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"
  mmdb: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb"
  asn: "https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
```

## Custom Global UA

Custom UA used when downloading external resources, default is `clash.meta/<core version>`.

```yaml
global-ua: clash.meta
```

## ETag Support

ETag support for external resource downloads is enabled by default.

```yaml
etag-support: true
```
