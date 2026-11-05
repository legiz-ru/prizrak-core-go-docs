---
title: "Общие поля"
---

```yaml
proxy-groups:
- name: "proxy"
  type: select
  proxies:
  - DIRECT
  - ss
  use:
  - provider1
  - provider1

  url: 'https://www.gstatic.com/generate_204'
  interval: 300
  lazy: true
  default-selected: ss
  empty-fallback: COMPATIBLE
  timeout: 5000
  max-failed-times: 5

  disable-udp: true
  interface-name: en0
  routing-mark: 11451
  include-all: false
  include-all-proxies: false
  include-all-providers: false
  filter: "(?i)港|hk|hongkong|hong kong"
  exclude-filter: "美|日"
  exclude-type: "Shadowsocks|Http"
  expected-status: 204
  hidden: true
  icon: xxx
```

## name

Обязательное поле, имя группы прокси.

:::::note
Если есть специальные символы, их следует заключить в кавычки.
:::::

## type

Обязательное поле, тип группы прокси.

## proxies

Ссылки на [исходящие прокси](/ru/config/proxies/) или другие группы прокси.

## use

Ссылки на [наборы прокси](/ru/config/proxy-providers/).

## url

Адрес для проверки работоспособности.


## ping-config 👻

Вторая проверка после `url` для `url-test`, `fallback`, `load-balance` и `smart`: узел считается живым, только если через него реально качаются данные, а проверки идут в случайные моменты. См. [ping-config](/ru/config/proxy-groups/ping-config/).

## interval

Интервал проверки работоспособности; если не равен 0, включается периодическое тестирование, измеряется в секундах.

## lazy

Ленивое состояние, по умолчанию `true`. Если текущая группа прокси не выбрана, тестирование не выполняется.

## default-selected

Узел, выбранный по умолчанию. Если поле пустое или указанное имя узла не существует, выбирается первый узел в группе.

## empty-fallback

Резервный прокси-сервер, когда группа пуста. Значение по умолчанию — `COMPATIBLE`.

:::::note
Здесь нельзя указать группу прокси-серверов; поддерживается только имя прокси-сервера.
:::::

## timeout

Таймаут проверки работоспособности, измеряется в миллисекундах.

## max-failed-times

Максимальное количество сбоев; при превышении этого значения срабатывает принудительная проверка работоспособности, по умолчанию 5.

## disable-udp

Отключает `UDP` для этой группы прокси.

## interface-name

:::danger
Удалён. `interface-name` в группе прокси игнорируется с ошибкой в логе; задавайте [interface-name](/ru/config/proxies/#interface-name) у узлов прокси.
:::

## routing-mark

:::danger
Удалён. `routing-mark` в группе прокси игнорируется с ошибкой в логе; задавайте [routing-mark](/ru/config/proxies/#routing-mark) у узлов прокси.
:::

## smart 👻

Prizrak-Core добавляет тип группы `smart`: выбор узла по весам с необязательным прогнозом LightGBM. См. [Smart](/ru/config/proxy-groups/smart/).

## include-all

Включает все [исходящие прокси](/ru/config/proxies/) и [наборы прокси](/ru/config/proxy-providers/), отсортированные по имени.

:::::note
Включение не включает группы прокси; другие группы прокси могут быть включены в [proxies](/ru/config/proxy-groups/#proxies).
:::::

## include-all-proxies

Включает все [исходящие прокси](/ru/config/proxies/), отсортированные по имени.

:::::note
Включение не включает группы прокси; другие группы прокси могут быть включены в [`proxies`](/ru/config/proxy-groups/#proxies).
:::::

## include-all-providers

Включает все [наборы прокси](/ru/config/proxy-providers/), отсортированные по имени.

:::::note
Это сделает недействительным [включение наборов прокси](/ru/config/proxy-groups/#use).
:::::

## filter

Фильтрует узлы, соответствующие ключевым словам или [регулярным выражениям](https://github.com/ziishaned/learn-regex/blob/master/translations/README-ru.md). Используйте `` ` `` для разделения нескольких регулярных выражений.

:::::note
Применяется только к включенным наборам прокси и [включению всех исходящих прокси](/ru/config/proxy-groups/#include-all-proxies).
:::::

## exclude-filter

Исключает узлы, соответствующие ключевым словам или [регулярным выражениям](https://github.com/ziishaned/learn-regex/blob/master/translations/README-ru.md). Используйте `` ` `` для разделения нескольких регулярных выражений.

## exclude-type

Не поддерживает регулярные выражения. Разделяется с помощью `|`, исключает на основе типа узла, исключает только [включенные исходящие прокси](#proxies).

Для поддерживаемых типов обратитесь к [Adapter Type](https://github.com/MetaCubeX/mihomo/blob/fbead56ec97ae93f904f4476df1741af718c9c2a/constant/adapters.go#L18-L45), без учета регистра.

## expected-status

Ожидаемый код статуса HTTP-ответа при проверках работоспособности. Если это поле настроено, узел считается доступным только когда код статуса ответа соответствует ожидаемому статусу. По умолчанию `*`, что означает отсутствие требований к статусу ответа.

### Синтаксис

Можно использовать `/` для сопоставления нескольких кодов статуса, `-` для сопоставления диапазона статусов, и комбинировать их.

#### Пример

Совпадение кодов статуса 200 и 302.

```yaml
expected-status: 200/302
```

Совпадение кодов статуса от 400 до 503.

```yaml
expected-status: 400-503
```

Совпадение кодов статуса 200 и 302, а также от 400 до 503.

```yaml
expected-status: 200/302/400-503
```

## hidden

Возвращает статус `hidden` в API, чтобы скрыть отображение этой группы прокси (требует адаптации фронтенда с использованием API).

## icon

Возвращает строку, введенную для `icon` в API, для отображения в этой группе прокси (требует адаптации фронтенда с использованием API).
