import { announce } from './status.js';

export function initializeInteractions() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      themeIcon.classList.replace('ph-moon', 'ph-sun');
      themeToggle.setAttribute('aria-label', 'Ganti ke tema terang');
    } else {
      document.documentElement.classList.remove('dark');
      themeIcon.classList.replace('ph-sun', 'ph-moon');
      themeToggle.setAttribute('aria-label', 'Ganti ke tema gelap');
    }

    try {
      localStorage.setItem('theme_mode', isDark ? 'dark' : 'light');
    } catch (error) {
      announce('Tema berubah, tetapi preferensi tema tidak dapat disimpan di browser ini.');
    }
  }

  try {
    applyTheme(localStorage.getItem('theme_mode') === 'dark');
  } catch (error) {
    applyTheme(false);
    announce('Preferensi tema tidak dapat dibaca dari browser ini.');
  }

  themeToggle.addEventListener('click', () => {
    applyTheme(!document.documentElement.classList.contains('dark'));
  });

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuIcon = document.getElementById('mobileMenuIcon');

  function setMobileMenuOpen(isOpen) {
    mobileMenu.classList.toggle('hidden', !isOpen);
    mobileMenuIcon.classList.toggle('ph-list', !isOpen);
    mobileMenuIcon.classList.toggle('ph-x', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  }

  mobileMenuBtn.addEventListener('click', () => {
    setMobileMenuOpen(mobileMenu.classList.contains('hidden'));
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => setMobileMenuOpen(false));
  });

  const terminalScreen = document.getElementById('terminalScreen');
  const cliDynamicLogs = document.getElementById('cliDynamicLogs');
  const terminalCurrentInput = document.getElementById('terminalCurrentInput');
  const cliResponses = {
    'npm run curhat': '[INFO] Kelas 10 RPL siap belajar dan berkarya bersama.',
    'cat rules.txt': 'PRINSIP KELAS:\n1. Saling menghargai.\n2. Berkolaborasi dengan baik.\n3. Terus belajar dan mencoba.',
    'ping lab_pc3': 'Mencoba terhubung ke ruang belajar...\nStatus: Belajar bersama, selangkah demi selangkah.'
  };

  function runCommand(command) {
    terminalCurrentInput.textContent = command;

    if (command === 'clear') {
      cliDynamicLogs.replaceChildren();
      terminalScreen.scrollTop = 0;
      return;
    }

    const logBlock = document.createElement('div');
    logBlock.className = 'mt-2 pt-1 border-t border-slate-800 text-[11px] leading-relaxed';
    const prompt = document.createElement('div');
    prompt.className = 'text-emerald-400';
    prompt.textContent = `siswa@10rpl:~$ ${command}`;
    const output = document.createElement('div');
    output.className = 'text-slate-300 mt-1 whitespace-pre-line pl-2 border-l border-ocean-600/70 font-mono';
    output.textContent = cliResponses[command] || 'Perintah tidak dikenal. Silakan pilih perintah yang tersedia.';
    logBlock.append(prompt, output);
    cliDynamicLogs.appendChild(logBlock);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  document.querySelectorAll('[data-command]').forEach(button => {
    button.addEventListener('click', () => runCommand(button.dataset.command));
  });

  const filterButtons = document.querySelectorAll('#galleryFilterButtons .filter-btn');
  const galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');

  document.querySelectorAll('#galleryGrid img').forEach(image => {
    image.addEventListener('error', () => image.classList.add('hidden'));
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(filterButton => {
        filterButton.classList.remove('active', 'bg-ocean-600', 'text-white');
        filterButton.classList.add('bg-white', 'dark:bg-ocean-900/60', 'text-slate-700', 'dark:text-slate-200');
        filterButton.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active', 'bg-ocean-600', 'text-white');
      button.classList.remove('bg-white', 'dark:bg-ocean-900/60', 'text-slate-700', 'dark:text-slate-200');
      button.setAttribute('aria-pressed', 'true');

      const filter = button.dataset.filter;
      galleryItems.forEach(item => {
        item.style.display = filter === 'all' || item.dataset.category === filter ? 'block' : 'none';
      });
    });
  });

  const galleryModal = document.getElementById('galleryModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTag = document.getElementById('modalTag');
  const modalImage = document.getElementById('modalImage');
  const modalImageOverlay = document.getElementById('modalImageOverlay');
  const closeGalleryModal = document.getElementById('closeGalleryModal');
  const closeGalleryModalAction = document.getElementById('closeGalleryModalAction');
  let activeGalleryTrigger = null;

  function restoreGalleryFocus() {
    if (activeGalleryTrigger && typeof activeGalleryTrigger.focus === 'function') {
      activeGalleryTrigger.focus();
    }
    activeGalleryTrigger = null;
  }

  function openModal(item) {
    activeGalleryTrigger = document.activeElement;
    modalTitle.textContent = item.dataset.title || '';
    modalDesc.textContent = item.dataset.description || '';
    modalTag.textContent = item.dataset.tag || 'ILUSTRASI KEGIATAN';

    if (modalImage && modalImageOverlay) {
      const imageSrc = item.dataset.image || '';
      if (imageSrc) {
        modalImage.src = imageSrc;
        modalImage.alt = item.dataset.alt || item.dataset.title || '';
        modalImage.classList.remove('hidden');
        modalImageOverlay.classList.remove('hidden');
      } else {
        modalImage.removeAttribute('src');
        modalImage.alt = '';
        modalImage.classList.add('hidden');
        modalImageOverlay.classList.add('hidden');
      }
    }

    if (typeof galleryModal.showModal === 'function') {
      if (!galleryModal.open) galleryModal.showModal();
    } else {
      galleryModal.setAttribute('open', '');
    }
    closeGalleryModal.focus();
  }

  function closeModal() {
    if (typeof galleryModal.close === 'function') {
      if (galleryModal.open) galleryModal.close();
    } else {
      galleryModal.removeAttribute('open');
      restoreGalleryFocus();
    }
  }

  if (modalImage && modalImageOverlay) {
    modalImage.addEventListener('error', () => {
      modalImage.classList.add('hidden');
      modalImageOverlay.classList.add('hidden');
    });
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openModal(item));
    item.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
      }
    });
  });

  galleryModal.addEventListener('close', restoreGalleryFocus);
  closeGalleryModal.addEventListener('click', closeModal);
  closeGalleryModalAction.addEventListener('click', closeModal);
  galleryModal.addEventListener('click', event => {
    if (event.target === galleryModal) closeModal();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (galleryModal.hasAttribute('open') && typeof galleryModal.close !== 'function') {
        closeModal();
      }
      if (!mobileMenu.classList.contains('hidden')) setMobileMenuOpen(false);
    }
  });

  const dayFilters = document.querySelectorAll('.day-filter');
  const dayCards = document.querySelectorAll('.day-card');

  dayFilters.forEach(button => {
    button.addEventListener('click', () => {
      dayFilters.forEach(filterButton => {
        filterButton.classList.remove('active', 'bg-ocean-600', 'text-white', 'shadow-md');
        filterButton.classList.add('bg-white', 'dark:bg-ocean-900/60', 'text-slate-700', 'dark:text-slate-200');
        filterButton.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active', 'bg-ocean-600', 'text-white', 'shadow-md');
      button.classList.remove('bg-white', 'dark:bg-ocean-900/60', 'text-slate-700', 'dark:text-slate-200');
      button.setAttribute('aria-pressed', 'true');

      dayCards.forEach(card => {
        card.style.display = button.dataset.day === 'all' || card.dataset.day === button.dataset.day
          ? 'block'
          : 'none';
      });
    });
  });

  document.querySelectorAll('[data-emoji]').forEach(button => {
    button.addEventListener('click', () => {
      const textarea = document.getElementById('userMessage');
      const addition = ` ${button.dataset.emoji} `;
      if (textarea.value.length + addition.length > textarea.maxLength) {
        announce('Pesan sudah mencapai batas 400 karakter.');
        return;
      }
      textarea.value += addition;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.focus();
    });
  });

  document.getElementById('currentYear').textContent = String(new Date().getFullYear());

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('main section, footer').forEach(section => {
      section.classList.add('reveal-on-scroll');
      revealObserver.observe(section);
    });
  }
}
