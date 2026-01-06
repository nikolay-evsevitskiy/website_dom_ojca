# Инструкция по деплою на GitHub Pages

## Автоматический деплой через GitHub Actions

Проект настроен для автоматического деплоя на GitHub Pages при каждом push в ветку `main`.

### Шаги для первого деплоя:

1. **Включите GitHub Pages в настройках репозитория (ОБЯЗАТЕЛЬНО!):**
   - Перейдите в репозиторий на GitHub
   - Откройте **Settings** (в верхнем меню репозитория)
   - В левом меню найдите раздел **Pages**
   - В разделе **"Source"** выберите **"GitHub Actions"** (НЕ "Deploy from a branch")
   - Сохраните изменения
   - ⚠️ **ВАЖНО**: Без этого шага деплой не будет работать!

2. **Закоммитьте и запушьте изменения:**
   ```bash
   git add .
   git commit -m "Настройка деплоя на GitHub Pages"
   git push origin main
   ```

3. **Проверьте статус деплоя:**
   - Перейдите в раздел "Actions" в вашем репозитории
   - Дождитесь завершения workflow "Deploy to GitHub Pages"
   - После успешного деплоя сайт будет доступен по адресу:
     `https://nikolay-evsevitskiy.github.io/website_dom_ojca/`

### Ручной запуск деплоя:

Если нужно запустить деплой вручную:
- Перейдите в раздел "Actions"
- Выберите workflow "Deploy to GitHub Pages"
- Нажмите "Run workflow"

## Важные замечания:

1. **Переменные окружения:** 
   - Для работы Gemini API нужно добавить `GEMINI_API_KEY` в Secrets репозитория (Settings → Secrets and variables → Actions)
   - Или создать файл `.env` локально (он не будет закоммичен)

2. **Base path:**
   - Проект автоматически определяет правильный base path для GitHub Pages
   - Если нужно изменить, отредактируйте `vite.config.ts`

3. **Изображения:**
   - Все изображения должны быть в папке `components/images/`
   - Используйте относительные пути: `./components/images/filename.png`

## Локальная сборка:

Для проверки сборки локально:
```bash
pnpm install
pnpm run build
pnpm run preview
```

