# Настройка авторизации и Firebase

## Что было добавлено

✅ Авторизация с помощью NextAuth.js (Credentials Provider - email + пароль)
✅ Регистрация новых пользователей
✅ Личный кабинет с информацией о профиле
✅ История заказов с полной детализацией
✅ Автозаполнение формы заказа из профиля
✅ Возможность оформить заказ как гостем (без регистрации)
✅ Сохранение заказов в Firebase Firestore
✅ Навигация: кнопки "Войти" / "Аккаунт" в зависимости от статуса авторизации

## Шаги для настройки

### 1. Создайте проект Firebase

1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Нажмите "Создать проект" или "Add project"
3. Укажите название проекта (например, "green-shop")
4. Следуйте инструкциям мастера настройки

### 2. Настройте Firestore Database

1. В консоли Firebase выберите **Build → Firestore Database**
2. Нажмите "Create database"
3. Выберите режим:
    - **Production mode** для продакшена (с правилами безопасности)
    - **Test mode** для разработки (без ограничений, на 30 дней)
4. Выберите регион (например, `europe-west1`)

### 3. Создайте Web App в Firebase

1. В Project Overview нажмите на иконку **</>** (Web)
2. Укажите nickname приложения (например, "green-shop-web")
3. Скопируйте конфигурацию (apiKey, authDomain, projectId и т.д.)

### 4. Настройте переменные окружения

Создайте файл `.env.local` в корне проекта (скопируйте из `.env.local.example`):

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=ваш_api_key_из_шага_3
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ваш_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ваш_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ваш_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=ваш_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=ваш_app_id

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=сгенерируйте_секрет_командой_ниже
```

Для генерации `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 5. Настройте правила безопасности Firestore (опционально)

В консоли Firebase → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Пользователи: чтение своего профиля
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Заказы: чтение своих заказов
    match /orders/{orderId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }
  }
}
```

**⚠️ Важно:** Эти правила запретят регистрацию через API (так как API работает на сервере без auth контекста). Для разработки используйте тестовый режим или адаптируйте правила.

### 6. Запустите приложение

```bash
yarn dev
```

## Структура данных в Firestore

### Коллекция `users`

```typescript
{
  id: string (document ID),
  email: string,
  passwordHash: string,
  name: string,
  surname: string,
  phone: string,
  deliveryAddress: string,
  createdAt: string (ISO timestamp)
}
```

### Коллекция `orders`

```typescript
{
  id: string (document ID),
  userId: string | null, // null для гостей
  name: string,
  surname: string,
  phone: string,
  email: string,
  deliveryAddress: string,
  toApartment: boolean,
  items: [
    {
      id: number,
      title: string,
      price: number,
      count: number,
      category: string
    }
  ],
  totalPrice: number,
  status: 'pending' | 'processing' | 'completed' | 'cancelled',
  createdAt: string (ISO timestamp)
}
```

## Маршруты приложения

### Публичные страницы

- `/` - Главная
- `/products` - Каталог товаров
- `/login` - Вход
- `/register` - Регистрация
- `/cart` - Корзина (оформление заказа доступно всем)

### Защищённые страницы

- `/account` - Личный кабинет (требуется авторизация)
- `/account/orders` - История заказов (требуется авторизация)

### API endpoints

- `POST /api/register` - Регистрация нового пользователя
- `POST /api/auth/[...nextauth]` - NextAuth endpoints (логин, логаут, сессия)
- `GET /api/profile` - Получение профиля текущего пользователя
- `PUT /api/profile` - Обновление профиля
- `POST /api/order` - Создание заказа (авторизованный или гость)
- `GET /api/orders` - Получение списка заказов текущего пользователя

## Функционал

### Для незарегистрированных пользователей (гостей)

- Просмотр товаров
- Добавление в корзину
- Оформление заказа (нужно заполнить все поля формы)
- Заказ сохраняется в Firebase без привязки к userId

### Для зарегистрированных пользователей

- Всё то же + дополнительно:
- Личный кабинет с информацией о профиле
- История всех оформленных заказов
- Автозаполнение формы заказа из профиля
- Возможность редактировать профиль (через API `/api/profile`)

## Тестирование

1. Зарегистрируйте пользователя на `/register`
2. Войдите на `/login`
3. Проверьте личный кабинет `/account`
4. Оформите заказ в корзине - форма должна автоматически заполниться
5. Проверьте историю заказов `/account/orders`
6. Выйдите из аккаунта - кнопка "Аккаунт" должна смениться на "Войти"

## Возможные проблемы

### Firebase не инициализируется

- Проверьте, что все переменные окружения в `.env.local` заполнены
- Перезапустите dev-сервер после изменения `.env.local`

### Ошибка регистрации "Missing or insufficient permissions"

- Проверьте правила безопасности Firestore
- Для разработки используйте Test Mode

### Ошибка "NEXTAUTH_SECRET not set"

- Сгенерируйте секрет: `openssl rand -base64 32`
- Добавьте в `.env.local`: `NEXTAUTH_SECRET=ваш_сгенерированный_секрет`

## Дальнейшие улучшения (опционально)

- Добавить восстановление пароля
- Добавить OAuth провайдеры (Google, GitHub)
- Добавить редактирование профиля через UI
- Добавить статусы заказов и уведомления
- Добавить админ-панель для управления заказами
- Добавить возможность повторного заказа из истории
