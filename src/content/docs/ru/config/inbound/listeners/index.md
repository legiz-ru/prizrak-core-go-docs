---
title: "LISTENERS"
---

```yaml
listeners:
- name: in-name
  type: shadowsocks
  port: 10000
  listen: 0.0.0.0
  routing-mark: 0
  rule: sub-rule-1
  proxy: proxy
```

## name

Имя входящего соединения, может использоваться для сопоставления с [`правилами входящих соединений`](/ru/config/rules/#in-name)

## type

Тип входящего соединения

## listen

Адрес прослушивания

## port

Порт прослушивания, поддерживает формат ports, формат описан в [диапазонах портов](/ru/handbook/syntax/#port-ranges)

## routing-mark

Устанавливает routing-mark для прослушивающего сокета. Поддерживается только Linux

## rule

Использует [`подправила`](/ru/config/sub-rule/) в качестве правил маршрутизации для входящих соединений. Если пусто, по умолчанию используются [`rules`](/ru/config/rules/). Если [`подправила`](/ru/config/sub-rule/) не найдены, напрямую используются [`rules`](/ru/config/rules/)

## proxy

Использует [`исходящий прокси`](/ru/config/proxies/) или [`группу политик`](/ru/config/proxy-groups/) напрямую для исходящих соединений. Если пусто, по умолчанию используются [`rules`](/ru/config/rules/)

:::::caution
Когда `proxy` не пусто, имя `proxy` должно быть корректным, иначе возникнет ошибка
:::::
