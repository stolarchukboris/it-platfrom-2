# it-platfrom-2

Стек: Node.js, TypeScript, Express.js, MySQL (или PostgreSQL)

## Задача — один эндпоинт

Написать простой REST API для сотрудников.

### Что нужно:

Модель Employee в БД:
- id
- name
- status (active / blocked / finished)
- readiness_score (число от 0 до 100)
- created_at

Эндпоинты:
- GET /employees — вернуть список всех сотрудников
- POST /employees — создать нового сотрудника
- PATCH /employees/:id — обновить статус или score

Требования:
- TypeScript, без any
- Валидация входных данных (хотя бы базовая)
- README с инструкцией как запустить
