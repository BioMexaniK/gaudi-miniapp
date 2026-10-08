# TASK-067-c: Settings tab — manager group language dropdown

**Status:** new
**Branch:** task/067-c-manager-language-ui (from main)

## Why
A new owner-only setting `manager_language` (text, default `ru`, allowed: ru,en,de,fr,es,it,pl,uk) is added on the server
side in the private repo (TASK-067-b: migration + Edge Function `admin`). The Settings tab must let the owner change it.
Until the server part is applied, the key will not exist in `GET /settings`, so the UI must not break when it is absent.

## What to do
1. Read `AGENTS.md`, `README.md` and the Settings rendering code in `app.js` (`renderSettings`, the `/settings` calls around
   lines 228 and 244) to see how other settings rows are rendered and saved.
2. Render `manager_language` as a `<select>` (not a free text field) with these options (value → label):
   `ru` Русский, `en` English, `de` Deutsch, `fr` Français, `es` Español, `it` Italiano, `pl` Polski, `uk` Українська.
   Label of the row: "Язык менеджерской группы" with a one-line hint: "На этом языке менеджеры видят переписку; свои сообщения
   пишут на нём же — клиенту уйдёт перевод."
3. Save through the same existing settings POST as other keys; same error/saved feedback.
4. If the key is missing in the response, do not render the row (no errors in console).
5. Bump `?v=` for `app.js` and `style.css` in `index.html` as README requires, add an entry to `releases.json` in the existing format.

## Files you may touch
`app.js`, `style.css`, `index.html`, `releases.json`, `tasks/TASK-067-c.md`.

## Do NOT
No `git push`, no publishing, no changes to other settings, no credentials, no manager data (this repo is PUBLIC).

## Acceptance criteria
- [ ] `node --check app.js` passes.
- [ ] A local fake-response check (any tiny node script or documented manual DOM check, not committed if throwaway) shows:
      select rendered with the right current value; row absent when key missing; save sends `{key:"manager_language", value:"de"}` in the same shape as other settings.
- [ ] `git diff main --stat` lists only allowed files.
- [ ] Commit "TASK-067-c: manager_language dropdown".

## Report rule
failed/skipped → concrete `blocked_by` (command + error).

---
## Executor report
