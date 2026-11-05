---
title: "General Fields"
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

Required, the name of the proxy group.

:::::note
If there are special characters, they should be enclosed in quotes.
:::::

## type

Required, the type of the proxy group.

## proxies

References to [outbound proxies](/config/proxies/) or other proxy groups.

## use

References to [proxy sets](/config/proxy-providers/).

## url

Health check test address.


## ping-config 👻

A second check after `url` for `url-test`, `fallback`, `load-balance` and `smart`: a node counts as alive only when it really downloads data, and checks run at random moments. See [ping-config](/config/proxy-groups/ping-config/).

## interval

Health check interval; if not 0, periodic testing is enabled, measured in seconds.

## lazy

Lazy state, defaults to `true`. If the current proxy group is not selected, no testing is performed.

## default-selected

The node selected by default. If this field is empty or the node name does not exist, the first node in the group is selected.

## empty-fallback

The fallback proxy when the group is empty. The default value is `COMPATIBLE`.

:::::note
You cannot enter the proxy group here; only the proxy name is supported.
:::::

## timeout

Health check timeout, measured in milliseconds.

## max-failed-times

Maximum number of failures; exceeding this triggers a forced health check, default is 5.

## disable-udp

Disables `UDP` for this proxy group.

## interface-name

:::danger
Removed. A `interface-name` in a proxy group is ignored with an error in the log; set [interface-name](/config/proxies/#interface-name) on the proxy nodes.
:::

## routing-mark

:::danger
Removed. A `routing-mark` in a proxy group is ignored with an error in the log; set [routing-mark](/config/proxies/#routing-mark) on the proxy nodes.
:::

## smart 👻

Prizrak-Core adds the `smart` group type: weight-based node selection with optional LightGBM prediction. See [Smart](/config/proxy-groups/smart/).

## include-all

Includes all [outbound proxies](/config/proxies/) and [proxy sets](/config/proxy-providers/), sorted by name.

:::::note
Inclusion does not include proxy groups; other proxy groups can be included in [proxies](/config/proxy-groups/#proxies).
:::::

## include-all-proxies

Includes all [outbound proxies](/config/proxies/), sorted by name.

:::::note
Inclusion does not include proxy groups; other proxy groups can be included in [`proxies`](/config/proxy-groups/#proxies).
:::::

## include-all-providers

Includes all [proxy sets](/config/proxy-providers/), sorted by name.

:::::note
This will invalidate [including proxy sets](/config/proxy-groups/#use).
:::::

## filter

Filters nodes that match keywords or [regular expressions](https://github.com/ziishaned/learn-regex/blob/master/README.md). Use `` ` `` to separate multiple regular expressions.

:::::note
This only applies to included proxy sets and [including all outbound proxies](/config/proxy-groups/#include-all-proxies).
:::::

## exclude-filter

Excludes nodes that match keywords or [regular expressions](https://github.com/ziishaned/learn-regex/blob/master/README.md). Use `` ` `` to separate multiple regular expressions.

## exclude-type

Regular expressions are not supported. Split by `|` and exclude by node type. This applies only to [included outbound proxies](#proxies).

For supported types, please refer to [Adapter Type](https://github.com/MetaCubeX/mihomo/blob/fbead56ec97ae93f904f4476df1741af718c9c2a/constant/adapters.go#L18-L45), ignore case sensitivity

## expected-status

The expected HTTP response status code during health checks. If this field is configured, a node is considered available only when the response status code matches the expected status. The default is `*`, indicating no requirements on the response status.

### syntax

You can use `/` to match multiple status codes, `-` to match a range of statuses, and mix them.

#### example

Match status codes 200 and 302.

```yaml
expected-status: 200/302
```

Match status codes from 400 to 503.

```yaml
expected-status: 400-503
```

Match status codes 200 and 302, as well as from 400 to 503.

```yaml
expected-status: 200/302/400-503
```

## hidden

Returns `hidden` status in the API to hide the display of this proxy group (requires front-end adaptation using the API).

## icon

Returns the string input for `icon` in the API to display in this proxy group (requires front-end adaptation using the API).
