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

### Completed work
- Added the manager_language select with all eight required labels, current selection, title and hint. Uses the existing settings POST and saved/error feedback; missing keys do not create a row.
- Styled the select, bumped both asset cache keys to 2026-10-08-067-c, and added a releases.json entry using the existing fields. The miniapp-067-c identifier distinguishes this UI release from bot prompt versions.
- Stayed on the existing branch task/067-c-settings-tab-manager-group. No push, deployment, prompt changes or production writes.

### Acceptance checks
- DONE: `node --check app.js` exited 0.
- DONE: `node "$env:TEMP/gaudi-task-067-c-check.cjs"` exited 0. The throwaway Node VM script executes the actual settings/request functions with fake DOM elements and GET/POST responses. Checked all eight current selections/options, required title/hint, absent row when key missing, POST `{key:"manager_language",value:"de"}`, successful and failed save feedback, owner restrictions, and unchanged boolean-setting save behavior. Also parsed releases.json and checked both cache keys. Script is outside the repository.
- DONE: `git diff main --stat` and an allowed-path assertion list only app.js, style.css, index.html, releases.json and tasks/TASK-067-c.md. `git diff --check` passed.
- DONE: Commit subject `TASK-067-c: manager_language dropdown` on the current task branch; checked with `git log -1 --format=%s`.

### Remaining human actions
- After server-side TASK-067-b is applied and the UI is published, verify the setting in Telegram against the real API. Live testing is outside this task's local acceptance criteria.
- Requested root STATE.md is absent (`Get-Content STATE.md`: path not found); no STATE.md exists in this checkout. AGENTS.md, README.md, task and template were read. This does not block the scoped UI task.

### Blocked by
None.
