---
title: "AnyTLS"
---

```yaml
proxies:
- name: anytls
  type: anytls
  server: 1.2.3.4
  port: 443
  password: "<your password>"
  client-fingerprint: chrome
  udp: true
  # client-metadata: ""
  idle-session-check-interval: 30
  idle-session-timeout: 30
  min-idle-session: 0
  sni: "example.com"
  alpn:
    - h2
    - http/1.1
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
```

[Общие поля](/ru/config/proxies/)

[Поля TLS](/ru/config/proxies/tls/)

:::::tip
Mihomo не поддерживает комбинацию AnyTLS+Reality (и не будет поддерживать её в будущем). Если вы хотите скрыть SNI, используйте [ECH](/ru/config/proxies/tls/#ech-opts) или сочетайте AnyTLS с [ShadowTLS](/ru/config/proxies/tls/#shadow-tls-opts), [ResTLS](/ru/config/proxies/tls/#restls-opts) либо [JLS](/ru/config/proxies/tls/#jls-opts). Если вы настаиваете на использовании Reality, выберите протоколы [Vmess](/ru/config/proxies/vmess/), [VLESS](/ru/config/proxies/vless/) или [Trojan](/ru/config/proxies/trojan/).
:::::

## client-metadata

Необязательно. Метаданные клиента, отправляемые на сервер.

:::::caution
Поскольку `client-metadata` может использоваться для сбора информации о клиенте и дифференцированного отношения к клиентам, начиная с версии v1.19.30 эти данные больше не отправляются по умолчанию. При необходимости укажите их вручную.
:::::

## idle-session-check-interval

Интервал проверки неактивных сессий. По умолчанию: 30 секунд.

## idle-session-timeout

При проверке закрывает сессии, неактивные дольше этого значения. По умолчанию: 30 секунд.

## min-idle-session

При проверке первые n неактивных сессий остаются открытыми. По умолчанию: n=0
