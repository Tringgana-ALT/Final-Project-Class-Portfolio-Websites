import {
  classMeta,
  leadership,
  galleryItems,
  scheduleDays
} from './data/classProfile.js';

function sanitizeHref(href) {
  if (typeof href !== 'string') return '#';
  const trimmed = href.trim();
  if (
    trimmed.startsWith('#') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:')
  ) {
    return trimmed;
  }
  return '#';
}

function sanitizeSrc(src) {
  if (typeof src !== 'string') return '';
  const trimmed = src.trim();
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://')
  ) {
    return trimmed;
  }
  return '';
}

function createIcon(iconClass, extraClasses = '') {
  const icon = document.createElement('i');
  icon.className = `${iconClass || 'ph ph-sparkle'} ${extraClasses}`.trim();
  icon.setAttribute('aria-hidden', 'true');
  return icon;
}

function renderStatusBanner(element, text) {
  if (!element || typeof text !== 'string') return;
  element.replaceChildren();
  const colonIndex = text.indexOf(':');
  if (colonIndex > 0 && colonIndex < 40) {
    const label = document.createElement('strong');
    label.textContent = text.slice(0, colonIndex + 1);
    const rest = document.createTextNode(text.slice(colonIndex + 1));
    element.append(label, rest);
  } else {
    element.textContent = text;
  }
}

function renderHeroSection() {
  if (!classMeta) return;

  renderStatusBanner(document.getElementById('heroStatusBanner'), classMeta.statusBanner);

  const statusReadyEl = document.getElementById('heroStatusReady');
  if (statusReadyEl && classMeta.statusReady) {
    statusReadyEl.textContent = classMeta.statusReady;
  }

  const badgeEl = document.getElementById('heroBadgeText');
  if (badgeEl && classMeta.badge) {
    badgeEl.textContent = classMeta.badge;
  }

  const titlePrefixEl = document.getElementById('heroTitlePrefix');
  if (titlePrefixEl && classMeta.titlePrefix) {
    titlePrefixEl.textContent = classMeta.titlePrefix;
  }

  const titleHighlightEl = document.getElementById('heroTitleHighlight');
  if (titleHighlightEl && classMeta.titleHighlight) {
    titleHighlightEl.textContent = classMeta.titleHighlight;
  }

  const subtitleEl = document.getElementById('heroSubtitle');
  if (subtitleEl && classMeta.subtitle) {
    subtitleEl.textContent = classMeta.subtitle;
  }

  const terminalAdvisorEl = document.getElementById('terminalAdvisorName');
  if (terminalAdvisorEl) {
    terminalAdvisorEl.textContent = classMeta.homeroomTeacher || leadership?.advisor?.name || 'Nama Wali Kelas';
  }

  const valuesGrid = document.getElementById('heroValuesGrid');
  if (valuesGrid && Array.isArray(classMeta.values)) {
    const valueCards = classMeta.values.map(item => {
      const card = document.createElement('div');
      card.className = 'p-2.5 rounded-xl bg-slate-50 dark:bg-ocean-900/40 border border-slate-200/50 dark:border-ocean-800/40';
      const label = document.createElement('span');
      label.className = 'font-bold text-ocean-600 dark:text-ocean-400';
      label.textContent = `${item.label}: `;
      const body = document.createTextNode(item.text || '');
      card.append(label, body);
      return card;
    });
    valuesGrid.replaceChildren(...valueCards);
  }

  const statsGrid = document.getElementById('heroStatsGrid');
  if (statsGrid) {
    const stats = [
      {
        value: String(classMeta.studentCount ?? 36),
        label: 'Siswa Kelas',
        valueClass: 'text-2xl font-extrabold text-slate-900 dark:text-white'
      },
      {
        value: String(classMeta.productiveSubjectsCount ?? 4),
        label: 'Mapel Produktif',
        valueClass: 'text-2xl font-extrabold text-ocean-600 dark:text-ocean-400'
      },
      {
        value: classMeta.academicYear || '2026/2027',
        label: 'Tahun Ajaran',
        valueClass: 'text-lg sm:text-xl font-extrabold text-amber-500'
      }
    ];

    const statCards = stats.map(stat => {
      const card = document.createElement('div');
      card.className = 'p-3 rounded-xl glass-card text-center transition hover:-translate-y-0.5 duration-200 flex flex-col justify-center';
      const valueEl = document.createElement('div');
      valueEl.className = stat.valueClass;
      valueEl.textContent = stat.value;
      const labelEl = document.createElement('div');
      labelEl.className = 'text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5';
      labelEl.textContent = stat.label;
      card.append(valueEl, labelEl);
      return card;
    });

    statsGrid.replaceChildren(...statCards);
  }
}

