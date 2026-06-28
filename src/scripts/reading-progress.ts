const progress = document.getElementById('reading-progress');

function updateProgress() {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max <= 0 ? 0 : (window.scrollY / max) * 100;
  progress.style.width = `${Math.min(100, Math.max(0, value))}%`;
}

updateProgress();
document.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
