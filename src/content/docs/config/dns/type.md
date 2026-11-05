---
title: "Supported Types"
---

## UDP

```yaml
- 223.5.5.5
- udp://223.5.5.5
```

## TCP

```yaml
- tcp://8.8.8.8
```

## DNS over TLS

```yaml
- tls://1.1.1.1
```

## DNS over HTTPS

```yaml
- https://doh.pub/dns-query
```

## DNS over QUIC

```yaml
- quic://dns.adguard.com:784
```

## system

```yaml
- system://
- system
```

## dhcp

```yaml
- dhcp://en0
```

CMFA only. Uses the system DNS servers.

```yaml
- dhcp://system
```

## tailscale

```yaml
- ts://tailscale
```

Query using the DNS configuration of the specified Tailscale outbound

## easytier

```yaml
- et://easytier
```

Only resolves A/PTR records in the overlay network of the specified EasyTier outbound; recommended to use in `nameserver-policy`

## rcode

```yaml
- rcode://success            # No error
- rcode://format_error       # Format error
- rcode://server_failure     # Server failure
- rcode://name_error         # Non-existent domain
- rcode://not_implemented    # Not implemented
- rcode://refused            # Query refused
```
