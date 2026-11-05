---
title: "Поддерживаемые типы"
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

Только для cmfa, использует системный dns

```yaml
- dhcp://system
```

## tailscale

```yaml
- ts://tailscale
```

Запрос с использованием настроек DNS указанного исходящего соединения Tailscale

## easytier

```yaml
- et://easytier
```

Разрешает только A/PTR-записи overlay-сети указанного исходящего соединения EasyTier; рекомендуется использовать в `nameserver-policy`

## rcode

```yaml
- rcode://success            # Нет ошибки
- rcode://format_error       # Ошибка формата
- rcode://server_failure     # Ошибка сервера
- rcode://name_error         # Несуществующий домен
- rcode://not_implemented    # Не реализовано
- rcode://refused            # Запрос отклонен
```
