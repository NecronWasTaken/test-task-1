# test-task-1

## Важно!
Я задании было указано: "При повторном запросе с фронта, отменять прошлый запрос." И т.к. это было указано в абзаце с условием к Backend'у, я предпологаю что отменять его нужно в рамках Backend'а (для Frontend'а я так понимаю есть AbortController). Информации о том, что я мог бы где то задать уточняющие вопросы, не было. 

Но я не смог найти или обойти самостоятельно CORS, что бы не ждать пока закончится прошлый запрос. Однако если запрос был изменен немного (хотя бы один знак в теле запроса), то запрос обрабатывается сразу, что я и использую.

## Способ запуска 
(в раздельных терминалах)
### Backend

```bash
cd backend
npm install
npm run build
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

http://localhost:5173/