/**
 * Picks readable text color (ink or paper) against an arbitrary accent
 * background, using WCAG relative luminance. Project accents range from
 * light/warm (gold, coral) to dark/cool (TCHOMBO's leaf green, Chasse de
 * Wolmar's forest green), so a single hardcoded text color isn't safe for
 * contrast on every "Play it live" button -- this picks whichever of the
 * site's two text colors actually passes against the given background.
 */
function relativeLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

const INK = '#0b0b0c';
const PAPER = '#f6f3ee';

/** Returns '#0b0b0c' or '#f6f3ee', whichever contrasts better against `bgHex`. */
export function readableTextOn(bgHex: string): string {
  const bgLuminance = relativeLuminance(bgHex);
  const contrastWithInk = (bgLuminance + 0.05) / (relativeLuminance(INK) + 0.05);
  const contrastWithPaper = (relativeLuminance(PAPER) + 0.05) / (bgLuminance + 0.05);
  return contrastWithInk >= contrastWithPaper ? INK : PAPER;
}
