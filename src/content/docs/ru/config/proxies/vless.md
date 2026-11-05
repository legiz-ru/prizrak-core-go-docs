---
title: "VLESS"
---

```yaml
proxies:
- name: "vless"
  type: vless
  server: server
  port: 443
  udp: true
  uuid: uuid
  flow: xtls-rprx-vision
  packet-encoding: xudp

  tls: true
  servername: example.com
  alpn:
  - h2
  - http/1.1
  fingerprint: xxxx
  client-fingerprint: chrome
  skip-cert-verify: true
  name-cert-verify: example.com
  shadow-tls-opts:
    version: 3
    password: shadow-tls-password
  restls-opts:
    password: restls-password
    version-hint: tls13
  jls-opts:
    username: jls-user
    password: jls-password
  reality-opts:
    public-key: xxxx
    short-id: xxxx
  encryption: ""

  network: tcp

  smux:
    enabled: false

  # 👻 только Prizrak-Core
  # udp-443: reject
  # mux.cool:
  #   enabled: true
  # finalmask:
  #   tcp:
  #     - type: fragment
  #       packets: tlshello
  #       lengths: ["1-1"]
  #       delays: ["0"]
```

:::::note
Контроль потока `xtls-*` в Meta фактически эквивалентен `xtls-*-udp443` в Xray-core. Если нужно блокировать UDP-трафик на порту 443, используйте логическое правило: `AND,((NETWORK,UDP),(DST-PORT,443)),REJECT`
:::::

[Общие поля](/ru/config/proxies/)

[Поля TLS](/ru/config/proxies/tls/)

## uuid

Обязательно, ID пользователя VLESS

## flow

Подпротокол VLESS, доступное значение - `xtls-rprx-vision`

## packet-encoding

Кодирование UDP-пакетов. Возможные значения: `xudp` (поддерживается `xray`, используется, если ключ пуст или имеет другое значение) / `packetaddr` (поддерживается `v2ray 5+`).

## encryption

Конфигурация клиента шифрования Vless:

`encryption: "mlkem768x25519plus.native/xorpub/random.1rtt/0rtt.(padding len).(padding gap).(X25519 Password).(ML-KEM-768 Client)..."`

(XTLS Vision с native/xorpub поддерживает Splice. Используется только режим 1-RTT / если число секунд в ticket, отправленном сервером, не равно нулю, используется повторное использование 0-RTT.)

/ Можно выбрать только один вариант. Далее следует как минимум одна строка base64. Разрешено неограниченное количество конкатенаций. Для генерации значения используйте `mihomo generate vless-x25519` и `mihomo generate vless-mlkem768`. При замене значения удалите скобки.

Padding — необязательный параметр, применяемый только к 1-RTT для устранения характерных признаков длины рукопожатия. Значение по умолчанию на обеих сторонах — `100-111-1111.75-0-111.50-0-3333`:

* После приветствия клиент/сервер с 1-RTT добавить случайное дополнение длиной от 111 до 1111 байт с вероятностью 100%.

* С вероятностью 75% ожидать случайное время от 0 до 111 миллисекунд (`probability-from-to`).

* С вероятностью 50% повторно отправить случайный padding длиной от 0 до 3333 байт (если длина равна 0, `Write()` не вызывается).

* Сервер и клиент могут задавать разные параметры padding, которые можно неограниченно объединять в порядке `len`, `gap`. Первый padding должен иметь вероятность 100% и длину не менее 35 байт.

## network

Транспортный уровень, поддерживает ws/http/h2/grpc/xhttp, если не настроен или настроен с другим значением, используется tcp

См. [Конфигурация транспортного уровня](/ru/config/proxies/transport/)

## finalmask 👻

Маски трафика из `finalmask` Xray-core: маски `tcp` (fragment, header-custom, sudoku, xmc, noise…) под TLS и маски `udp` (xdns, xicmp, udphop, noise…) под mKCP и XHTTP/3. Должны совпадать с `finalmask` входящего на сервере. Блок можно писать и в записи Xray (вложенные `settings`, ключи camelCase). См. [finalmask](/ru/config/proxies/finalmask/).

## Другие 👻 параметры

- [`reality-opts.mldsa65-verify`](/ru/config/proxies/reality/): проверка подписи ML-DSA-65 сертификата REALITY.
- [`xhttp-opts.h2-flow`](/ru/config/proxies/xhttp/): регулятор потока HTTP/2 у XHTTP.
- `network: mkcp` (алиас `kcp`): [VLESS поверх mKCP](/ru/config/proxies/finalmask/#vless-поверх-mkcp), как в Xray-core после finalmask.
- [`mux.cool`](/ru/config/proxies/mux-cool/) и [`udp-443`](/ru/config/proxies/udp-443/): см. [общие поля](/ru/config/proxies/).