function renderAdvisorCard(container, advisor) {
  if (!container || !advisor) return;

  container.replaceChildren(createOrganizationNode(
    advisor.role || advisor.badge || 'Wali Kelas',
    advisor.name,
  ));
}

function createOrganizationNode(role, name) {
  const node = document.createElement('div');
  node.className = 'org-chart__node';

  const roleEl = document.createElement('span');
  roleEl.className = 'org-chart__role';
  roleEl.textContent = role;

  const nameEl = document.createElement('span');
  nameEl.className = 'org-chart__name';
  nameEl.textContent = name;

  node.append(roleEl, nameEl);
  return node;
}

function renderCoreLeadership(container, coreItems) {
  if (!container || !Array.isArray(coreItems)) return;

  const tiers = [...new Set(coreItems.map(item => item.tier || 1))].sort((a, b) => a - b);
  const content = [];

  tiers.forEach((tier, index) => {
    if (index > 0) {
      const connector = document.createElement('div');
      connector.className = 'org-chart__connector';
      connector.setAttribute('aria-hidden', 'true');
      content.push(connector);
    }

    const row = document.createElement('div');
    row.className = 'org-chart__tier';
    coreItems
      .filter(item => (item.tier || 1) === tier)
      .forEach(item => row.appendChild(createOrganizationNode(item.role, item.name)));
    content.push(row);
  });

  container.replaceChildren(...content);
}

function renderCoordinators(container, coordinatorItems) {
  if (!container || !Array.isArray(coordinatorItems)) return;

  const tier = document.createElement('div');
  tier.className = 'org-chart__tier';
  coordinatorItems.forEach(item => {
    tier.appendChild(createOrganizationNode(item.role, item.name));
  });

  container.replaceChildren(tier);
}

function renderLeadershipSection() {
  if (!leadership) return;
  renderAdvisorCard(document.getElementById('strukturAdvisorContainer'), leadership.advisor);
  renderCoreLeadership(document.getElementById('strukturCoreGrid'), leadership.core);
  renderCoordinators(document.getElementById('strukturCoordinatorGrid'), leadership.coordinators);
}

function renderGallerySection() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid || !Array.isArray(galleryItems)) return;

  const cards = galleryItems.map(item => {
    const card = document.createElement('article');
    card.className = 'gallery-item group relative rounded-2xl overflow-hidden glass-card cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300';
    card.dataset.category = item.category || 'all';
    card.dataset.title = item.title || '';
    card.dataset.description = item.description || '';
    card.dataset.tag = item.categoryLabel || 'ILUSTRASI KEGIATAN';
    const imageSrc = sanitizeSrc(item.image);
    card.dataset.image = imageSrc;
    card.dataset.alt = item.alt || item.title || 'Dokumentasi kegiatan kelas';
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.setAttribute('aria-label', `Lihat detail ${item.title}`);

    const visualBox = document.createElement('div');
    visualBox.className = `h-52 bg-gradient-to-tr ${item.gradientClass || 'from-ocean-950 via-ocean-900 to-ocean-700'} flex flex-col items-center justify-center p-5 text-center text-white relative overflow-hidden`;

    if (imageSrc) {
      const img = document.createElement('img');
      img.className = 'absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110';
      img.src = imageSrc;
      img.alt = item.alt || item.title || 'Ilustrasi kegiatan kelas';
      img.loading = 'lazy';
      visualBox.appendChild(img);
    }

    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20';

    const icon = createIcon(item.iconClass || 'ph ph-camera', 'relative z-10 text-4xl mb-2');

    const tag = document.createElement('span');
    tag.className = `relative z-10 text-[10px] font-mono px-2 py-0.5 rounded border mb-1 ${item.tagClass || 'bg-ocean-800/90 text-ocean-200 border-ocean-600/50'}`;
    tag.textContent = item.categoryLabel || 'KEGIATAN KELAS';

    const title = document.createElement('h4');
    title.className = 'relative z-10 text-base font-bold';
    title.textContent = item.title;

    const subtitle = document.createElement('p');
    subtitle.className = 'relative z-10 text-xs text-ocean-100 mt-1';
    subtitle.textContent = item.subtitle;

    visualBox.append(overlay, icon, tag, title, subtitle);

    const footer = document.createElement('div');
    footer.className = 'p-3.5 bg-white/90 dark:bg-ocean-900/90 flex items-center justify-between border-t border-slate-100 dark:border-ocean-800';

    const footerMeta = document.createElement('div');
    const footerLabel = document.createElement('span');
    footerLabel.className = `text-[10px] font-bold uppercase tracking-wider ${item.labelClass || 'text-ocean-600 dark:text-ocean-400'}`;
    footerLabel.textContent = 'Ilustrasi Kegiatan';

    const footerCaption = document.createElement('p');
    footerCaption.className = 'text-xs font-semibold text-slate-700 dark:text-slate-200';
    footerCaption.textContent = item.subtitle || item.title;

    footerMeta.append(footerLabel, footerCaption);

    const classBadge = document.createElement('span');
    classBadge.className = 'text-[11px] text-slate-400 font-mono';
    classBadge.textContent = '10 RPL';

    footer.append(footerMeta, classBadge);
    card.append(visualBox, footer);
    return card;
  });

  galleryGrid.replaceChildren(...cards);
}

