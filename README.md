# Краткая информация
В файле .env хранится информация о бд и портах сервисов надо записать информацию для подключения к бд и порты на которых будут открыты сервисы

# Стек 
Express + TypeOrm + Postgres

# Для запуска 
```
npm run dev
```

# Ендпоинты

## Ендпоинт Product History

```
GET /api/product

Query Parameters:
plu
action 
product_id 
date_from 
date_to 
limit 
offset 
```

```
POST /api/product

Body:
product_id
plu
action
```

## Ендпоинт Remainder History

```
GET /api/remainder

Query Parameters:
plu
action 
shop_id 
product_id 
date_from 
date_to 
limit 
offset 
```

```
POST /api/remainder

Body:
shop_id
product_id
plu
action
```

# Важно!
Формат plu - ^\d{3}-\d{3}-\d{4}$

Пример: 123-123-1234