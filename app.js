'use strict';
const data = window.CLUB_DATA;
const $ = id => document.getElementById(id);
const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const currentYear = Number(today.slice(0, 4));
const currentMonth = today.slice(0, 7);
function element(tag, text, className) { const el = document.createElement(tag); if (text !== undefined) el.textContent = text; if (className) el.className = className; return el; }
function empty(container, title, description, label) { const box = element('div', undefined, 'empty'); if (label) box.append(element('span', label, 'empty-label')); box.append(element('strong', title), element('p', description)); container.append(box); }
function safeImage(path) { return typeof path === 'string' && /^assets\/[a-zA-Z0-9_./-]+$/.test(path) && !path.includes('..') ? path : ''; }
function recordCard(record, category) {
  const button = element('button', undefined, 'record-card'); button.type = 'button';
  const path = safeImage(record.image); if (path) { const img = element('img'); img.src = path; img.alt = record.title; img.loading = 'lazy'; button.append(img); }
  button.append(element('span', record.category || category, 'tag'), element('h3', record.title), element('p', [record.date, record.location].filter(Boolean).join(' · ')));
  if (record.summary) button.append(element('p', record.summary));
  button.addEventListener('click', () => { $('dialog-category').textContent = record.category || category; $('dialog-title').textContent = record.title; $('dialog-meta').textContent = [record.date, record.location].filter(Boolean).join(' · '); $('dialog-body').textContent = record.description || record.summary || '추가 안내가 없습니다.'; $('detail-dialog').showModal(); });
  return button;
}
$('month-label').textContent = `${currentYear}년 ${Number(today.slice(5, 7))}월`;
$('copyright-year').textContent = currentYear;
const monthly = data.activities.filter(item => typeof item.date === 'string' && item.date.startsWith(currentMonth)).sort((a, b) => a.date.localeCompare(b.date));
if (monthly.length) monthly.forEach(item => $('monthly-list').append(recordCard(item, '이달의 봉사')));
else empty($('monthly-list'), '이달의 봉사 일정은 등록 준비 중입니다.', '일정이 확정되면 날짜와 장소, 참여 안내를 이곳에서 만나실 수 있습니다.', '함께할 다음 순간을 기다립니다.');
$('member-count').textContent = data.members.length ? `${data.members.length}명의 회원` : '회원 소개 자료 준비 중';
if (!data.members.length) empty($('member-list'), '함께하는 회원을 곧 소개합니다.', '회원 소개와 임원진 정보는 확인된 자료를 바탕으로 안내합니다.');
data.members.forEach(member => { const card = element('article', undefined, 'member-card'); const path = safeImage(member.image); let avatar; if (path) { avatar = element('img', undefined, 'avatar'); avatar.src = path; avatar.alt = `${member.name} 회원`; avatar.loading = 'lazy'; } else avatar = element('span', member.name.slice(0, 1), 'avatar'); const info = element('div'); info.append(element('h3', member.name), element('p', member.role || '회원')); if (member.introduction) info.append(element('p', member.introduction)); card.append(avatar, info); $('member-list').append(card); });
if (!data.history.length) empty($('history-list'), '창립의 이야기를 준비하고 있습니다.', '창립일, 초대 회장, 주요 연혁을 확인하여 소개할 예정입니다.', '부산한일라이온스의 시작');
data.history.forEach(item => { const row = element('article', undefined, 'timeline-item'); row.append(element('strong', item.year), element('h3', item.title), element('p', item.description)); $('history-list').append(row); });
const years = [...new Set([currentYear, ...data.activities.map(item => Number(item.date?.slice(0, 4))).filter(Number.isFinite), currentYear - 1, currentYear - 2])].sort((a, b) => b - a);
years.forEach(year => { const option = element('option', `${year}년`); option.value = year; $('year-select').append(option); });
function renderActivities() { const container = $('activity-list'); container.replaceChildren(); const year = $('year-select').value; const records = data.activities.filter(item => item.date?.startsWith(`${year}-`)).sort((a, b) => b.date.localeCompare(a.date)); if (!records.length) empty(container, `${year}년 봉사활동 기록을 준비 중입니다.`, '확인된 활동 기록과 사진을 차례로 소개합니다.'); records.forEach(item => container.append(recordCard(item, '봉사활동'))); }
$('year-select').addEventListener('change', renderActivities); renderActivities();
if (!data.news.length) empty($('news-list'), '등록된 회원 경조사 소식이 없습니다.', '회원에게 전할 기쁨과 위로의 소식을 안내합니다.');
[...data.news].sort((a, b) => b.date.localeCompare(a.date)).forEach(item => $('news-list').append(recordCard(item, '회원 경조사')));
const menu = document.querySelector('.menu-toggle'); menu.addEventListener('click', () => { const expanded = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', expanded); $('nav').classList.toggle('open', expanded); });
$('nav').querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); $('nav').classList.remove('open'); }));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { menu.setAttribute('aria-expanded', 'false'); $('nav').classList.remove('open'); } });
document.querySelector('.dialog-close').addEventListener('click', () => $('detail-dialog').close());
$('detail-dialog').addEventListener('click', event => { if (event.target === $('detail-dialog')) { const rect = event.target.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close(); } });
function weatherLabel(code) { if (code === 0) return ['☀', '맑음']; if (code <= 3) return ['☁', '구름 많음']; if (code <= 48) return ['☁', '안개']; if (code >= 95) return ['⛈', '뇌우']; if ((code >= 71 && code <= 77) || code === 85 || code === 86) return ['❄', '눈']; return ['☂', '비']; }
async function loadWeather() {
  const button = $('weather-refresh'); button.disabled = true; $('weather-description').textContent = '날씨를 불러오는 중입니다.';
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.1796&longitude=129.0756&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=Asia%2FSeoul&forecast_days=1', { signal: controller.signal });
    if (!response.ok) throw new Error('Weather response failed'); const result = await response.json(); const current = result.current;
    if (!current || !Number.isFinite(current.temperature_2m) || !Number.isFinite(current.weather_code)) throw new Error('Weather data missing');
    const [symbol, label] = weatherLabel(current.weather_code); $('temperature').textContent = `${Math.round(current.temperature_2m)}°C`; $('weather-symbol').textContent = symbol; $('weather-description').textContent = label;
    $('weather-detail').textContent = `습도 ${current.relative_humidity_2m}% · 바람 ${current.wind_speed_10m}m/s`;
    $('weather-time').textContent = `모델 기준 ${current.time.replace('T', ' ')} (한국시간)`;
  } catch { $('temperature').textContent = '—'; $('weather-description').textContent = '날씨 정보를 가져오지 못했습니다.'; $('weather-detail').textContent = '인터넷 연결 확인 후 새로고침하세요.'; $('weather-time').textContent = ''; }
  finally { clearTimeout(timeout); button.disabled = false; }
}
$('weather-refresh').addEventListener('click', loadWeather); loadWeather();
