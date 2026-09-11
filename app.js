"use strict";

const API = "https://plcjkuhxtodofyjnusjf.supabase.co/functions/v1/admin";
const SVG_NS = ["http:", "//www.w3.org/2000/svg"].join("");
const RESPONSE_STATUS = { success: 200, bad_request: 400, unauthorized: 401, forbidden: 403, not_found: 404, rate_limited: 429, internal: 500, upstream_unavailable: 503 };

const strings = {
  ru: {
    app_title: "Панель GAUDI", loading: "Загружаю…", today_dialogs: "Диалогов сегодня", owner: "Владелец", manager: "Менеджер", unknown_role: "Сотрудник",
    not_telegram: "Откройте панель из Telegram", unauthorized: "Не удалось подтвердить вход. Откройте панель заново из Telegram.", forbidden: "Нет доступа. Панель только для сотрудников GAUDI.", origin_denied: "Нет доступа. Панель только для сотрудников GAUDI.", not_found: "Раздел не найден.", bad_request: "Неверный период. Проверьте даты.", rate_limited: "Слишком много запросов. Подождите минуту.", upstream_unavailable: "Сервис временно недоступен, попробуйте ещё раз.", internal: "На нашей стороне что-то пошло не так.", retry: "Повторить",
    period: "Период", days_7: "7 дней", days_30: "30 дней", days_90: "90 дней", custom: "Произвольный", from: "С", to: "По", channel: "Канал", manager_filter: "Менеджер", all: "Все", telegram: "Telegram", whatsapp: "WhatsApp", web: "Web", email: "E-mail", invalid_period: "Неверный период. Проверьте даты.",
    volume: "Объём", dialogs: "Диалоги", client_messages: "Сообщения клиентов", bot_messages: "Ответы бота", new_leads: "Новые лиды", volume_chart: "Объём по дням и каналам",
    funnel: "Воронка", leads_total: "Лиды", engaged: "Вовлечены", with_contact: "Оставили контакт", with_cart: "Добавили в корзину", closed: "Закрыты", conversion: "Конверсия", funnel_channels: "По каналам",
    web_events: "Веб-трафик", opens: "Открытия чата", contact_opens: "Открытия контактов", cart_clicks: "Клики по корзине", web_note: "только веб-канал, по дню события — с воронкой в одной строке не складывается", web_chart: "Веб-события по дням",
    managers: "Менеджеры", open: "Открыты", claimed: "Взяты", unclaimed: "Не взяты", claim_p50: "Медиана до взятия", close_p50: "Медиана до закрытия", measured_threads: "по {n} тредам из {m}", manager_name: "Менеджер", replies: "Ответы", threads_claimed: "Взятые треды", last_reply: "Последний ответ",
    cost: "Расход токенов и скорость", tokens_in: "Входящие токены", tokens_out: "Исходящие токены", llm_calls: "LLM-вызовы", calls_per_answer: "Вызовов на ответ", measured_answers: "по {n} ответам", latency_p50: "Задержка p50", latency_p95: "Задержка p95", measured_on: "измерено на {n}", cost_coverage: "посчитано по {n} из {m} ответов; данные добираются ночью, поэтому сегодняшний день неполон", cost_chart: "Токены по дням", models: "По моделям", model: "Модель", with_tokens: "С токенами",
    routing: "Маршрутизация", branches: "По веткам", route_reasons: "По причинам маршрута", branch: "Ветка", route_reason: "Причина", share: "Доля", show_all: "Показать все",
    geo: "География и дилеры", countries: "Страны", dealers: "Дилеры", interests: "Интересы к товарам", country: "Страна", dealer: "Дилер", product_interest: "Интерес", leads: "Лиды", unknown_country: "без страны: {n} лидов", unknown_dealer: "без дилера: {n} лидов", unknown_interest: "без интереса: {n} лидов",
    quality: "Качество", reports_total: "Всего багрепортов", reports_open: "Открытые", statuses: "По статусам", categories: "По категориям", severities: "По серьёзности", status: "Статус", category: "Категория", severity: "Серьёзность", reports: "Отчёты",
    versions: "Версии промпта", prompt_version: "Версия", latency: "Задержка", main_share: "Доля main", low_sample_note: "строки, где меньше 20 ответов, статистически ничего не значат",
    no_data: "нет данных", no_period_data: "нет данных за период", hours_minutes: "{h} ч {m} мин", minutes: "{m} мин", seconds: "{s} сек", milliseconds: "{n} мс", percent: "{n}%"
  },
  en: {
    app_title: "GAUDI panel", loading: "Loading…", today_dialogs: "Dialogs today", owner: "Owner", manager: "Manager", unknown_role: "Team member",
    not_telegram: "Open the panel from Telegram", unauthorized: "We could not confirm your sign-in. Open the panel again from Telegram.", forbidden: "Access denied. This panel is for GAUDI staff only.", origin_denied: "Access denied. This panel is for GAUDI staff only.", not_found: "Section not found.", bad_request: "Invalid period. Check the dates.", rate_limited: "Too many requests. Please wait a minute.", upstream_unavailable: "The service is temporarily unavailable. Please try again.", internal: "Something went wrong on our side.", retry: "Retry",
    period: "Period", days_7: "7 days", days_30: "30 days", days_90: "90 days", custom: "Custom", from: "From", to: "To", channel: "Channel", manager_filter: "Manager", all: "All", telegram: "Telegram", whatsapp: "WhatsApp", web: "Web", email: "E-mail", invalid_period: "Invalid period. Check the dates.",
    volume: "Volume", dialogs: "Dialogs", client_messages: "Client messages", bot_messages: "Bot replies", new_leads: "New leads", volume_chart: "Daily volume by channel",
    funnel: "Funnel", leads_total: "Leads", engaged: "Engaged", with_contact: "Shared contact", with_cart: "Added to cart", closed: "Closed", conversion: "Conversion", funnel_channels: "By channel",
    web_events: "Web traffic", opens: "Chat opens", contact_opens: "Contact opens", cart_clicks: "Cart clicks", web_note: "web channel only, grouped by event day — it cannot be combined row-for-row with the funnel", web_chart: "Daily web events",
    managers: "Managers", open: "Open", claimed: "Claimed", unclaimed: "Unclaimed", claim_p50: "Median time to claim", close_p50: "Median time to close", measured_threads: "on {n} threads out of {m}", manager_name: "Manager", replies: "Replies", threads_claimed: "Threads claimed", last_reply: "Last reply",
    cost: "Token usage and speed", tokens_in: "Input tokens", tokens_out: "Output tokens", llm_calls: "LLM calls", calls_per_answer: "Calls per answer", measured_answers: "on {n} answers", latency_p50: "Latency p50", latency_p95: "Latency p95", measured_on: "measured on {n}", cost_coverage: "counted on {n} out of {m} replies; data is backfilled nightly, so today is incomplete", cost_chart: "Daily tokens", models: "By model", model: "Model", with_tokens: "With tokens",
    routing: "Routing", branches: "By branch", route_reasons: "By route reason", branch: "Branch", route_reason: "Reason", share: "Share", show_all: "Show all",
    geo: "Geography and dealers", countries: "Countries", dealers: "Dealers", interests: "Product interests", country: "Country", dealer: "Dealer", product_interest: "Interest", leads: "Leads", unknown_country: "without country: {n} leads", unknown_dealer: "without dealer: {n} leads", unknown_interest: "without interest: {n} leads",
    quality: "Quality", reports_total: "Total bug reports", reports_open: "Open", statuses: "By status", categories: "By category", severities: "By severity", status: "Status", category: "Category", severity: "Severity", reports: "Reports",
    versions: "Prompt versions", prompt_version: "Version", latency: "Latency", main_share: "Main share", low_sample_note: "rows with fewer than 20 replies are not statistically meaningful",
    no_data: "no data", no_period_data: "no data for the period", hours_minutes: "{h} h {m} min", minutes: "{m} min", seconds: "{s} sec", milliseconds: "{n} ms", percent: "{n}%"
  }
};

