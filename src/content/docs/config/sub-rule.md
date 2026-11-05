---
title: "Sub-rules"
---

`sub-rules` defines named rule lists. A `SUB-RULE` rule in [`rules`](/config/rules/) sends a connection into one of them; the sub-rule's own rules then choose the policy.

```yaml
sub-rules:
  rule1:
    - DOMAIN-SUFFIX,baidu.com,DIRECT
    - MATCH,PROXY
  sub-rule2:
    - IP-CIDR,1.1.1.1/32,REJECT
    - IP-CIDR,8.8.8.8/32,ss1
    - DOMAIN,dns.alidns.com,REJECT

rules:
  - SUB-RULE,(NETWORK,tcp),rule1
  - SUB-RULE,(OR,((NETWORK,udp),(DOMAIN,example.com))),sub-rule2
```

The first argument of `SUB-RULE` is a condition written like a [logic rule](/config/rules/); the second is the name of the sub-rule.
