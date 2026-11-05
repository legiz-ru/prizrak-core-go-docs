---
title: "Глобальная конфигурация"
---

## Разрешить доступ из локальной сети

Разрешает другим устройствам использовать [порты прокси](/ru/config/inbound/port/) Clash для доступа в интернет

Возможные значения: `true/false`

```yaml
allow-lan: true
```

Привязка к адресу, разрешает другим устройствам доступ только через этот адрес

***`"*"`*** привязка ко всем IP-адресам

***`192.168.31.31`*** привязка к одному IPv4-адресу

***`[aaaa::a8aa:ff:fe09:57d8]`*** привязка к одному IPv6-адресу

```yaml
bind-address: "*"
```

Разрешенные диапазоны IP-адресов, работает только если `allow-lan` установлен в `true`
Значение по умолчанию: `0.0.0.0/0` и `::/0`

```yaml
lan-allowed-ips:
- 0.0.0.0/0
- ::/0
```

Запрещенные диапазоны IP-адресов, черный список имеет приоритет над белым списком, по умолчанию пусто

```yaml
lan-disallowed-ips:
- 192.168.0.3/32
```

### Аутентификация пользователей

Аутентификация пользователей для прокси `http(s)`/`socks`/`mixed`

```yaml
authentication:
- "user1:pass1"
- "user2:pass2"
```

Установка диапазонов IP-адресов, которым разрешено пропускать аутентификацию

```yaml
skip-auth-prefixes:
- 127.0.0.1/8
- ::1/128
```

## Режим работы

* ***`rule`*** режим правил
* ***`global`*** глобальный прокси (требуется выбрать прокси/политику в группе GLOBAL)
* ***`direct`*** глобальное прямое соединение

Этот параметр имеет значение по умолчанию - режим правил

```yaml
mode: rule
```

## Уровень логирования

Уровень логирования ядра Clash, отображается только в консоли и на странице управления

```yaml
log-level: info
```

* ***`silent`*** без вывода
* ***`error`*** вывод только ошибок, приводящих к невозможности использования
* ***`warning`*** вывод ошибок, не влияющих на работу, а также содержимое уровня error
* ***`info`*** вывод обычной информации о работе, а также содержимое уровней error и warning
* ***`debug`*** максимально подробный вывод всей информации о работе

## IPv6

Разрешить ядру принимать трафик IPv6

Возможные значения: `true/false`, по умолчанию `true`

```yaml
ipv6: true
```

## Настройки TCP Keep Alive