function createScheduleSubjectItem(subject) {
  const item = document.createElement('li');
  item.className = `schedule-row${subject.isCleaning ? ' schedule-row--activity' : ''}`;

  const info = document.createElement('div');
  info.className = 'schedule-row__info';
  const name = document.createElement('span');
  name.className = 'schedule-row__name';
  name.textContent = subject.name;

  info.appendChild(name);
  const details = [subject.teacher, subject.note].filter(Boolean);
  if (details.length > 0) {
    const detail = document.createElement('span');
    detail.className = 'schedule-row__detail';
    detail.textContent = details.join(' · ');
    info.appendChild(detail);
  }

  const time = document.createElement('span');
  time.className = 'schedule-row__time';
  time.textContent = subject.time;

  item.append(info, time);
  return item;
}

function renderScheduleSection() {
  const scheduleContainer = document.getElementById('scheduleContainer');
  if (!scheduleContainer || !Array.isArray(scheduleDays)) return;

  const cards = scheduleDays.map(day => {
    const card = document.createElement('article');
    card.className = 'day-card schedule-day-card';
    card.dataset.day = day.dayKey;

    const header = document.createElement('div');
    header.className = 'schedule-day-card__header';

    const dayTitle = document.createElement('h3');
    dayTitle.className = 'schedule-day-card__title';
    dayTitle.textContent = day.dayName;

    const hours = document.createElement('span');
    hours.className = 'schedule-day-card__hours';
    hours.textContent = day.hoursLabel;

    header.append(dayTitle, hours);

    const list = document.createElement('ul');
    list.className = 'schedule-table';
    if (Array.isArray(day.subjects)) {
      day.subjects.forEach(subject => {
        list.appendChild(createScheduleSubjectItem(subject));
      });
    }

    card.append(header, list);
    return card;
  });

  scheduleContainer.replaceChildren(...cards);
}

function renderFooterSocials() {
  const container = document.getElementById('footerSocialLinks');
  if (!container || !Array.isArray(classMeta?.socials)) return;

  const links = classMeta.socials.map(social => {
    const anchor = document.createElement('a');
    const safeHref = sanitizeHref(social.href);
    anchor.href = safeHref;
    anchor.title = social.title || social.label;
    anchor.setAttribute('aria-label', social.label);
    if (safeHref.startsWith('http://') || safeHref.startsWith('https://')) {
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }
    anchor.className = `w-9 h-9 rounded-xl bg-slate-100 dark:bg-ocean-900 text-slate-600 dark:text-ocean-300 hover:text-white ${social.hoverClass || 'hover:bg-ocean-700'} flex items-center justify-center text-lg transition shadow-sm`;
    anchor.appendChild(createIcon(social.iconClass || 'ph ph-link'));
    return anchor;
  });

  container.replaceChildren(...links);
}

export function renderLandingContent() {
  renderHeroSection();
  renderLeadershipSection();
  renderGallerySection();
  renderScheduleSection();
  renderFooterSocials();
}
