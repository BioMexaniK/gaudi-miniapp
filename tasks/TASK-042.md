# TASK-042: Settings tab — integer fields + admin-only visibility

## Context

Round 2 of the Settings tab (see main-repo TASK-042): a new `integer` value_type is
being added to `app_settings`, and `GET /settings` becomes owner-only (403 for
managers). The frontend needs to match: render integer settings properly, and stop
showing the Settings tab to non-owners at all (today managers see it in a disabled/
read-only state — that's no longer correct, since they can't even fetch it anymore).

## 1. `app.js`

- `settingInput(row, disabled)`: add a branch for `row.value_type === "integer"` ->
  `<input type="number" step="1" min="0">`, `input.value = String(row.value ?? "")`.
  Keep the existing boolean/time/string branches as they are.
- `settingValue(input, valueType)`: for `"integer"`, return `Number(input.value)` (not
  the raw string) so the POST body carries a JSON number, matching how boolean already
  returns `input.checked` rather than a string.
- `loadProfile()`: it currently calls `setupTabs()` unconditionally after setting
  `currentRole`. Change this so `setupTabs()` (and everything downstream of it —
  `loadSettings()`, the settings tab button, the settings panel) only happens when
  `currentRole === "owner"`. For any other role, skip it entirely: leave `elements.tabs`
  and `elements.settings-tab`/`settings-panel` exactly as their HTML defaults (`hidden`),
  so the dashboard renders exactly as it did before the Settings tab existed, with no
  tab switcher visible at all. Do not call `loadSettings()` for non-owners under any
  path (they'd get a 403 from the now-owner-only `GET /settings` anyway, but the tab
  should never appear for them in the first place — don't let them prod it via API
  either, but the primary fix here is UI visibility).

## 2. `style.css`

No changes expected for the integer input specifically — it should pick up the existing
`.setting-field input:not([type="checkbox"])` styling (width/padding/border) since
`type="number"` is not excluded from that selector. Verify this is actually the case
after your `app.js` change; only touch CSS if the number input visibly doesn't match
the time/text inputs.

## Out of scope

- Any change to the dashboard tab itself, i18n strings unrelated to settings, or the
  admin API / n8n side (separate task).
- Don't bump the `?v=` cache-buster in `index.html` and don't merge to `main` — Claude
  reviews the diff and handles publishing.

## Acceptance

- A `value_type: "integer"` row renders as a number input, pre-filled with its current
  value, saves as a JSON number (not a string) on submit.
- A non-owner (`role !== "owner"`) sees no tabs UI and no settings panel at all — just
  the dashboard, unchanged from before the Settings tab existed.

Append your report under an "## Отчёт исполнителя" heading when done.

## Отчёт исполнителя

Изменён `app.js`:
- Для `value_type: "integer"` создаётся `input[type="number"]` с `step="1"`, `min="0"` и текущим значением; при сохранении передаётся `Number(input.value)`.
- Настройка вкладок доступна только владельцу; `loadSettings()` дополнительно защищён от вызова не-владельцем, поэтому `GET /settings` для него не выполняется.

Проверки выполнены:
- `node --check app.js` — успешно.
- Изолированный Node-сценарий проверил integer input и числовое значение в payload; для роли `manager` подтвердил отсутствие вызовов `setupTabs()` и `/settings`, сохранение исходных `hidden` для tabs/settings panel и загрузку дашборда.
- Селектор `.setting-field input:not([type="checkbox"])` покрывает `input[type="number"]`; CSS не менялся.
- `git diff --check` — успешно.