Изменение этого параметра для уменьшения [проблем с энергопотреблением](https://github.com/vernesong/OpenClash/issues/2614) на мобильных устройствах

Интервал отправки пакетов TCP Keep Alive в секундах

```yaml
keep-alive-interval: 15
```

Максимальное время бездействия TCP Keep Alive

```yaml
keep-alive-idle: 15
```

Отключить TCP Keep Alive; на Android это принудительно включено по умолчанию (то есть Keep Alive всегда отключён).

```yaml
disable-keep-alive: false
```

## Режим сопоставления процессов

Управляет сопоставлением процессов в Clash

* ***`always`*** включено, принудительное сопоставление всех процессов
* ***`strict`*** по умолчанию, Clash сам определяет, включать ли сопоставление
* ***`off`*** без сопоставления процессов, рекомендуется использовать на роутерах

```yaml
find-process-mode: strict
```

## Внешнее управление (API)

Внешний контроллер, позволяет управлять ядром Clash через RESTful API

API прослушивающий адрес, можно изменить 127.0.0.1 на 0.0.0.0 для прослушивания всех IP

```yaml
external-controller: 127.0.0.1:9090
```

Настройка заголовков CORS для API

```yaml
external-controller-cors:
  allow-origins:
    - '*'
  allow-private-network: true
```

Unix socket API прослушивающий адрес

:::::caution
При доступе к API через Unix socket проверка secret не выполняется, обеспечьте безопасность самостоятельно
:::::

```yaml
external-controller-unix: mihomo.sock
```

Windows namedpipe API прослушивающий адрес

:::::caution
При доступе к API через Windows namedpipe проверка secret не выполняется, обеспечьте безопасность самостоятельно
:::::

```yaml
external-controller-pipe: \\.\pipe\mihomo
```

HTTPS-API прослушивающий адрес, требует настройки сертификата и приватного ключа в разделе `tls`, для использования TLS также необходимо указать `external-controller`

```yaml
external-controller-tls: 127.0.0.1:9443
```

Устанавливает routing-mark для слушающих сокетов `external-controller` и `external-controller-tls`. Поддерживается только Linux.

```yaml
external-controller-routing-mark: 0
```

Запуск DOH-сервера на порту RESTful API

:::::caution
Этот URL не проверяет secret, обеспечьте безопасность самостоятельно
:::::

```yaml
external-doh-server: /dns-query
```

Ключ доступа к API

```yaml
secret: ""
```

## Внешний пользовательский интерфейс

Позволяет запускать статические веб-ресурсы (например, Clash-dashboard) через Clash API, путь доступа - адрес API/ui

```yaml
external-ui: /path/to/ui/folder
```

Может быть абсолютным путем или относительным путем к рабочему каталогу Clash

:::::note
Обратите внимание: если путь не находится в рабочем каталоге Clash, вручную задайте переменную среды `SAFE_PATHS`, чтобы добавить его в безопасный путь. Синтаксис этой переменной среды совпадает с правилами разбора переменной среды PATH в операционной системе: в Windows элементы разделяются точкой с запятой, а в других системах - двоеточием.
:::::

## Настройка имени внешнего пользовательского интерфейса

```yaml
external-ui-name: xd      #  объединяется как external-ui/xd
```

Необязательно, при обновлении будет использоваться указанная папка, если не настроено, то обновляется непосредственно в каталог external-ui

## Настройка URL для загрузки внешнего пользовательского интерфейса

```yaml
external-ui-url: "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip" #загрузка из ветки GitHub Pages
```

## Кэширование

```yaml
profile:
  store-selected: true
  # Сохранение выбора API для групп политик для использования при следующем запуске
  store-fake-ip: true
  # Сохранение таблицы сопоставления fakeip, при повторном подключении домена используется ранее назначенный адрес
  smart-collector-size: 100
  # 👻 Наибольший размер smart_weight_data.csv в МБ (collectdata группы smart)
```

### smart-collector-size 👻

Наибольший размер в МБ файла `smart_weight_data.csv`, который [группа `smart`](/ru/config/proxy-groups/smart/) с `collectdata: true` пишет в рабочую папку. По умолчанию `100`.

## Группа Smart: модель LightGBM 👻

Ключи верхнего уровня для модели LightGBM [группы `smart`](/ru/config/proxy-groups/smart/) (используется с `uselightgbm: true`).

```yaml
lgbm-auto-update: false
lgbm-update-interval: 72
lgbm-url: "https://github.com/vernesong/mihomo/releases/download/LightGBM-Model/Model.bin"
```

| Ключ | По умолчанию | Описание |
|---|---|---|
| `lgbm-auto-update` | `false` | Скачивать модель заново по расписанию |
| `lgbm-update-interval` | `72` | Интервал обновления в часах; при запуске модель обновляется сразу, если она старше |
| `lgbm-url` | релиз vernesong `LightGBM-Model/Model.bin` | Откуда скачивать `Model.bin` |

Модель хранится как `Model.bin` в рабочей папке. `POST /upgrade/lgbm` в [API](/ru/api/) скачивает её сразу.

## Унифицированная задержка

При включении унифицированной задержки рассчитывается RTT для устранения различий задержки между различными типами узлов из-за рукопожатия соединения

Возможные значения: `true/false`

```yaml
unified-delay: true
```

## Параллельные TCP-соединения

Включить одновременные TCP-соединения, которые будут использовать все IP-адреса, разрешенные DNS для соединений, используя первое успешное соединение.

Возможные значения: `true/false`

```yaml
tcp-concurrent: true
```

<a id="outbound-interface"></a>

## Интерфейс исходящего соединения

Интерфейс для исходящего трафика mihomo

```yaml
interface-name: en0
```

<a id="routing-mark"></a>

## Метка маршрутизации

Предоставляет метку трафика по умолчанию для исходящих соединений в Linux

```yaml
routing-mark: 6666
```

## TLS

В настоящее время используется только для HTTPS API

```yaml
tls:
  certificate: string # Сертификат в формате PEM или путь к сертификату
  private-key: string # Приватный ключ в формате PEM или путь к приватному ключу
  ech-key: |-
    -----BEGIN ECH KEYS-----
    ACATwY30o/RKgD6hgeQxwrSiApLaCgU+HKh7B6SUrAHaDwBD/g0APwAAIAAgHjzK
    madSJjYQIf9o1N5GXjkW4DEEeb17qMxHdwMdNnwADAABAAEAAQACAAEAAwAIdGVz
    dC5jb20AAA==
    -----END ECH KEYS-----
  # ECH ключи, если не пустые, ECH будет включен.
```

:::::note
Начиная с версии v1.19.18, поддерживается автоматическая перезагрузка, если `certificate`, `private-key` или `ech-key` являются локальными файлами.
:::::

## Глобальный отпечаток клиента

:::::caution
Глобальный отпечаток TLS устарел. Указывайте [client-fingerprint](/ru/config/proxies/tls/#client-fingerprint) непосредственно в proxy.
:::::

## Режим данных GEOIP

Изменение файла, используемого для geoip: mmdb или dat. Возможные значения: `true`/`false`, `true` для dat, по умолчанию `false`

```yaml
geodata-mode: true
```

## Режим загрузки GEO файлов

Доступные режимы загрузки:

* `standard`: стандартный загрузчик
* `memconservative`: загрузчик, оптимизированный для устройств с ограниченной памятью (значение по умолчанию)

```yaml
geodata-loader: memconservative
```

## Автоматическое обновление GEO

```yaml
geo-auto-update: false
```

Интервал обновления в часах

```yaml
geo-update-interval: 24
```

## Настройка URL для загрузки GEO

```yaml
geox-url:
  geoip: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat"
  geosite: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"
  mmdb: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb"
  asn: "https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
```

## Настройка глобального UA

Настройка User-Agent для загрузки внешних ресурсов, по умолчанию `clash.meta/<версия ядра>`

```yaml
global-ua: clash.meta
```

## Поддержка ETag

Поддержка ETag для загрузки внешних ресурсов, по умолчанию `true`

```yaml
etag-support: true
```
