---
title: "TLS Configuration"
---

```yaml
proxies:
- name: "tls-example"
  tls: true
  sni: example.com
  servername: example.com
  fingerprint: xxx
  alpn:
  - h2
  - http/1.1
  skip-cert-verify: true
  # name-cert-verify: example.com
  # certificate: xxxx
  # private-key: xxx
  client-fingerprint: chrome
  reality-opts:
    public-key: xxxx
    short-id: xxxx
    support-x25519mlkem768: true
  ech-opts:
    enable: true
    config: base64_encoded_config
    # query-server-name: xxx.com
  shadow-tls-opts: 
    version: 3 
    password: shadow-tls-password
  restls-opts:
    password: restls-password
    version-hint: tls13
  jls-opts:
    username: jls-user
    password: jls-password
  tlsmirror-opts:
    primary-key: MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY=
    explicit-nonce-ciphersuites: [
      156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 49195, 49196, 49197, 49198, 49199, 49200, 49201, 49202, 49290, 49291,
      49293, 49316, 49317, 49318, 49319, 49320, 49321, 49322, 49323, 49324, 49325,
      49326, 49327, 52392, 52393, 52394, 52395, 52396, 52397, 52398
    ]
    defer-instance-derived-write-time:
      base-nanoseconds: 0
      uniform-random-multiplier-nanoseconds: 0
    transport-layer-padding:
      enabled: false
    connection-enrolment:
      primary-egress-outbound: ""
    sequence-watermarking-enabled: false
    embedded-traffic-generator:
      steps:
        - name: example
          host: example.com
          path: /
          method: GET
          headers:
            - name: User-Agent
              value: mihomo
            - name: Accept
              values:
                - text/html
                - application/xhtml+xml
          connection-ready: true
          connection-recall-exit: true
          h2-do-not-wait-for-download-finish: false
          wait-time:
            base-nanoseconds: 1000000000
            uniform-random-multiplier-nanoseconds: 0
          next-step:
            - weight: 1
              goto-location: 0
```

## tls

Enables TLS, applicable only to protocols that use `tls`, with the `trojan` protocol requiring it to be enabled.

## sni/servername

The server name indication, referred to as `servername` in [`VMess`](/config/proxies/vmess/)/[`VLESS`](/config/proxies/vless/). If left empty, it defaults to the address in `server`.

## fingerprint

Certificate fingerprint, applicable only to protocols that use `tls`. You can obtain the fingerprint using the following command:
```bash
openssl x509 -noout -fingerprint -sha256 -inform pem -in yourcert.pem
```
Alternatively, you can obtain it through the "Certificates" section of the "SHA256 Fingerprint" in Chrome's "Certificate Viewer".

:::::caution

* When a leaf certificate (i.e., a certificate containing an SNI name) is entered, only the fingerprint of the certificate sent by the server is verified; no additional checks are performed.

* When the fingerprint of other types of certificates (such as intermediate or root certificates) is entered, it will be verified whether the certificate chain sent by the server was issued by that certificate. From v1.19.20 onwards, the SNI/servername requirement must also be met.

* The fingerprint in this field is the fingerprint of the complete certificate, not the "certificate public key fingerprint" defined in HPKP. Please do not confuse them.
:::::

## alpn

List of supported Application Layer Protocol Negotiation options, arranged in order of priority.

If both peers support ALPN, the selected protocol will be one from this list; if there are no mutually supported protocols, the connection will fail.

