const button = document.querySelector<HTMLButtonElement>('[data-sentence-cycle]');
const target = document.querySelector<HTMLElement>('[data-sentence-target]');

function readSentences() {
  if (!button?.dataset.sentences) return [];
  try {
    const value = JSON.parse(button.dataset.sentences);
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0) : [];
  } catch {
    return [];
  }
}

const sentences = readSentences();
let index = 0;

button?.addEventListener('click', () => {
  if (!target || sentences.length < 2) return;

  index = (index + 1) % sentences.length;
  target.classList.remove('sentence-fade');
  button.classList.remove('is-spinning');
  void target.offsetWidth;
  target.textContent = sentences[index];
  target.classList.add('sentence-fade');
  button.classList.add('is-spinning');
});
