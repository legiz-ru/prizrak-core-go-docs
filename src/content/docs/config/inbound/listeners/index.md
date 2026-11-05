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

Inbound name. It can be matched by an [`inbound rule`](/config/rules/#in-name).

## type

Inbound type.

## listen

Listening address.

## port

Listening port. Supports the ports format described in [Port ranges](/handbook/syntax/#port-ranges).

## routing-mark

Sets the routing mark for the listening socket. Linux only.

## rule

Uses a [`sub-rule`](/config/sub-rule/) as the matching rules for this inbound. When empty, [`rules`](/config/rules/) is used by default. If the [`sub-rule`](/config/sub-rule/) is not found, [`rules`](/config/rules/) is used directly.

## proxy

Uses an [`outbound proxy`](/config/proxies/) or [`proxy group`](/config/proxy-groups/) directly. When empty, [`rules`](/config/rules/) is used by default.

:::::caution
When `proxy` is non-empty, its value must be a valid proxy name or an error will occur.
:::::
