import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const segmentSource = readFileSync(new URL('../src/components/marketing/home/data/segment-content.ts', import.meta.url), 'utf8');
const homeSource = readFileSync(new URL('../src/components/marketing/home/home-experience.tsx', import.meta.url), 'utf8');

test('segment configuration supports all required audiences', () => {
  assert.match(segmentSource, /franchise/);
  assert.match(segmentSource, /memberhub/);
  assert.match(segmentSource, /enterprise/);
});

test('personalization state persists in localStorage and cookie', () => {
  assert.match(homeSource, /localStorage\.setItem/);
  assert.match(homeSource, /flynerd_segment=/);
});
