# Account Module

Личный кабинет: просмотр и редактирование профиля, история заказов.

## Структура

```
app/account/
├── components/     ProfileView, ProfileEditForm, ProfileActions
├── hooks/          useProfileEdit
├── orders/         Страница заказов
├── content.tsx     Страница кабинета
├── styled.ts
└── page.tsx
```

## Компоненты

- **ProfileView** — отображение имени, фамилии, телефона, адреса (сессия + snapshot после сохранения).
- **ProfileEditForm** — форма редактирования тех же полей (конфиг `formFields`).
- **ProfileActions** — Редактировать / Отмена·Сохранить, Мои заказы, Выйти.

## Редактирование профиля

Редактировать → правки в форме → Сохранить → `PUT /api/profile` → обновление локального snapshot и сессии NextAuth (`updateSession`). Ошибки показываются под формой.

**API:** `GET /api/profile` — данные из Firestore; `PUT /api/profile` — обновление полей (name, surname, phone, deliveryAddress). Коллекция `users`, авторизация обязательна.

## Хук useProfileEdit

Состояния: `isEditing`, `form`, `saveError`, `saving`, `profileSnapshot`. `displayUser` = сессия + snapshot для мгновенного отображения после сохранения. При входе в режим редактирования форма заполняется из `displayUser`; при сохранении — запрос к API, обновление snapshot, `updateSession()`, обработка ошибок.
