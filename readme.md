CaptchaService
-
Приложение является express оберткой над библиотекой [gm-captcha](https://github.com/eidonjoe/gm-captcha). 

Имеется всего одна точка входа: `/api/v1/captcha/create` которая создает каптчу, записывает base64 в redis и возвращает ключ-ответ в json формате.

---
### Зависимости:
* node 15.3.0+
* imagemagick
* graphicsmagick
* redis

### Установка:
* Переименовать .env.example в .env
* npm i
* node index.js
---

Сервис был разработан как простое и быстрое решение для Minecraft серверов. Работает в связке с плагином [CaptchaPlugin](https://github.com/UCRAFTS/CaptchaPlugin).