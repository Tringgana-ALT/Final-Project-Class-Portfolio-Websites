import {
  classMeta,
  leadership,
  galleryItems,
  scheduleDays
} from './data/classProfile.js';

const NOTE_BOX_TONES = {
  amber: 'text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/70',
  ocean: 'text-ocean-700 dark:text-ocean-300 bg-ocean-100/70 dark:bg-ocean-800/70',
  teal: 'text-teal-700 dark:text-teal-300 bg-teal-100/70 dark:bg-teal-950/70',
  purple: 'text-purple-700 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-950/70',
  rose: 'text-rose-700 dark:text-rose-300 bg-rose-100/70 dark:bg-rose-950/70',
  emerald: 'text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/70'
};

const INLINE_NOTE_TONES = {
  rose: 'text-rose-500 italic',
  amber: 'text-amber-600 dark:text-amber-400 font-semibold',
  'amber-inline': 'text-amber-600 dark:text-amber-400 font-semibold',
  ocean: 'text-ocean-600 dark:text-ocean-400 font-medium',
  emerald: 'text-emerald-600 dark:text-emerald-400 font-medium'
};

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

  const card = document.createElement('div');
  card.className = 'p-5 rounded-2xl glass-card border-2 border-ocean-400/40 dark:border-ocean-500/30 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group';

  const badge = document.createElement('div');
  badge.className = 'absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-ocean-600 to-ocean-500 text-white text-[10px] font-bold tracking-wider uppercase shadow-md whitespace-nowrap';
  badge.textContent = advisor.badge || 'Wali Kelas';

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'relative w-20 h-20 mx-auto mb-3 mt-1';

  const avatarRing = document.createElement('div');
  avatarRing.className = 'w-full h-full rounded-2xl bg-gradient-to-tr from-ocean-600 to-ocean-300 p-1 shadow-md';

  const avatarInner = document.createElement('div');
  avatarInner.className = 'w-full h-full rounded-[14px] bg-slate-200 dark:bg-ocean-900 flex items-center justify-center text-ocean-600 dark:text-ocean-300 font-bold text-3xl';
  avatarInner.appendChild(createIcon('ph ph-chalkboard-teacher'));
  avatarRing.appendChild(avatarInner);

  const activeBadge = document.createElement('span');
  activeBadge.className = 'absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-ocean-900 flex items-center justify-center text-white text-[10px]';
  activeBadge.title = 'Aktif Mengajar';
  activeBadge.appendChild(createIcon('ph ph-check'));

  avatarWrapper.append(avatarRing, activeBadge);

  const nameEl = document.createElement('h3');
  nameEl.className = 'text-base sm:text-lg font-extrabold text-slate-900 dark:text-white';
  nameEl.textContent = advisor.name;

  const roleEl = document.createElement('p');
  roleEl.className = 'text-xs font-semibold text-ocean-600 dark:text-ocean-400 uppercase tracking-wider mt-0.5';
  roleEl.textContent = advisor.role;

  const bioEl = document.createElement('div');
  bioEl.className = 'mt-2.5 p-2 rounded-xl bg-ocean-50 dark:bg-ocean-900/50 text-xs text-slate-600 dark:text-slate-300 border border-ocean-100 dark:border-ocean-800';
  bioEl.textContent = advisor.bio;

  card.append(badge, avatarWrapper, nameEl, roleEl, bioEl);
  container.replaceChildren(card);
}

function renderCoreLeadership(container, coreItems) {
  if (!container || !Array.isArray(coreItems)) return;

  const cards = coreItems.map(item => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-2xl glass-card transition-all duration-200 hover:-translate-y-1 hover:border-ocean-400 shadow-sm text-center';

    const iconBox = document.createElement('div');
    iconBox.className = `w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-2.5 ${item.iconBoxClass || 'bg-ocean-100 dark:bg-ocean-900/90 text-ocean-600 dark:text-ocean-300'}`;
    iconBox.appendChild(createIcon(item.iconClass || 'ph ph-user'));

    const roleBadge = document.createElement('span');
    roleBadge.className = `px-2 py-0.5 rounded-full text-[10px] font-bold inline-block mb-1.5 ${item.badgeClass || 'bg-ocean-100 text-ocean-800 dark:bg-ocean-900 dark:text-ocean-300'}`;
    roleBadge.textContent = item.role;

    const nameEl = document.createElement('h4');
    nameEl.className = 'text-sm font-bold text-slate-900 dark:text-white';
    nameEl.textContent = item.name;

    const descEl = document.createElement('p');
    descEl.className = 'text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug';
    descEl.textContent = item.description;

    card.append(iconBox, roleBadge, nameEl, descEl);
    return card;
  });

  container.replaceChildren(...cards);
}

