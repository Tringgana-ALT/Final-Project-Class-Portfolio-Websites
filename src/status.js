const commentStatus = document.getElementById('commentStatus');

export function announce(message) {
  commentStatus.textContent = message;
}
