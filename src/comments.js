import {
  limitToLast,
  onValue,
  orderByChild,
  push,
  query,
  serverTimestamp
} from 'firebase/database';
import { announce } from './status.js';

const validCategories = ['Pesan', 'Kesan', 'Menfess'];

function isValidComment(item) {
  return item &&
    typeof item.name === 'string' &&
    item.name.length > 0 &&
    item.name.length <= 40 &&
    validCategories.includes(item.category) &&
    typeof item.message === 'string' &&
    item.message.length > 0 &&
    item.message.length <= 400 &&
    Number.isFinite(item.createdAt) &&
    item.createdAt > 0 &&
    item.createdAt <= Date.now() + 60000;
}

function createCategoryBadge(category) {
  const badge = document.createElement('span');
  const styles = {
    Menfess: 'bg-pink-100 text-pink-700 dark:bg-pink-950/80 dark:text-pink-300',
    Kesan: 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300',
    Pesan: 'bg-ocean-100 text-ocean-700 dark:bg-ocean-900/80 dark:text-ocean-300'
  };
  const labels = {
    Menfess: '💌 Menfess',
    Kesan: '⭐ Kesan',
    Pesan: '💬 Pesan'
  };
  badge.className = `px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${styles[category]}`;
  badge.textContent = labels[category];
  return badge;
}

function renderComments(comments, container, countElement) {
  countElement.textContent = String(comments.length);
  container.replaceChildren();

  if (comments.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'text-center py-8 glass-card rounded-2xl';
    const icon = document.createElement('i');
    icon.className = 'ph ph-chat-teardrop text-3xl text-slate-400 mb-1';
    icon.setAttribute('aria-hidden', 'true');
    const message = document.createElement('p');
    message.className = 'text-xs text-slate-500';
    message.textContent = 'Belum ada komentar. Jadilah yang pertama mengirim pesan!';
    emptyState.append(icon, message);
    container.appendChild(emptyState);
    return;
  }

  comments.forEach(item => {
    const card = document.createElement('article');
    card.className = 'p-3.5 sm:p-4 rounded-xl glass-card border border-slate-200/80 dark:border-ocean-800/80 transition hover:border-ocean-400';
    const heading = document.createElement('div');
    heading.className = 'flex items-center justify-between gap-2 mb-1.5';
    const identity = document.createElement('div');
    identity.className = 'flex items-center gap-2 min-w-0';
    const avatar = document.createElement('div');
    avatar.className = 'w-7 h-7 rounded-lg bg-gradient-to-tr from-ocean-600 to-ocean-400 text-white font-bold text-xs flex items-center justify-center shrink-0';
    avatar.textContent = item.name.charAt(0).toUpperCase();
    const name = document.createElement('span');
    name.className = 'text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate';
    name.textContent = item.name;
    const time = document.createElement('time');
    time.className = 'text-[10px] font-mono text-slate-400 shrink-0';
    time.dateTime = new Date(item.createdAt).toISOString();
    time.textContent = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(item.createdAt);
    const body = document.createElement('p');
    body.className = 'text-xs sm:text-sm text-slate-700 dark:text-slate-200 pl-9 leading-relaxed break-words';
    body.textContent = item.message;
    identity.append(avatar, name, createCategoryBadge(item.category));
    heading.append(identity, time);
    card.append(heading, body);
    container.appendChild(card);
  });
}

export function initializeComments(commentsRef, startupError = null) {
  const commentForm = document.getElementById('commentForm');
  const userNameInput = document.getElementById('userName');
  const userCategoryInput = document.getElementById('userCategory');
  const userMessageInput = document.getElementById('userMessage');
  const messageCount = document.getElementById('messageCount');
  const commentsContainer = document.getElementById('commentsContainer');
  const commentCount = document.getElementById('commentCount');
  const commentSubmitButton = commentForm.querySelector('button[type="submit"]');

  function updateMessageCount() {
    messageCount.textContent = `${userMessageInput.value.length}/400`;
  }

  renderComments([], commentsContainer, commentCount);
  updateMessageCount();

  if (startupError || !commentsRef) {
    announce(startupError?.message || 'Koneksi Firebase belum tersedia.');
    commentSubmitButton.disabled = true;
    return;
  }

  const recentComments = query(commentsRef, orderByChild('createdAt'), limitToLast(100));
  announce('Menghubungkan ke Firebase...');
  onValue(recentComments, snapshot => {
    const comments = [];
    snapshot.forEach(commentSnapshot => {
      const item = commentSnapshot.val();
      if (isValidComment(item)) comments.push(item);
    });
    comments.sort((first, second) => second.createdAt - first.createdAt);
    renderComments(comments, commentsContainer, commentCount);
    announce('');
  }, error => {
    announce(error.code === 'PERMISSION_DENIED'
      ? 'Firebase menolak akses. Periksa aturan di database.rules.json dan Firebase Console.'
      : 'Komentar tidak dapat dimuat. Periksa koneksi internet lalu coba lagi.');
  });

  userMessageInput.addEventListener('input', updateMessageCount);
  commentForm.addEventListener('submit', async event => {
    event.preventDefault();
    const name = userNameInput.value.trim().slice(0, 40) || 'Anonim';
    const category = userCategoryInput.value;
    const message = userMessageInput.value.trim().slice(0, 400);

    if (!message || !validCategories.includes(category)) {
      announce('Isi pesan dan pilih kategori yang valid sebelum mengirim.');
      userMessageInput.focus();
      return;
    }

    commentSubmitButton.disabled = true;
    try {
      await push(commentsRef, {
        name,
        category,
        message,
        createdAt: serverTimestamp()
      });
      commentForm.reset();
      updateMessageCount();
      announce('Komentar berhasil dikirim dan dapat dilihat semua pengunjung.');
    } catch (error) {
      announce(error.code === 'PERMISSION_DENIED'
        ? 'Komentar ditolak oleh Firebase Rules. Periksa aturan Realtime Database.'
        : 'Komentar gagal dikirim. Periksa koneksi internet lalu coba lagi.');
    } finally {
      commentSubmitButton.disabled = false;
    }
  });
}
