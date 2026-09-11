"use strict";

const API = "https://plcjkuhxtodofyjnusjf.supabase.co/functions/v1/admin";
const RESPONSE_STATUS = {
  success: 200,
  unauthorized: 401,
  forbidden: 403,
  rate_limited: 429,
  internal: 500,
  upstream_unavailable: 503,
};

const strings = {
  ru: {
    app_title: "Панель GAUDI",
    success: "Панель загружена",
    loading: "Загружаю…",
    today_dialogs: "Диалогов сегодня",
    owner: "Владелец",
    manager: "Менеджер",
    unknown_role: "Сотрудник",
    not_telegram: "Откройте панель из Telegram",
    unauthorized: "Не удалось подтвердить вход. Откройте панель заново из Telegram.",
    forbidden: "Нет доступа. Панель только для сотрудников GAUDI.",
    origin_denied: "Нет доступа. Панель только для сотрудников GAUDI.",
    rate_limited: "Слишком много запросов. Подождите минуту.",
    upstream_unavailable: "Сервис временно недоступен, попробуйте ещё раз.",
    internal: "На нашей стороне что-то пошло не так.",
    retry: "Повторить",
  },
  en: {
    app_title: "GAUDI panel",
    success: "Panel loaded",
    loading: "Loading…",
    today_dialogs: "Dialogs today",
    owner: "Owner",
    manager: "Manager",
    unknown_role: "Team member",
    not_telegram: "Open the panel from Telegram",
    unauthorized: "We could not confirm your sign-in. Open the panel again from Telegram.",
    forbidden: "Access denied. This panel is for GAUDI staff only.",
    origin_denied: "Access denied. This panel is for GAUDI staff only.",
    rate_limited: "Too many requests. Please wait a minute.",
    upstream_unavailable: "The service is temporarily unavailable. Please try again.",
    internal: "Something went wrong on our side.",
    retry: "Retry",
  },
};

const webApp = window.Telegram && window.Telegram.WebApp;
const languageCode = webApp && webApp.initDataUnsafe && webApp.initDataUnsafe.user
  ? webApp.initDataUnsafe.user.language_code : "";
const locale = String(languageCode || "").toLowerCase().startsWith("ru") ? "ru" : "en";
const t = strings[locale];
document.title = t.app_title;
const elements = {
  profile: document.getElementById("profile"), metric: document.getElementById("metric"),
  title: document.getElementById("app-title"), name: document.getElementById("user-name"),
  role: document.getElementById("user-role"), count: document.getElementById("dialog-count"),
  metricLabel: document.getElementById("metric-label"), feedback: document.getElementById("feedback"),
  message: document.getElementById("message"), retry: document.getElementById("retry"),
};

function applyTheme() {
  const theme = (webApp && webApp.themeParams) || {};
  const variables = {
    "--tg-bg": theme.bg_color, "--tg-text": theme.text_color, "--tg-hint": theme.hint_color,
    "--tg-link": theme.link_color, "--tg-button": theme.button_color,
    "--tg-button-text": theme.button_text_color, "--tg-secondary-bg": theme.secondary_bg_color,
  };
  Object.entries(variables).forEach(([name, value]) => {
    if (value) document.documentElement.style.setProperty(name, value);
  });
}

function renderLoading() {
  elements.profile.hidden = false;
  elements.metric.hidden = false;
  elements.title.textContent = t.app_title;
  elements.name.textContent = t.loading;
  elements.role.textContent = "";
  elements.count.textContent = "—";
  elements.metricLabel.textContent = t.today_dialogs;
  elements.feedback.hidden = true;
  elements.retry.hidden = true;
}

function renderError(key, canRetry) {
  elements.profile.hidden = true;
  elements.metric.hidden = true;
  elements.feedback.hidden = false;
  elements.message.textContent = t[key];
  elements.retry.textContent = t.retry;
  elements.retry.hidden = !canRetry;
}

function renderProfile(profile) {
  elements.profile.hidden = false;
  elements.metric.hidden = false;
  elements.title.textContent = t.app_title;
  elements.name.textContent = String(profile.name || "");
  elements.role.textContent = t[profile.role] || t.unknown_role;
  elements.count.textContent = profile.today_dialogs === null ? "—" : String(profile.today_dialogs);
  elements.metricLabel.textContent = t.today_dialogs;
  elements.feedback.hidden = true;
}

async function loadProfile() {
  renderLoading();
  if (!webApp || !webApp.initData) {
    renderError("not_telegram", false);
    return;
  }
  try {
    const response = await fetch(API + "/me", { headers: { "X-Tg-Init-Data": webApp.initData } });
    const body = await response.json().catch(() => ({}));
    if (response.status === RESPONSE_STATUS.success) {
      renderProfile(body);
      return;
    }
    const error = body.error;
    if (response.status === RESPONSE_STATUS.unauthorized && error === "unauthorized") {
      renderError("unauthorized", false);
    } else if (response.status === RESPONSE_STATUS.forbidden && (error === "forbidden" || error === "origin_denied")) {
      renderError(error, false);
    } else if (response.status === RESPONSE_STATUS.rate_limited && error === "rate_limited") {
      renderError("rate_limited", false);
    } else if (response.status === RESPONSE_STATUS.upstream_unavailable && error === "upstream_unavailable") {
      renderError("upstream_unavailable", true);
    } else if (response.status === RESPONSE_STATUS.internal) {
      renderError("internal", true);
    } else {
      renderError("internal", true);
    }
  } catch {
    renderError("internal", true);
  }
}

elements.retry.addEventListener("click", loadProfile);
applyTheme();
if (webApp) {
  webApp.ready();
  webApp.expand();
  webApp.onEvent("themeChanged", applyTheme);
}
loadProfile();
