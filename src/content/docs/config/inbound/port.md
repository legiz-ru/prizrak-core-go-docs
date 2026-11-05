---
title: "Proxy Ports"
---

[HTTP/SOCKS/Mixed Port Verification and External Access](/config/general/#allow-lan)

## HTTP(S) Proxy Port

```yaml
port: 7890
```

## SOCKS4/4a/5 Proxy Port

```yaml
socks-port: 7891
```

## Mixed Port

:::::note
The mixed port is a special port that supports both HTTP(S) and SOCKS5 protocols. You can connect to this port using any program that supports HTTP or SOCKS proxies.
:::::

```yaml
mixed-port: 7892
```

## Transparent Proxy Port

:::::note
The redirect port is applicable only for Linux (Android) and macOS, while the tproxy port is applicable only for Linux (Android).
:::::

The redirect transparent proxy port can only proxy TCP traffic.

```yaml
redir-port: 7893
```

The tproxy transparent proxy port can proxy both TCP and UDP traffic.

```yaml
tproxy-port: 7894
```
