---
title: "Настройка входящих соединений"
---

mihomo может принимать трафик через прокси-порты, TUN и Listeners. Доступность входящего соединения из интернета зависит от адреса прослушивания, системной маршрутизации и настроек брандмауэра, а не от категории протокола.

## Способы настройки

### Прокси-порты

Параметры верхнего уровня `port`, `socks-port`, `mixed-port`, `redir-port` и `tproxy-port` подходят, когда требуется только один фиксированный набор прокси-портов.

См. [Прокси-порты](/ru/config/inbound/port/).

### TUN

Конфигурация `tun` верхнего уровня перехватывает системный трафик и подходит для автоматической маршрутизации, перехвата DNS и маршрутизации отдельных приложений.

См. [TUN](/ru/config/inbound/tun/).

### Listeners

`listeners` позволяет одновременно создавать несколько входящих соединений разных типов с разными адресами и портами. Общие поля, такие как `rule` и `proxy`, настраиваются независимо для каждого входящего соединения.

```yaml
listeners:
  - name: socks5-in-1
    type: socks
    port: 10808
    #listen: 0.0.0.0 # по умолчанию прослушивает 0.0.0.0
    # rule: sub-rule-name1 # по умолчанию использует rules, если sub-rule не найдено, то напрямую использует rules
    # proxy: proxy # если не пусто, то входящий трафик напрямую передается указанному proxy
    # udp: false # по умолчанию true
```

См. [Общие поля Listener](/ru/config/inbound/listeners/).

:::::caution
`listen: 0.0.0.0` включает прослушивание на всех сетевых интерфейсах. Входящие соединения HTTP, SOCKS и Mixed без TLS не следует напрямую открывать в интернет.
:::::

## Типы Listener

| Назначение | Типы |
|---|---|
| Прокси приложений | [HTTP](/ru/config/inbound/listeners/http/), [SOCKS](/ru/config/inbound/listeners/socks/), [Mixed](/ru/config/inbound/listeners/mixed/) |
| Прозрачное проксирование и перехват системного трафика | [Redirect](/ru/config/inbound/listeners/redirect/), [TProxy](/ru/config/inbound/listeners/tproxy/), [TUN](/ru/config/inbound/listeners/tun/) |
| Перенаправление портов | [Tunnel](/ru/config/inbound/listeners/tunnel/) |
| Серверы шифрованных прокси | [Shadowsocks](/ru/config/inbound/listeners/ss/), [VMess](/ru/config/inbound/listeners/vmess/), [VLESS](/ru/config/inbound/listeners/vless/), [Trojan](/ru/config/inbound/listeners/trojan/), [AnyTLS](/ru/config/inbound/listeners/anytls/), [Snell](/ru/config/inbound/listeners/snell/), [Mieru](/ru/config/inbound/listeners/mieru/), [Sudoku](/ru/config/inbound/listeners/sudoku/), [TrustTunnel](/ru/config/inbound/listeners/trusttunnel/) |
| Серверы QUIC / UDP | [TUIC v4](/ru/config/inbound/listeners/tuic-v4/), [TUIC v5](/ru/config/inbound/listeners/tuic-v5/), [Hysteria2](/ru/config/inbound/listeners/hysteria2/), [Hysteria2 Realm](/ru/config/inbound/listeners/hysteria2-realm/), [ShadowQUIC](/ru/config/inbound/listeners/shadowquic/) |

:::::note
TUN Listener предназначен для расширенных сценариев. Большинству пользователей следует использовать конфигурацию [TUN](/ru/config/inbound/tun/) верхнего уровня.
:::::

## Быстрые входящие подключения

`ss-config`, `vmess-config` и `tuic-server` по-прежнему можно использовать для быстрого создания соответствующих входящих подключений. Эти быстрые входящие подключения эквивалентны соответствующим Listener, а входящий трафик обрабатывается так же, как и трафик других входящих подключений, в соответствии с настроенным `mode`.

```yaml
ss-config: ss://2022-blake3-aes-256-gcm:vlmpIPSyHH6f4S8WVPdRIHIlzmB+GIRfoH3aNJ/t9Gg=@:23456
vmess-config: vmess://1:9d0cb9d0-964f-4ef6-897d-6c6b3ccf9e68@:12345

tuic-server:
  enable: true
  listen: 127.0.0.1:10443
  token: # TUIC v4; нельзя использовать вместе с users
    - TOKEN
  # users: # TUIC v5; нельзя использовать вместе с token
  #   00000000-0000-0000-0000-000000000000: PASSWORD-0
  #   00000000-0000-0000-0000-000000000001: PASSWORD-1
  certificate: ./server.crt
  private-key: ./server.key
  congestion-controller: bbr
  max-idle-time: 15000
  authentication-timeout: 1000
  alpn:
    - h3
  max-udp-relay-packet-size: 1500
```

:::::note
Быстрые входящие подключения удобны для существующих конфигураций и простых сценариев. Для новой конфигурации с дополнительными параметрами протокола или независимой маршрутизацией рекомендуется использовать `listeners`.
:::::
