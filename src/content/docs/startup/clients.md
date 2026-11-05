---
title: "Clients"
---

Clients that ship Prizrak-Core or install it on request. Prizrak-Core is a drop-in replacement for mihomo, so it also runs in other mihomo clients once their core is replaced; 👻 features work only with Prizrak-Core.

## Prizrak-Core 👻

| Project | Platforms | Notes |
|:----|:----|:----|
| [Prizrak-Box](https://docs.prizrak.app/) | Windows, macOS, Linux, Android, Android TV, iOS (testing) | Prizrak-Core is built in, nothing to set up. |
| [TrayClash](https://github.com/q0wqex/TrayClash) | Windows | A very lightweight tray app, suitable for Windows 7. |
| [OpenWrt-exodus](https://prettyleaf.github.io/OpenWrt-exodus/) | OpenWrt, Asus, Keenetic, MikroTik | Router installer. To get Prizrak-Core, set the special variable during installation; see the OpenWrt-exodus docs for which one. |
| Standalone | all platforms | Download the binary from the [releases](https://github.com/legiz-ru/Prizrak-Core/releases/latest) and run it like mihomo: `prizrak-core -d <folder with config.yaml>`, or use the Docker image `ghcr.io/legiz-ru/prizrak-core`. See [Install](/startup/). |