const webApp = window.Telegram && window.Telegram.WebApp;
const languageCode = webApp && webApp.initDataUnsafe && webApp.initDataUnsafe.user ? webApp.initDataUnsafe.user.language_code : "";
const locale = String(languageCode || "").toLowerCase().startsWith("ru") ? "ru" : "en";
const t = strings[locale];
const numberFormat = new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US", { maximumFractionDigits: 2 });
let currentPreset = 30;
let statsController = null;

const elements = {
  profile: document.getElementById("profile"), title: document.getElementById("app-title"), name: document.getElementById("user-name"), role: document.getElementById("user-role"), count: document.getElementById("dialog-count"), metricLabel: document.getElementById("metric-label"),
  feedback: document.getElementById("feedback"), message: document.getElementById("message"), retry: document.getElementById("retry"), filters: document.getElementById("filters"), periodLabel: document.getElementById("period-label"), chips: document.getElementById("period-chips"), customDates: document.getElementById("custom-dates"), dateFrom: document.getElementById("date-from"), dateTo: document.getElementById("date-to"), fromLabel: document.getElementById("from-label"), toLabel: document.getElementById("to-label"), filterError: document.getElementById("filter-error"), channelLabel: document.getElementById("channel-label"), channel: document.getElementById("channel"), managerWrap: document.getElementById("manager-wrap"), managerLabel: document.getElementById("manager-label"), manager: document.getElementById("manager"), dashboard: document.getElementById("dashboard")
};

