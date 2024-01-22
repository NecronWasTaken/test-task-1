# test-task-1

## Способ запуска 
(Использовался Docker Desktop v4.25.2)

```bash
cd tools && docker context use default
docker compose -p test-task --env-file=.env up --build
```
- http://localhost