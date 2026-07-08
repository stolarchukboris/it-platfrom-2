Стек: Node.js, TS, MySQL, Express.js, Knex, JWT, Zod, bcryptjs

# Установка и запуск

1. Клонировать репозиторий в желаемое место:
```
git clone https://github.com/BVFBVF/it-platfrom-2.git
```

2. Создать и заполнить файл .env:
```
cp .env.example .env
```

3. Установить зависимости:
```
pnpm i
```

4. Запустить сервер:
```
pnpm start
```

# Эндпоинты
> [!IMPORTANT]  
> Эндпоинты и их группы, помеченные эмодзи 🔐, защищены и требуют авторизации для доступа (см. "Авторизация").  
>  
> Эндпоинты, помеченные эмодзи 🇦 доступны только пользователям с ролью "admin".  
>  
> Эндпоинты, помеченные эмодзи 🇲 доступны только пользователям с ролью "mentor" и выше.  
>  
> **Поддерживаемый Content-Type: application-json**.
## /auth
```http
POST /register
```
_Регистрирует email и пароль на сервере._  
  
**Input body**:
```json
{
	"email": "string@string.string",
	"password": "string"
}
```
**Responses**:  
  
🟩 **201**:
```json
{
	"message": "Пользователь зарегистрирован."
}
```
🟥 **409**:
```json
{
	"success": false,
	"error": "Пользователь с таким email-адресом уже существует."
}
```
##
```http
POST /login
```
_Аутентифицирует пользователя с email и паролем._  
  
**Input body**:
```json
{
	"email": "string@string.string",
	"password": "string"
}
```
**Responses**:  
  
🟩 **200**:
```json
{
	"token": "string"
}
```
🟥 **401**:
```json
{
	"success": false,
	"error": "Неверный email или пароль."
}
```
##
```http
GET /me 🔐
```
_Возвращает аутентифицированного пользователя._  
  
**Responses**:  
  
🟩 **200**:
```json
{
	"id": 0,
	"email": "string",
	"role": "string",
	"created_at": "string"
}
```
🟥 **404**:
```json
{
	"success": false,
	"error": "Пользователь не найден."
}
```
## /employees 🔐
```http
GET /
```
_Возвращает список всех сотрудников._  

**Responses**:  
  
🟩 **200**:
```json
{
	"data": [
		{
			"id": 0,
			"name": "string",
			"status": "string",
			"readiness_score": 0,
			"created_at": "string"
		}
	]
}
```
##
```http
POST / 🇲
```
_Создает на сервере нового сотрудника._  
  
**Input body**:
```jsonc
{
	"name": "string",
	"status": "string",  // optional, default: "active"
	"readiness_score": 0 // optional, default: 0
}
```
**Responses**:
  
🟩 **201**:
```json
{
	"message": "Сотрудник создан.",
	"data": {
		"id": 0,
		"name": "string",
		"status": "string",
		"readiness_score": "string"
	}
}
```
##
```http
PATCH /:id 🇲
```
_Редактирует информацию о сотруднике._  
  
**URL input parameter**: *id* (number) - ID сотрудника для редактирования.
  
**Input body**:
```jsonc
{
	"status": "string",  // optional
	"readiness_score": 0 // optional
}
```
**Responses**:  
  
🟩 **200**:
```json
{
	"message": "Изменений в данных сотрудника {id} не обнаружено.",
	"data": {
		"id": 0,
		"name": "string",
		"status": "string",
		"readiness_score": 0,
		"created_at": "string"
	}
}
```
🟩 **200**:
```json
{
	"message": "Сотрудник {id} обновлен.",
	"data": {
		"id": 0,
		"name": "string",
		"status": "string",
		"readiness_score": 0,
		"created_at": "string"
	}
}
```
🟥 **404**:
```json
{
	"success": false,
	"error": "Сотрудник {id} не найден."
}
```
##
```http
DELETE /:id 🇲
```
_Удаляет сотрудника из базы._  
  
**URL input parameter**: *id* (number) - ID сотрудника для удаления.
  
**Responses**:  
  
🟩 **200**:
```json
{
	"message": "Сотрудник {id} удален."
}
```
🟥 **404**:
```json
{
	"success": false,
	"error": "Сотрудник {id} не найден."
}
```
## /tasks 🔐
```http
GET /
```
_Возвращает список заданий._  
  
**URL query input parameters**:
- *assigneeId* (number) (optional) - ID сотрудника, задания которого нужно отобразить.
- *status* (string) (optional) - Статус, задания с которым нужно отобразить.  
  
**Responses**:  
  
🟩 **200**:
```jsonc
{
	"data": [
		{
			"id": 0,
			"title": "string",
			"assignee_id": 0,     // if not filtered by assigneeId
			"status": "string",   // if not filtered by status
			"deadline": "string",
			"priority": "string"
		}
	]
}
```
##
```http
GET /:id
```
_Возвращает подробную информацию о конкретном задании._  
  