Refer to [Application-Layer Protocol Negotiation](https://en.wikipedia.org/wiki/Application-Layer_Protocol_Negotiation)

## skip-cert-verify

Bypasses certificate verification, applicable only to protocols that use `tls`.

## name-cert-verify

Optional. Only modifies the certificate's DNSName verification target, without altering the SNI.

## certificate

If filled, this enables [mTLS](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) (must be filled in with private-key). The content is the certificate in PEM format or the path to the certificate.

## private-key

If filled, this enables [mTLS](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) (must be filled in with certificate). The content is the private key corresponding to the certificate in PEM format or the path to the private key.

## client-fingerprint

Client uTLS fingerprint, applicable only to [`VMess`](/config/proxies/vmess/)/[`VLESS`](/config/proxies/vless/)/[`Trojan`](/config/proxies/trojan/)/[`AnyTLS`](/config/proxies/anytls/) protocols.

:::::note
Options: `chrome`, `firefox`, `safari`, `iOS`, `android`, `edge`, `360`, `qq`, `random`
If `random` is selected, a modern browser fingerprint will be generated based on Cloudflare Radar data.
:::::

:::tip[👻 prizrak-utls]
Prizrak-Core uses its own uTLS fork with current fingerprints (Chrome 155, Firefox 156, Safari 26.3) and adds `randomized`, `chrome120`, `firefox120`, `safari16`, `chrome_psk*`, `chrome_pq*` and `none`. See [prizrak-utls](/config/proxies/prizrak-utls/).
:::

## reality-opts

Configuration for reality; if not empty, reality will be enabled.

:::::caution
Due to xray-core's deliberately [incompatible behavior](https://github.com/XTLS/Xray-core/commit/af7eb68028732a8ee3c0e5d6ab2b8a657bb2e770), we will not consider compatibility with xray v26.7.11+ versions. If it cannot be used, replace the server (such as [mihomo native listener](/config/inbound/listeners/), sing-box, or an older xray-core version) or use another protocol instead.
:::::

:::tip[👻 Prizrak-Core]
REALITY in Prizrak-Core is aligned with current Xray-core, including v26.7.11 and newer, with the ML-DSA-65 signature check. See [REALITY](/config/proxies/reality/).
:::

### reality-opts.public-key

Public key corresponding to the reality server's private key.

### reality-opts.short-id

One of the server's short IDs.

### reality-opts.support-x25519mlkem768

👻 Ignored by Prizrak-Core: REALITY keeps the selected browser fingerprint, `X25519MLKEM768` included, as in Xray. For an older server pick an older fingerprint, e.g. `chrome120`.

Support for X25519-MLKEM768 key exchange.

### reality-opts.password 👻

The Xray name of the public key: if set, it is used instead of `public-key`. The `public-key` key is still required and may be left empty; with `password` alone the proxy fails with `'reality-opts' has unset fields: public-key`.

### reality-opts.mldsa65-verify 👻

The server's ML-DSA-65 public key (base64url, `mldsa65Verify` from `xray mldsa65`). When set, the REALITY certificate signature is checked. See [REALITY](/config/proxies/reality/).

### reality-opts.spider-x / show / master-key-log 👻

`spider-x` is the crawler path of Xray's REALITY client; `show` prints debug output; `master-key-log` writes TLS keys to a file for Wireshark.

## ech-opts

### ech-opts.enable

Enables ECH (Encrypted Client Hello). Setting it to true enables ECH.

### ech-opts.config

The ECH configuration, if empty, will be resolved via DNS; otherwise, it will be specified by this value, in the format of base64 encoded ech parameters (For example, `AEn+DQBFKwAgACABWIHUGj4u+PIggYXcR5JF0gYk3dCRioBW8uJq9H4mKAAIAAEAAQABAANAEnB1YmxpYy50bHMtZWNoLmRldgAA`).

:::::note
You can use the command `mihomo generate ech-keypair test.com` to generate a compliant self-signed ECH configuration pair for both the server and client. Please replace `test.com` with the SNI domain name you want to expose. The content after `Config:` in the output can be filled here, and the content after `Key:` should be filled in the server-side ECH configuration (`ech-key` in mihomo's listeners).
:::::

### ech-opts.query-server-name

Optional, if not empty, it is used to specify the domain name when resolving via DNS.

## shadow-tls-opts

Requires `tls: true`. Uses `sni` / `servername` from the general configuration as the ShadowTLS SNI.

### shadow-tls-opts.version

Supports `v1` / `v2` / `v3`. Defaults to `v2` if left empty.

### shadow-tls-opts.password

ShadowTLS password.

## restls-opts

Requires `tls: true`. Uses `sni` / `servername` from the general configuration as the Restls SNI.

### restls-opts.password

Restls password.

### restls-opts.version-hint

TLS version hint. Available values: `tls12` / `tls13`.

### restls-opts.restls-script

Optional Restls carrier traffic script after the handshake.

## jls-opts

Requires `tls: true`. Uses `sni` / `servername` from the general configuration as the JLS SNI.

### jls-opts.username

JLS username.

### jls-opts.password

JLS password.

## tlsmirror-opts

When `tls` is `true`, configuring `tlsmirror-opts` enables tlsmirror. The TLS carrier used by tlsmirror uses `servername`, `alpn`, `skip-cert-verify`, `name-cert-verify`, `fingerprint`, `certificate`, `private-key`, `client-fingerprint`, and `ech-opts` from the same outbound. If `servername` is empty, `server` is used.

:::::note
Currently, only VMess supports enabling tlsmirror. Do not use it with other protocols.
:::::

### tlsmirror-opts.primary-key

Required, base64 encoding of the 32-byte primary key.

### tlsmirror-opts.explicit-nonce-ciphersuites

Cipher suites with explicit nonce used by the TLS 1.2 carrier.

### tlsmirror-opts.defer-instance-derived-write-time

Delay before the first write.

### tlsmirror-opts.transport-layer-padding

Transport-layer padding settings.

### tlsmirror-opts.connection-enrolment

v2ray-compatible connection enrolment settings. For mihomo VMess outbound, `primary-egress-outbound` is usually left empty.

#### tlsmirror-opts.connection-enrolment.primary-ingress-outbound

Inbound-side control outbound tag used for connection enrolment. Usually used to match v2ray-compatible server configuration.

#### tlsmirror-opts.connection-enrolment.primary-egress-outbound

Outbound-side control outbound tag used for connection enrolment. For mihomo VMess outbound, this is usually left empty; v2ray can set a dedicated control outbound tag.

### tlsmirror-opts.sequence-watermarking-enabled

Whether to enable sequence watermarking.

### tlsmirror-opts.embedded-traffic-generator

Generates extra HTTP carrier traffic. The protocol is determined by `alpn`. It is disabled when `steps` is not configured.

#### tlsmirror-opts.embedded-traffic-generator.steps

List of HTTP carrier traffic steps. Steps run in order unless `next-step` selects another step.

#### tlsmirror-opts.embedded-traffic-generator.steps.name

Step name, used only as an identifier.

#### tlsmirror-opts.embedded-traffic-generator.steps.host

HTTP request target host.

#### tlsmirror-opts.embedded-traffic-generator.steps.path

HTTP request path.

#### tlsmirror-opts.embedded-traffic-generator.steps.method

HTTP request method.

#### tlsmirror-opts.embedded-traffic-generator.steps.headers

HTTP request header list. Each item uses `name` for the header name, `value` for a single value, or `values` for multiple values.

#### tlsmirror-opts.embedded-traffic-generator.steps.connection-ready

Deliver the proxy connection after this step finishes.

#### tlsmirror-opts.embedded-traffic-generator.steps.connection-recall-exit

Exit the carrier traffic after the proxy connection is closed.

#### tlsmirror-opts.embedded-traffic-generator.steps.h2-do-not-wait-for-download-finish

When the carrier protocol is `h2`, do not wait for the response body to finish reading.

#### tlsmirror-opts.embedded-traffic-generator.steps.wait-time

Wait time after the step finishes. Fields are the same as [tlsmirror-opts.defer-instance-derived-write-time](#tlsmirror-optsdefer-instance-derived-write-time).

#### tlsmirror-opts.embedded-traffic-generator.steps.next-step

Weighted candidate list for the next step. `weight` is the weight, and `goto-location` is the target step index.
