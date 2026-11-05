---
title: "Подправила"
---

`sub-rules` задаёт именованные списки правил. Правило `SUB-RULE` в [`rules`](/ru/config/rules/) отправляет соединение в один из них, и дальше политику выбирают правила этого подправила.

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

Первый аргумент `SUB-RULE` — условие в записи [логического правила](/ru/config/rules/), второй — имя подправила.