**URL input parameter**: *id* (number) - ID задания, которое нужно отобразить.
  
**Responses**:  
  
🟩 **200**:
```json
{
	"data": {
		"id": 0,
		"title": "string",
		"assignee_id": 0,
		"status": "string",
		"deadline": "string",
		"priority": "string",
		"created_at": "string"
	}
}
```
🟥 **404**:
```json
{
	"success": false,
	"error": "Задание {id} не найдено."
}
```
##
```http
POST / 🇲
```
_Создает новое задание для сотрудника._  
  
**Input body**:
```json
{
	"title": "string",
	"assignee_id": 0,
	"deadline": "YYYY-MM-DD",
	"status": "string",
	"priority": "string"
}
```
**Responses**:
  
🟩 **201**:
```json
{
	"message": "Задание создано.",
	"data": {
		"title": "string",
		"assignee_id": 0,
		"deadline": "YYYY-MM-DD",
		"status": "string",
		"priority": "string"
	}
}
```
##
```http
PATCH /:id
```
_Редактирует информацию о задании._  
  
**URL input parameter**: *id* (number) - ID задания для редактирования.
  
**Input body**:
```jsonc
{
	"status": "string",  // optional
	"priority": "string" // optional
}
```
**Responses**:  
  
🟩 **200**:
```json
{
	"message": "Изменений в задании {id} не обнаружено.",
	"data": {
		"id": 0,
		"title": "string",
		"assignee_id": 0,
		"status": "string",
		"deadline": "YYYY-MM-DD",
		"priority": "string",
		"created_at": "string"
	}
}
```
🟩 **200**:
```json
{
	"message": "Задание {id} обновлено.",
	"data": {
		"id": 0,
		"title": "string",
		"assignee_id": 0,
		"status": "string",
		"deadline": "YYYY-MM-DD",
		"priority": "string",
		"created_at": "string"
	}
}
```
🟥 **404**:
```json
{
	"success": false,
	"error": "Задание {id} не найдено."
}
```
##
```http
DELETE /:id 🇦
```
_Удаляет задание из базы._  
  
**URL input parameter**: *id* (number) - ID задания для удаления.
  
**Responses**:  
  
🟩 **200**:
```json
{
	"message": "Задание {id} удалено."
}
```
🟥 **404**:
```json
{
	"success": false,
	"error": "Задание {id} не найдено."
}
```
## /reviews 🔐
```http
POST / 🇲
```
_Создает новое ревью для сотрудника._  
  
**Input body**:
```jsonc
{
    "employee_id": 0,
    "code_quality": 0,
    "communication": 0,
    "independence": 0,
    "speed": 0,
    "result": "string",
    "feedback": "string" // optional
}
```
**Responses**:
  
🟩 **201**:
```jsonc
{
	"message": "Ревью для сотрудника {id} создано.",
	"data": {
		"id": 0,
		"mentor_id": 0,
		"employee_id": 0,
		"code_quality": 0,
		"communication": 0,
		"independence": 0,
		"speed": 0,
		"result": "string",
		"feedback": "string" // optional
	}
}
```
##
```http
GET /employee/:id
```
_Возвращает список всех ревью сотрудника._  
  
**URL input parameter**: *id* (number) - ID сотрудника, ревью которого нужно отобразить.
  
**Responses**:  
  
🟩 **200**:
```jsonc
{
	"data": [
		{
			"id": 0,
			"mentor_id": 0,
			"employee_id": 0,
			"code_quality": 0,
			"communication": 0,
			"independence": 0,
			"speed": 0,
			"result": "string",
			"feedback": "string" // optional
		}
	]
}
```
🟥 **404**:
```json
{
	"success": false,
	"error": "Сотрудник {id} не найден."
}
```
##
```http
GET /:id
```
_Возвращает информацию о конкретном ревью._  
  
**URL input parameter**: *id* (number) - ID ревью, которое нужно отобразить.
  
**Responses**:  
  
🟩 **200**:
```jsonc
{
	"data": {
		"id": 0,
		"mentor_id": 0,
		"employee_id": 0,
		"code_quality": 0,
		"communication": 0,
		"independence": 0,
		"speed": 0,
		"result": "string",
		"feedback": "string" // optional
	}
}
```
🟥 **404**:
```json
{
	"success": false,
	"error": "Ревью {id} не найдено."
}
```

# Авторизация
Для доступа к ресурсам, требующим авторизацию, необходимо:  
1. Зарегистрироваться, если у вас еще нет учетной записи (` POST /auth/register`). Используйте свой email-адрес и пароль, состоящий из как минимум 10 символов.
2. Войти в систему с данными, с которыми вы регистрировались (`POST /auth/login`). Если все верно, вам будет выдан токен авторизации, который необходимо сохранить.
3. Делая запросы к защищенным ресурсам, добавлять заголовок Authorization:
```http
Authorization: Bearer ваш_токен_авторизации
```
> [!IMPORTANT]  
> Срок жизни Bearer-токена: 24 часа.
