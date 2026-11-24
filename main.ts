// One Letter for Your Day — make.fun bounty u-puan-one-letter-for-your-day-e54e9c36
//
// The letter: C
// The word behind it: "caffeinated"
//
// Why C: today is a Tuesday, deep in the working week, and the day is
// running on coffee. "Caffeinated" is vivid (you can almost smell the
// coffee), funny (the honest fuel of every deadline day), and true
// (a Tuesday morning powered by caffeine, not by sleep or luck).
// A single letter, one honest word behind it.
//
// Deterministic, no randomness, no network, no dependencies.
// Writes exactly one uppercase letter, "C", to /output/entry.txt
// with no trailing newline. The letter is validated before writing
// and the file is verified after writing, so a bad value can never
// silently reach the scorer.

import * as fs from "node:fs";
import * as path from "node:path";

const LETTER = "C";
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = path.join(OUTPUT_DIR, "entry.txt");

// Gate rule: exactly one ASCII uppercase letter, A-Z. Anything else
// (lowercase, digit, whitespace, punctuation, empty string) scores 0,
// so refuse to write it rather than emit an invalid entry.
if (!/^[A-Z]$/.test(LETTER)) {
  throw new Error(`Invalid entry letter: ${JSON.stringify(LETTER)}`);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, LETTER, "utf8");

// Verify what actually landed on disk: exactly 1 byte, the same letter.
const written = fs.readFileSync(OUTPUT_FILE, "utf8");
if (written !== LETTER) {
  throw new Error(
    `Verification failed: /output/entry.txt contains ${JSON.stringify(written)}, expected ${JSON.stringify(LETTER)}`,
  );
}