function text(key, replacements = {}) { return Object.entries(replacements).reduce((value, [name, replacement]) => value.replace(`{${name}}`, String(replacement)), t[key]); }
function node(tag, className, value) { const item = document.createElement(tag); if (className) item.className = className; if (value !== undefined) item.textContent = value; return item; }
function svgNode(tag, attributes = {}) { const item = document.createElementNS(SVG_NS, tag); Object.entries(attributes).forEach(([name, value]) => item.setAttribute(name, String(value))); return item; }
function fmt(value) { if (value === null || value === undefined) return "—"; return typeof value === "number" ? numberFormat.format(value) : String(value); }
function pct(value) { return value === null || value === undefined ? "—" : text("percent", { n: numberFormat.format(value * 100) }); }
function seconds(value) { if (value === null || value === undefined) return "—"; const total = Math.round(value); const hours = Math.floor(total / 3600); const minutes = Math.floor((total % 3600) / 60); if (hours) return text("hours_minutes", { h: hours, m: minutes }); if (minutes) return text("minutes", { m: minutes }); return text("seconds", { s: total }); }
function dateTime(value) { if (value === null || value === undefined) return "—"; const date = new Date(value); return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", { dateStyle: "short", timeStyle: "short" }).format(date); }
function stat(label, value, hint) { const box = node("div", "stat"); box.append(node("strong", "stat-value", fmt(value)), node("span", "metric-label", label)); if (hint) box.append(node("span", "hint", hint)); return box; }
function metrics(items) { const grid = node("div", "metrics-grid"); items.forEach((item) => grid.append(stat(item[0], item[1], item[2]))); return grid; }
function block(title) { const section = node("section", "dashboard-block"); section.append(node("h2", "", title)); return section; }
function empty(period = false) { return node("p", "empty", t[period ? "no_period_data" : "no_data"]); }
function heading(value) { return node("h3", "", value); }

function table(headers, rows, lowSample) {
  const wrap = node("div", "table-wrap"); const tableElement = node("table"); const head = node("thead"); const headRow = node("tr");
  headers.forEach((header) => headRow.append(node("th", "", header))); head.append(headRow); tableElement.append(head);
  const body = node("tbody"); rows.forEach((row, index) => { const tr = node("tr", lowSample && lowSample(index) ? "low-sample" : ""); row.forEach((cell) => tr.append(node("td", "", cell))); body.append(tr); });
  tableElement.append(body); wrap.append(tableElement); return wrap;
}

function chartShell(titleText, height) { const wrap = node("div", "chart"); const svg = svgNode("svg", { viewBox: `0 0 640 ${height}`, role: "img", "aria-label": titleText }); const title = svgNode("title"); title.textContent = titleText; svg.append(title); wrap.append(svg); return { wrap, svg }; }
function chartEmpty() { const wrap = node("div", "chart"); wrap.append(empty(true)); return wrap; }

function barChart(rows, series, titleText, groupKey = "day", categoryKey = "channel") {
  if (!rows.length) return chartEmpty();
  const groups = [...new Set(rows.map((row) => String(row[groupKey])))].sort(); const categories = categoryKey ? [...new Set(rows.map((row) => String(row[categoryKey])))] : series;
  const values = new Map(); rows.forEach((row) => { const key = String(row[groupKey]); if (!values.has(key)) values.set(key, {}); series.forEach((field) => { const category = categoryKey ? String(row[categoryKey]) : field; values.get(key)[category] = (values.get(key)[category] || 0) + (Number(row[field]) || 0); }); });
  const totals = groups.map((group) => Object.values(values.get(group)).reduce((sum, value) => sum + value, 0)); const max = Math.max(...totals, 1); const { wrap, svg } = chartShell(titleText, 220); const left = 8; const top = 10; const bottom = 35; const usable = 220 - top - bottom; const slot = (640 - left * 2) / groups.length; const width = Math.max(1, slot * 0.7);
  groups.forEach((group, index) => { let y = top + usable; categories.forEach((category, categoryIndex) => { const value = values.get(group)[category] || 0; const height = value / max * usable; y -= height; const rect = svgNode("rect", { x: left + index * slot + (slot - width) / 2, y, width, height, class: "chart-mark", opacity: 1 - categoryIndex * (0.65 / Math.max(categories.length, 1)) }); const itemTitle = svgNode("title"); itemTitle.textContent = `${group}: ${category} ${fmt(value)}`; rect.append(itemTitle); svg.append(rect); }); });
  const step = Math.max(1, Math.ceil(groups.length / 6)); groups.forEach((group, index) => { if (index % step !== 0 && index !== groups.length - 1) return; const label = svgNode("text", { x: left + index * slot + slot / 2, y: 210, "text-anchor": "middle" }); label.textContent = group.slice(5); svg.append(label); }); return wrap;
}

function lineChart(rows, series, titleText) {
  if (!rows.length) return chartEmpty(); const max = Math.max(...rows.flatMap((row) => series.map((field) => Number(row[field]) || 0)), 1); const { wrap, svg } = chartShell(titleText, 220); const left = 10; const top = 12; const bottom = 35; const usable = 220 - top - bottom; const stepX = rows.length > 1 ? (640 - left * 2) / (rows.length - 1) : 0;
  series.forEach((field, seriesIndex) => { const points = rows.map((row, index) => `${left + index * stepX},${top + usable - (Number(row[field]) || 0) / max * usable}`).join(" "); svg.append(svgNode("polyline", { points, fill: "none", class: "chart-mark", "stroke-width": 3, opacity: 1 - seriesIndex * 0.45 })); rows.forEach((row, index) => { const circle = svgNode("circle", { cx: left + index * stepX, cy: top + usable - (Number(row[field]) || 0) / max * usable, r: 3, class: "chart-mark", opacity: 1 - seriesIndex * 0.45 }); const itemTitle = svgNode("title"); itemTitle.textContent = `${row.day}: ${t[field] || field} ${fmt(row[field])}`; circle.append(itemTitle); svg.append(circle); }); });
  const labelStep = Math.max(1, Math.ceil(rows.length / 6)); rows.forEach((row, index) => { if (index % labelStep !== 0 && index !== rows.length - 1) return; const label = svgNode("text", { x: left + index * stepX, y: 210, "text-anchor": index === 0 ? "start" : index === rows.length - 1 ? "end" : "middle" }); label.textContent = String(row.day).slice(5); svg.append(label); }); return wrap;
}

function hBarChart(rows, labelKey, valueKey, titleText, valueFormatter = fmt) {
  if (!rows.length) return chartEmpty(); const max = Math.max(...rows.map((row) => Number(row[valueKey]) || 0), 1); const height = 28 + rows.length * 34; const { wrap, svg } = chartShell(titleText, height);
  rows.forEach((row, index) => { const y = 12 + index * 34; const label = svgNode("text", { x: 5, y: y + 9 }); label.textContent = String(row[labelKey] ?? "—"); svg.append(label); const value = svgNode("text", { x: 635, y: y + 9, "text-anchor": "end" }); value.textContent = valueFormatter(row[valueKey]); svg.append(value); svg.append(svgNode("rect", { x: 5, y: y + 15, width: Math.max(1, (Number(row[valueKey]) || 0) / max * 630), height: 9, rx: 5, class: "chart-mark" })); }); return wrap;
}

function renderVolume(volume) {
  const section = block(t.volume); if (!volume.by_day.length) { section.append(empty(true)); return section; }
  section.append(metrics([[t.dialogs, volume.totals.dialogs], [t.client_messages, volume.totals.client_messages], [t.bot_messages, volume.totals.bot_messages], [t.new_leads, volume.totals.new_leads]]));
  section.append(barChart(volume.by_day, ["dialogs"], t.volume_chart)); return section;
}

function renderFunnel(funnel) {
  const section = block(t.funnel); if (!funnel.by_day.length && !funnel.by_channel.length) { section.append(empty(true)); return section; }
  const steps = [["leads_total", null], ["engaged", "conv_engaged"], ["with_contact", "conv_contact"], ["with_cart", "conv_cart"], ["closed", null]];
  const funnelBars = node("div", "hbar-list"); const max = Math.max(Number(funnel.totals.leads_total) || 0, 1);
  steps.forEach(([key, conversion]) => { const item = node("div"); const label = node("div", "hbar-label"); label.append(node("span", "", t[key]), node("span", "", fmt(funnel.totals[key]))); const track = node("div", "hbar-track"); const fill = node("div", "hbar-fill"); fill.style.width = `${Math.max(0, Number(funnel.totals[key]) || 0) / max * 100}%`; track.append(fill); item.append(label, track); funnelBars.append(item); if (conversion) funnelBars.append(node("p", "conversion", `${t.conversion}: ${pct(funnel.totals[conversion])}`)); });
  section.append(funnelBars);
  section.append(heading(t.funnel_channels));
  section.append(table([t.channel, t.leads_total, t.engaged, t.with_contact, t.with_cart, t.closed, t.conversion], funnel.by_channel.map((row) => [t[row.channel] || String(row.channel), fmt(row.leads_total), fmt(row.engaged), fmt(row.with_contact), fmt(row.with_cart), fmt(row.closed), `${pct(row.conv_engaged)} / ${pct(row.conv_contact)} / ${pct(row.conv_cart)}`]))); return section;
}

function renderWebEvents(web_events) {
  if (web_events.applicable === false) return null; const section = block(t.web_events); section.append(node("p", "coverage", t.web_note)); if (!web_events.by_day.length) { section.append(empty(true)); return section; }
  section.append(metrics([[t.opens, web_events.totals.opens], [t.contact_opens, web_events.totals.contact_opens], [t.cart_clicks, web_events.totals.cart_clicks]])); section.append(barChart(web_events.by_day, ["opens", "contact_opens", "cart_clicks"], t.web_chart, "day", null)); return section;
}

function renderManagers(managers) {
  const section = block(t.managers); const claim = managers.time_to_claim_seconds; const close = managers.time_to_close_seconds; const threadValues = Object.values(managers.threads);
  if (!managers.by_manager.length && threadValues.every((value) => value === 0 || value === null) && !claim.measured_on && !close.measured_on) { section.append(empty(true)); return section; }
  section.append(metrics([[t.open, managers.threads.open], [t.closed, managers.threads.closed], [t.claimed, managers.threads.claimed], [t.unclaimed, managers.threads.unclaimed], [t.claim_p50, seconds(claim.p50), text("measured_threads", { n: fmt(claim.measured_on), m: fmt(claim.of_threads) })], [t.close_p50, seconds(close.p50), text("measured_threads", { n: fmt(close.measured_on), m: fmt(close.of_threads) })]]));
  if (!managers.by_manager.length) section.append(empty()); else section.append(table([t.manager_name, t.replies, t.threads_claimed, t.claim_p50, t.last_reply], managers.by_manager.map((row) => [String(row.name ?? "—"), fmt(row.replies), fmt(row.threads_claimed), seconds(row.time_to_claim_p50_seconds), dateTime(row.last_reply_at)]))); return section;
}

function renderCost(cost) {
  if (cost === null) return null; const section = block(t.cost); section.append(node("p", "coverage", text("cost_coverage", { n: fmt(cost.coverage.with_tokens), m: fmt(cost.coverage.bot_messages) })));
  if (!cost.by_day.length) { section.append(empty(true)); return section; }
  section.append(metrics([[t.tokens_in, cost.totals.tokens_in], [t.tokens_out, cost.totals.tokens_out], [t.llm_calls, cost.totals.llm_calls], [t.calls_per_answer, cost.totals.llm_calls_per_answer, text("measured_answers", { n: fmt(cost.totals.llm_calls_measured_on) })], [t.latency_p50, cost.latency_ms.p50 === null ? null : text("milliseconds", { n: fmt(cost.latency_ms.p50) }), text("measured_on", { n: fmt(cost.latency_ms.measured_on) })], [t.latency_p95, cost.latency_ms.p95 === null ? null : text("milliseconds", { n: fmt(cost.latency_ms.p95) }), text("measured_on", { n: fmt(cost.latency_ms.measured_on) })]]));
  section.append(lineChart(cost.by_day, ["tokens_in", "tokens_out"], t.cost_chart)); section.append(heading(t.models));
  if (!cost.by_model.length) section.append(empty()); else section.append(table([t.model, t.bot_messages, t.with_tokens, t.tokens_in, t.tokens_out, t.llm_calls], cost.by_model.map((row) => [String(row.model ?? "—"), fmt(row.bot_messages), fmt(row.with_tokens), fmt(row.tokens_in), fmt(row.tokens_out), fmt(row.llm_calls)]))); return section;
}

function renderRouting(routing) {
  const section = block(t.routing); if (!routing.by_branch.length && !routing.by_route_reason.length) { section.append(empty(true)); return section; } section.append(heading(t.branches)); section.append(hBarChart(routing.by_branch, "branch", "share", t.branches, pct)); section.append(heading(t.route_reasons));
  const sorted = [...routing.by_route_reason].sort((a, b) => (Number(b.bot_messages) || 0) - (Number(a.bot_messages) || 0)); const chartHost = node("div"); const render = (showAll) => { chartHost.replaceChildren(hBarChart(showAll ? sorted : sorted.slice(0, 10), "route_reason", "bot_messages", t.route_reasons)); if (!showAll && sorted.length > 10) { const button = node("button", "show-all", t.show_all); button.type = "button"; button.addEventListener("click", () => render(true)); chartHost.append(button); } }; render(false); section.append(chartHost); return section;
}

function dataList(rows, labelKey) { if (!rows.length) return empty(); const list = node("ul", "data-list"); rows.forEach((row) => { const li = node("li"); li.append(node("span", "", String(row[labelKey] ?? "—")), node("span", "", fmt(row.leads ?? row.reports))); list.append(li); }); return list; }
function renderGeo(geo) { const section = block(t.geo); const listsEmpty = !geo.by_country.length && !geo.by_dealer.length && !geo.by_product_interest.length; const unknownEmpty = Object.values(geo.unknown).every((value) => value === 0 || value === null); if (listsEmpty && unknownEmpty) { section.append(empty(true)); return section; } const columns = node("div", "columns"); [[t.countries, geo.by_country, "country"], [t.dealers, geo.by_dealer, "dealer"], [t.interests, geo.by_product_interest, "product_interest"]].forEach(([title, rows, key]) => { const column = node("div"); column.append(heading(title), dataList(rows, key)); columns.append(column); }); section.append(columns, node("p", "footnote", text("unknown_country", { n: fmt(geo.unknown.country) })), node("p", "footnote", text("unknown_dealer", { n: fmt(geo.unknown.dealer) })), node("p", "footnote", text("unknown_interest", { n: fmt(geo.unknown.product_interest) }))); return section; }

function renderQuality(quality) { const section = block(t.quality); if (quality.total === 0 && !quality.by_status.length && !quality.by_category.length && !quality.by_severity.length) { section.append(empty(true)); return section; } section.append(metrics([[t.reports_total, quality.total], [t.reports_open, quality.open_count]])); const columns = node("div", "columns"); [[t.statuses, quality.by_status, "status"], [t.categories, quality.by_category, "category"], [t.severities, quality.by_severity, "severity"]].forEach(([title, rows, key]) => { const column = node("div"); column.append(heading(title), dataList(rows, key)); columns.append(column); }); section.append(columns); return section; }

function renderVersions(versions) { const section = block(t.versions); if (!versions.length) { section.append(empty(true)); return section; } section.append(table([t.prompt_version, t.bot_messages, t.dialogs, t.latency_p50, t.latency_p95, t.calls_per_answer, t.main_share, t.with_tokens], versions.map((row) => [String(row.prompt_version ?? "—"), fmt(row.bot_messages), fmt(row.dialogs), fmt(row.latency_p50), fmt(row.latency_p95), fmt(row.llm_calls_per_answer), pct(row.main_share), fmt(row.with_tokens)]), (index) => versions[index].low_sample === true)); section.append(node("p", "footnote", t.low_sample_note)); return section; }

function renderDashboard(data) {
  const blocks = [renderVolume(data.volume), renderFunnel(data.funnel), renderWebEvents(data.web_events), renderManagers(data.managers), renderCost(data.cost), renderRouting(data.routing), renderGeo(data.geo), renderQuality(data.quality), renderVersions(data.versions)].filter(Boolean);
  elements.dashboard.replaceChildren(...blocks); elements.dashboard.hidden = false;
}

function renderSkeletons() { elements.dashboard.replaceChildren(...Array.from({ length: 9 }, () => node("section", "dashboard-block skeleton"))); elements.dashboard.hidden = false; }
function applyTheme() { const theme = (webApp && webApp.themeParams) || {}; const variables = { "--tg-bg": theme.bg_color, "--tg-text": theme.text_color, "--tg-hint": theme.hint_color, "--tg-link": theme.link_color, "--tg-button": theme.button_color, "--tg-button-text": theme.button_text_color, "--tg-secondary-bg": theme.secondary_bg_color }; Object.entries(variables).forEach(([name, value]) => { if (value) document.documentElement.style.setProperty(name, value); }); }
function renderError(key, canRetry) { elements.feedback.hidden = false; elements.message.textContent = t[key] || t.internal; elements.retry.textContent = t.retry; elements.retry.hidden = !canRetry; elements.dashboard.hidden = true; }
function clearError() { elements.feedback.hidden = true; elements.retry.hidden = true; }

async function request(path) {
  const response = await fetch(API + path, { headers: { "X-Tg-Init-Data": webApp.initData }, signal: path.startsWith("/stats") && statsController ? statsController.signal : undefined }); const body = await response.json().catch(() => ({}));
  if (response.status === RESPONSE_STATUS.success) return body; const error = String(body.error || "internal"); const known = Object.prototype.hasOwnProperty.call(t, error) ? error : "internal"; const canRetry = response.status >= RESPONSE_STATUS.internal || response.status === RESPONSE_STATUS.rate_limited; const failure = new Error(known); failure.key = known; failure.canRetry = canRetry; throw failure;
}

function moscowToday() { const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Moscow", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date()); const values = Object.fromEntries(parts.map((part) => [part.type, part.value])); return `${values.year}-${values.month}-${values.day}`; }
function addDays(dateText, delta) { const [year, month, day] = dateText.split("-").map(Number); const date = new Date(Date.UTC(year, month - 1, day + delta)); return date.toISOString().slice(0, 10); }
function presetDates(days) { const to = moscowToday(); return { from: addDays(to, -(days - 1)), to }; }
function validDates(from, to) { if (!from || !to || from > to) return false; const start = Date.parse(`${from}T00:00:00Z`); const end = Date.parse(`${to}T00:00:00Z`); return Number.isFinite(start) && Number.isFinite(end) && (end - start) / 86400000 <= 365; }
function statsParams() { const params = new URLSearchParams(); const dates = currentPreset === "custom" ? { from: elements.dateFrom.value, to: elements.dateTo.value } : presetDates(currentPreset); params.set("from", dates.from); params.set("to", dates.to); params.set("channel", elements.channel.value); if (elements.manager.value) params.set("manager", elements.manager.value); return params; }

function updateManagers(names) { const selected = elements.manager.value; elements.manager.replaceChildren(); const all = node("option", "", t.all); all.value = ""; elements.manager.append(all); names.forEach((name) => { const option = node("option", "", String(name)); option.value = String(name); elements.manager.append(option); }); elements.manager.value = names.includes(selected) ? selected : ""; elements.managerWrap.hidden = names.length === 0; }

async function loadStats() {
  const dates = currentPreset === "custom" ? { from: elements.dateFrom.value, to: elements.dateTo.value } : presetDates(currentPreset); if (!validDates(dates.from, dates.to)) { elements.filterError.textContent = t.invalid_period; elements.filterError.hidden = false; return; }
  elements.filterError.hidden = true; clearError(); renderSkeletons(); if (statsController) statsController.abort(); statsController = new AbortController();
  try { const data = await request(`/stats?${statsParams().toString()}`); updateManagers(data.managers.known_managers); renderDashboard(data); } catch (error) { if (error.name !== "AbortError") renderError(error.key || "internal", error.canRetry !== false); }
}

function setupFilters() {
  elements.periodLabel.textContent = t.period; elements.fromLabel.textContent = t.from; elements.toLabel.textContent = t.to; elements.channelLabel.textContent = t.channel; elements.managerLabel.textContent = t.manager_filter;
  [[7, "days_7"], [30, "days_30"], [90, "days_90"], ["custom", "custom"]].forEach(([value, key]) => { const button = node("button", "chip", t[key]); button.type = "button"; button.dataset.period = String(value); button.setAttribute("aria-pressed", value === 30 ? "true" : "false"); button.addEventListener("click", () => { currentPreset = value; [...elements.chips.children].forEach((chip) => chip.setAttribute("aria-pressed", chip === button ? "true" : "false")); elements.customDates.hidden = value !== "custom"; if (value === "custom") { const dates = presetDates(30); if (!elements.dateFrom.value) elements.dateFrom.value = dates.from; if (!elements.dateTo.value) elements.dateTo.value = dates.to; } loadStats(); }); elements.chips.append(button); });
  [["all", "all"], ["telegram", "telegram"], ["whatsapp", "whatsapp"], ["web", "web"], ["email", "email"]].forEach(([value, key]) => { const option = node("option", "", t[key]); option.value = value; elements.channel.append(option); }); updateManagers([]);
  elements.channel.addEventListener("change", loadStats); elements.manager.addEventListener("change", loadStats); elements.dateFrom.addEventListener("change", loadStats); elements.dateTo.addEventListener("change", loadStats); elements.filters.addEventListener("submit", (event) => event.preventDefault()); elements.filters.hidden = false;
}

async function loadProfile() {
  elements.title.textContent = t.app_title; elements.name.textContent = t.loading; elements.role.textContent = ""; elements.count.textContent = "—"; elements.metricLabel.textContent = t.today_dialogs; clearError();
  if (!webApp || !webApp.initData) { elements.profile.hidden = true; renderError("not_telegram", false); return; }
  try { const profile = await request("/me"); elements.profile.hidden = false; elements.name.textContent = String(profile.name || ""); elements.role.textContent = t[profile.role] || t.unknown_role; elements.count.textContent = fmt(profile.today_dialogs); setupFilters(); await loadStats(); } catch (error) { elements.profile.hidden = true; renderError(error.key || "internal", error.canRetry !== false); }
}

elements.retry.addEventListener("click", () => { if (elements.filters.hidden) loadProfile(); else loadStats(); });
document.title = t.app_title; applyTheme();
if (webApp) { webApp.ready(); webApp.expand(); webApp.onEvent("themeChanged", applyTheme); }
loadProfile();