function renderCoordinators(container, coordinatorItems) {
  if (!container || !Array.isArray(coordinatorItems)) return;

  const cards = coordinatorItems.map(item => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-2xl glass-card flex items-start gap-3.5 hover:border-ocean-400 transition';

    const iconBox = document.createElement('div');
    iconBox.className = `w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5 ${item.iconBoxClass || 'bg-ocean-100 dark:bg-ocean-950/70 text-ocean-600 dark:text-ocean-400'}`;
    iconBox.appendChild(createIcon(item.iconClass || 'ph ph-star'));

    const textWrap = document.createElement('div');
    const roleEl = document.createElement('span');
    roleEl.className = `text-[10px] font-bold uppercase tracking-wider ${item.roleClass || 'text-ocean-600 dark:text-ocean-400'}`;
    roleEl.textContent = item.role;

    const nameEl = document.createElement('h5');
    nameEl.className = 'text-xs sm:text-sm font-bold text-slate-900 dark:text-white';
    nameEl.textContent = item.name;

    const descEl = document.createElement('p');
    descEl.className = 'text-xs text-slate-500 dark:text-slate-400 mt-0.5';
    descEl.textContent = item.description;

    textWrap.append(roleEl, nameEl, descEl);
    card.append(iconBox, textWrap);
    return card;
  });

  container.replaceChildren(...cards);
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

  if (subject.isProductive) {
    item.className = 'p-3 rounded-xl bg-ocean-50/90 dark:bg-ocean-900/80 border-2 border-ocean-400/60 dark:border-ocean-500/60 relative overflow-hidden';

    const topRow = document.createElement('div');
    topRow.className = 'flex items-center justify-between gap-1 mb-1';

    const badge = document.createElement('span');
    badge.className = 'px-2 py-0.5 rounded text-[9px] font-extrabold bg-ocean-600 text-white tracking-wide uppercase';
    badge.textContent = subject.badgeText || 'PRODUKTIF RPL';

    const time = document.createElement('span');
    time.className = 'text-[10px] font-mono font-bold text-ocean-700 dark:text-ocean-300';
    time.textContent = subject.time;

    topRow.append(badge, time);

    const name = document.createElement('h4');
    name.className = 'text-xs sm:text-sm font-extrabold text-ocean-950 dark:text-white';
    name.textContent = subject.name;

    const teacher = document.createElement('p');
    teacher.className = 'text-xs text-ocean-800 dark:text-ocean-200 mt-0.5';
    teacher.textContent = subject.teacher;

    item.append(topRow, name, teacher);

    if (subject.note) {
      const noteBox = document.createElement('div');
      const toneClass = NOTE_BOX_TONES[subject.noteTone] || NOTE_BOX_TONES.ocean;
      noteBox.className = `mt-2 text-[11px] font-mono p-1.5 rounded-lg flex items-center gap-1.5 ${toneClass}`;
      if (subject.noteIconClass) {
        noteBox.appendChild(createIcon(subject.noteIconClass, 'text-xs shrink-0'));
      }
      const noteText = document.createElement('span');
      noteText.textContent = subject.note;
      noteBox.appendChild(noteText);
      item.appendChild(noteBox);
    }

    return item;
  }

  if (subject.isCleaning) {
    item.className = 'p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-start justify-between gap-2';

    const info = document.createElement('div');
    const name = document.createElement('h4');
    name.className = 'text-xs font-bold text-emerald-900 dark:text-emerald-200';
    name.textContent = subject.name;

    const detail = document.createElement('p');
    detail.className = 'text-[11px] text-emerald-700 dark:text-emerald-300 mt-0.5';
    detail.textContent = subject.note || subject.teacher || '';

    info.append(name, detail);

    const time = document.createElement('span');
    time.className = 'text-[10px] font-mono text-emerald-700 dark:text-emerald-400 shrink-0';
    time.textContent = subject.time;

    item.append(info, time);
    return item;
  }

  item.className = 'p-2.5 rounded-xl bg-slate-50 dark:bg-ocean-900/40 border border-slate-200/60 dark:border-ocean-800/50';

  const row = document.createElement('div');
  row.className = 'flex justify-between items-start gap-2';

  const info = document.createElement('div');
  const name = document.createElement('h4');
  name.className = 'text-xs font-bold text-slate-900 dark:text-white';
  name.textContent = subject.name;

  const teacher = document.createElement('p');
  teacher.className = 'text-[11px] text-slate-500 dark:text-slate-400 mt-0.5';
  teacher.textContent = subject.teacher;

  info.append(name, teacher);

  const time = document.createElement('span');
  time.className = 'text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0';
  time.textContent = subject.time;

  row.append(info, time);
  item.appendChild(row);

  if (subject.note) {
    const inlineNote = document.createElement('p');
    const inlineTone = INLINE_NOTE_TONES[subject.noteTone] || 'text-slate-500 dark:text-slate-400';
    inlineNote.className = `mt-1 text-[10px] ${inlineTone}`;
    inlineNote.textContent = subject.note;
    item.appendChild(inlineNote);
  }

  return item;
}

function renderScheduleSection() {
  const scheduleContainer = document.getElementById('scheduleContainer');
  if (!scheduleContainer || !Array.isArray(scheduleDays)) return;

  const cards = scheduleDays.map(day => {
    const card = document.createElement('article');
    card.className = 'day-card p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-ocean-800/80';
    card.dataset.day = day.dayKey;

    const header = document.createElement('div');
    header.className = 'flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-ocean-800';

    const titleGroup = document.createElement('div');
    titleGroup.className = 'flex items-center gap-2';

    const numBadge = document.createElement('div');
    numBadge.className = 'w-7 h-7 rounded-lg bg-ocean-100 dark:bg-ocean-900 text-ocean-600 dark:text-ocean-400 flex items-center justify-center font-bold text-xs';
    numBadge.textContent = String(day.dayNumber);

    const dayTitle = document.createElement('h3');
    dayTitle.className = 'text-base font-bold text-slate-900 dark:text-white';
    dayTitle.textContent = day.dayName;

    titleGroup.append(numBadge, dayTitle);

    const hours = document.createElement('span');
    hours.className = `text-[11px] font-mono ${day.hoursClass || (day.isEarlyDismissal
      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
      : 'text-slate-500 dark:text-slate-400')}`;
    hours.textContent = day.hoursLabel;

    header.append(titleGroup, hours);

    const list = document.createElement('ul');
    list.className = 'space-y-2.5';
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
