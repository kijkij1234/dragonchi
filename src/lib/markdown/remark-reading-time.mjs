import { toString } from 'mdast-util-to-string';

// Matches a single CJK / Japanese / Korean character. These languages are not
// space-delimited, so they are counted per-character rather than per-word.
const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿가-힣]/gu;

// Rough reading speeds: ~200 words/min for Latin text, ~350 chars/min for CJK.
const LATIN_WPM = 200;
const CJK_CPM = 350;

/**
 * Injects `minutesRead` and `wordCount` into the Astro frontmatter so post
 * pages can display reading metadata. CJK-aware: Chinese/Japanese/Korean text
 * is counted by character instead of by whitespace-delimited word.
 */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const text = toString(tree);
    const cjkChars = (text.match(CJK) || []).length;
    const latin = text.replace(CJK, ' ').trim();
    const latinWords = latin ? latin.split(/\s+/).filter(Boolean).length : 0;

    const wordCount = cjkChars + latinWords;
    const minutesRead = Math.max(1, Math.round(latinWords / LATIN_WPM + cjkChars / CJK_CPM));

    data.astro.frontmatter.minutesRead = minutesRead;
    data.astro.frontmatter.wordCount = wordCount;
  };
}
