---
title: "Клиенты"
---

Клиенты, которые поставляют Prizrak-Core или ставят его по запросу. Prizrak-Core — прямая замена mihomo, поэтому работает и в других клиентах mihomo после замены ядра; 👻 возможности работают только с Prizrak-Core.

## Prizrak-Core 👻

| Проект | Платформы | Примечание |
|:----|:----|:----|
| [Prizrak-Box](https://docs.prizrak.app/ru/) | Windows, macOS, Linux, Android, Android TV, iOS (тестирование) | Prizrak-Core уже встроен, ничего настраивать не нужно. |
| [TrayClash](https://github.com/q0wqex/TrayClash) | Windows | Очень лёгкое приложение в трее, подходит для Windows 7. |
| [OpenWrt-exodus](https://prettyleaf.github.io/OpenWrt-exodus/) | OpenWrt, Asus, Keenetic, MikroTik | Установщик для роутеров. Чтобы установился именно Prizrak-Core, при установке задайте специальную переменную; какую именно — смотрите в документации OpenWrt-exodus. |
| Отдельно | все платформы | Скачайте файл из [релизов](https://github.com/legiz-ru/Prizrak-Core/releases/latest) и запускайте как mihomo: `prizrak-core -d <папка с config.yaml>`, или используйте Docker-образ `ghcr.io/legiz-ru/prizrak-core`. См. [Установка](/ru/startup/). |
