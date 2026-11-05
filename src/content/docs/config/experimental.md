---
title: "Experimental configuration"
---

```yaml
experimental:
  quic-go-disable-gso: false
  quic-go-disable-ecn: true
  dialer-ip4p-convert: false
```

## quic-go-disable-gso

Disable GSO (Generic Segmentation Offload).

## quic-go-disable-ecn

Disable ECN (Explicit Congestion Notification). Default: `true`.

## dialer-ip4p-convert

Enable [IP4P](https://github.com/heiher/natmap/wiki/faq#域名访问是如何实现的) address conversion.
