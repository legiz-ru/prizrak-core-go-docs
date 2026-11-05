---
title: "Экспериментальная конфигурация"
---

```yaml
experimental:
  quic-go-disable-gso: false
  quic-go-disable-ecn: true
  dialer-ip4p-convert: false
```

## quic-go-disable-gso

Отключить `GSO`

## quic-go-disable-ecn

Отключить `ECN`. По умолчанию `true`.

## dialer-ip4p-convert

Включить преобразование адреса [IP4P](https://github.com/heiher/natmap/wiki/faq#域名访问是如何实现的)
