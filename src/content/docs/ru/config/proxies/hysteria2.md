---
title: "Hysteria2"
---

[Справочная конфигурация](https://hysteria.network/ru/docs/advanced/Full-Client-Config/)

```yaml
proxies:
- name: "hysteria2"
  type: hysteria2
  server: server.com
  port: 443
  ports: 443-8443
  hop-interval: 30
  password: yourpassword
  up: "30 Mbps"
  down: "200 Mbps"
  # bbr-profile: "" # Возможные значения: "standard", "conservative", "aggressive". По умолчанию: "standard"
  obfs: salamander # Тип обфускатора трафика QUIC. Можно установить значение `salamander` или `gecko`. Если оставить пустым, обфускация будет отключена.
  obfs-password: yourpassword
  # obfs-min-packet-size: 512
  # obfs-max-packet-size: 1200
  sni: server.com
  skip-cert-verify: false
  name-cert-verify: example.com
  fingerprint: xxxx # Настройка отпечатка обеспечивает SSL pinning. Получить его можно командой: openssl x509 -noout -fingerprint -sha256 -inform pem -in yourcert.pem
  alpn:
    - h3
  # realm-opts:
  #   enable: true # Необходимо включить вручную.
  #   server-url: https://realm.hy2.io
  #   token: public
  #   realm-id: my-cabin-1f3a8c2e9b
  #   stun-servers:
  #     - stun.nextcloud.com:3478
  #     - stun.sip.us:3478
  #     - global.stun.twilio.com:3478
  #   # Следующая инструкция позволяет ввести конфигурацию TLS для URL-адреса сервера (sni, skip-cert-verify, name-cert-verify, fingerprint, certificate, private-key, alpn)
  #   # skip-cert-verify： false
  #   # name-cert-verify: example.com
  #   # ......
  # handshake-timeout: 30
  # client-fingerprint: chrome # 👻 браузер рукопожатия QUIC: chrome (по умолчанию), firefox или safari
  # disable-chrome-parrot: false # 👻 true: собственное рукопожатие QUIC от quic-go вместо браузерного
  # enable-session-resumption: false # 👻 возобновлять TLS-сессии по тикетам сервера
  ###специальные настройки quic-go, не изменяйте без необходимости, если не знаете, что делаете###
  # initial-stream-receive-window： 8388608
  # max-stream-receive-window： 8388608
  # initial-connection-receive-window： 20971520
  # max-connection-receive-window： 20971520
```

[Общие поля](/ru/config/proxies/)

[Поля TLS](/ru/config/proxies/tls/)

## ports

При настройке включает прыжки по портам, игнорирует `port`, формат описан в [диапазонах портов](/ru/handbook/syntax/#port-ranges)

## hop-interval

Интервал переключения портов в секундах, по умолчанию 30.

Ввод "15-30" будет случайным образом выбирать одно из значений в качестве интервала переключения каждый раз. Поддерживается только диапазон (запятые не допускаются).

## password

Пароль аутентификации

## up/down

Управление скоростью brutal, если единица измерения не указана, по умолчанию в Mbps

## obfs

Тип обфускатора трафика QUIC. Можно установить `salamander` или `gecko`; если значение пустое, обфускация отключена.

## obfs-password

Пароль для обфускатора трафика QUIC.

## obfs-min-packet-size

Минимальный размер сетевого пакета (в байтах). Доступно только для `gecko`.

## obfs-max-packet-size

Максимальный размер сетевого пакета (в байтах). Доступно только для `gecko`.

## realm-opts

## handshake-timeout

Указывается в секундах. После настройки тайм-аут рукопожатия не зависит от тайм-аута внешнего соединения. Значение по умолчанию — 0, что означает использование только тайм-аута внешнего соединения.

## client-fingerprint 👻

Браузер, чьё рукопожатие QUIC отправляет прокси, выбирается так же, как по `tlsSettings.fingerprint` в Xray: `firefox` — Firefox 160, `safari` — Safari 27.2 (Chrome при `ech-opts`), любое другое значение, в том числе пустое, — Chrome. mihomo для hysteria2 этот ключ игнорирует. См. [QUIC-рукопожатие браузера](/ru/config/proxies/quic-parrot/#какой-браузер).

## disable-chrome-parrot 👻

По умолчанию рукопожатие QUIC этого прокси похоже на браузерное, как у официального клиента Hysteria и Xray: пакеты Initial браузера (у Chrome 1250 байт, по IPv6 1230), идентификаторы соединения, TLS ClientHello и транспортные параметры. `true` отправляет собственное рукопожатие quic-go, как в mihomo и как `finalmask.quicParams.disableChromeParrot` в Xray. По умолчанию `false`.

- Серверу ничего не нужно, но его сертификат должен быть ECDSA или RSA: браузеры не предлагают подпись Ed25519, поэтому серверу с сертификатом Ed25519 нужен `disable-chrome-parrot: true`.
- Окна браузера заменяют `initial-stream-receive-window` и `initial-connection-receive-window` (у Chrome 6 МиБ на поток, 15 МиБ на соединение). Параметры `max-*` ограничивают автоподстройку, но значения ниже окон браузера поднимаются до них.
- Прыжки по портам и переподключения сохраняют форму. С `obfs` пакеты обфусцированы, и форма в сети не видна.

Что отправляет каждый браузер, что нужно серверу и как ключи приходят из Xray JSON и ссылок: [QUIC-рукопожатие браузера](/ru/config/proxies/quic-parrot/).

## enable-session-resumption 👻

`true` хранит TLS session tickets сервера и возобновляет по ним следующее соединение QUIC, как `tlsSettings.enableSessionResumption` в Xray. По умолчанию `false`. Возобновлённый hello — браузерный по `client-fingerprint` (из Go при `disable-chrome-parrot`). Если тикет разрешает 0-RTT, заранее уходят только SETTINGS HTTP/3; запрос авторизации и проксируемые потоки ждут конца рукопожатия. См. [Возобновление сессий](/ru/config/proxies/quic-parrot/#возобновление-сессий-enable-session-resumption).

:::caution[После обновления]
До v1.19.34-r1 включительно hysteria2 отправлял рукопожатие quic-go. Теперь каждый узел hysteria2 имитирует браузер, хотя в его конфиге ничего не менялось, — так же, как в Xray: сервер с сертификатом Ed25519 для него перестаёт работать, а `initial-stream-receive-window` / `initial-connection-receive-window` больше не действуют. Такому серверу нужен сертификат ECDSA или RSA либо `disable-chrome-parrot: true` на узле ([через маппер хоста Remnawave](/ru/remnawave/quic-handshake/)).
:::
