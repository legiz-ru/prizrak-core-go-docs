---
title: "GOST relay"
---

Переход через сервер [GOST](https://gost.run/) `relay`. Предназначен для использования в качестве [`dialer-proxy`](/ru/config/proxies/dialer-proxy/) под другим прокси (ss, vmess, vless, trojan…).

```yaml
proxies:
- name: "gost-relay-hop"
  type: gost-relay
  server: relay.example.com
  port: 443
  udp: true
  tls: true
  # forward: false
  # mux: true            # relay+mtls, если tls тоже включён
  # sni: relay.example.com
  # username: user
  # password: pass
  # client-fingerprint: chrome
  # fingerprint: xxxx
  # certificate: ./client.crt
  # private-key: ./client.key
  # skip-cert-verify: true

- name: "ss-over-gost"
  type: ss
  # адрес набирается со стороны relay-сервера: SS-сервер на самом relay-хосте
  server: 127.0.0.1
  port: 12345
  cipher: chacha20-ietf-poly1305
  password: "password"
  udp: true
  dialer-proxy: gost-relay-hop
```

[Общие поля](/ru/config/proxies/)

## forward

`false` (по умолчанию, динамический режим): relay подключается к адресу, который запросил верхний прокси, поэтому `server`/`port` верхнего прокси набираются со стороны relay-сервера. `true` (режим forward): relay-сервер отправляет поток на настроенную у него цель; адрес верхнего прокси нужен только чтобы запросить поток у `dialer-proxy`.

## tls

Обернуть соединение с relay в TLS (`relay+tls`). Вместе с `mux: true` — `relay+mtls`.

## mux

Мультиплексировать потоки в одном соединении.

## username / password

Аутентификация на relay.

## Поля TLS

`sni`, `skip-cert-verify`, `name-cert-verify`, `fingerprint`, `certificate`, `private-key` и `client-fingerprint` работают как в [настройке TLS](/ru/config/proxies/tls/).
