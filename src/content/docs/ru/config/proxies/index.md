---
title: "Общие поля"
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

Прокси-узлы, содержимое в формате массива

## name

Обязательно, имя прокси, не должно повторяться

## type

Обязательно, тип прокси-узла

## server

Обязательно, сервер прокси-узла (домен/ip)

## port

Обязательно, порт прокси-узла

## ip-version

Версия IP, используемая прокси для исходящих соединений. Если это не direct, влияет на IP-адрес, используемый при разрешении имени сервера.

Допустимые значения: `dual`/`ipv4`/`ipv6`/`ipv4-prefer`/`ipv6-prefer`, по умолчанию `dual`

* ipv4: Использовать только IPv4
* ipv6: Использовать только IPv6
* ipv4-prefer: Предпочитать IPv4, для TCP выполняется разрешение двойного стека, соединения устанавливаются параллельно, но соединение IPv4 имеет приоритет. Для UDP выполняется разрешение двойного стека и используется первый полученный IPv4
* ipv6-prefer: Предпочитать IPv6, для TCP выполняется разрешение двойного стека, соединения устанавливаются параллельно, но соединение IPv6 имеет приоритет. Для UDP выполняется разрешение двойного стека и используется первый полученный IPv6

## udp

Разрешить ли UDP через прокси, по умолчанию `false`

:::::note
Эта опция по умолчанию включена в протоколах на основе `UDP`, таких как `TUIC`, а также в типах `direct` и `dns`
:::::

## interface-name

Указывает интерфейс, к которому привязывается узел, соединения будут устанавливаться через этот интерфейс

## routing-mark

Метка маршрутизации, добавляемая при установке соединения узлом

## tfo

Включить `TCP Fast Open`, действует только для протокола `TCP`

## mptcp

Включить `TCP Multi Path`, действует только для протокола `TCP`

## dialer-proxy

Указывает, через какой dialer-proxy текущий узел устанавливает соединение. Значение — имя [группы прокси](/ru/config/proxy-groups/) или [выходного прокси](/ru/config/proxies/). Подробнее см. в [документации по dialer-proxy](/ru/config/proxies/dialer-proxy/)

## udp-443 👻

`allow` (по умолчанию) или `reject`. С `reject` UDP-трафик на порт 443 (QUIC), который правило отправило через этот прокси, уходит в REJECT, и браузеры переходят на TCP. `quic` — алиас. Принимает любой тип прокси. См. [udp-443](/ru/config/proxies/udp-443/).

## mux.cool 👻

Мультиплексирование, совместимое с Xray (Mux.Cool, XUDP): блок с `enabled`, `max-carriers`, `max-concurrency`, `max-connections`, `xudp-concurrency` и `xudp-proxy-udp443`. Нельзя включать вместе со `smux`. См. [mux.cool](/ru/config/proxies/mux-cool/).

## smux

sing-mux, доступно только для протоколов, использующих tcp-транспорт

### smux.enabled

Включить ли мультиплексирование

### smux.protocol

Протокол мультиплексирования, поддерживаются следующие протоколы, по умолчанию используется `h2mux`

| Протокол | Описание                              |
|----------|--------------------------------------|
| `smux`   | &lt;https://github.com/xtaci/smux>      |
| `yamux`  | &lt;https://github.com/hashicorp/yamux> |
| `h2mux`  | &lt;https://golang.org/x/net/http2>     |

### smux.max-connections

Максимальное количество соединений

Конфликтует с `max-streams`

### smux.min-streams

Минимальное количество мультиплексированных потоков в соединении перед открытием нового соединения

Конфликтует с `max-streams`

### smux.max-streams

Максимальное количество мультиплексированных потоков в соединении перед открытием нового соединения

Конфликтует с `max-connections` и `min-streams`

### smux.statistic

Контролирует, отображается ли базовое соединение в панели, что упрощает разрыв базового соединения

### smux.only-tcp

Разрешать только tcp, если установлено в true, настройки smux не будут применяться к udp, соединения udp будут использовать протокол udp по умолчанию

### smux.padding

Включить заполнение

### smux.brutal-opts

Настройки TCP Brutal

#### smux.brutal-opts.enabled

Включить алгоритм контроля перегрузки TCP Brutal

#### smux.brutal-opts.up/down

Пропускная способность для загрузки и скачивания, по умолчанию в Mbps
