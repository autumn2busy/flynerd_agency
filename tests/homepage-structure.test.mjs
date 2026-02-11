import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const pageSource = readFileSync(new URL('../src/app/page.tsx', import.meta.url), 'utf8');
const metadataSource = readFileSync(new URL('../src/lib/segment-metadata.ts', import.meta.url), 'utf8');
const sidebarSource = readFileSync(new URL('../src/components/marketing/home/sidebar-shell.tsx', import.meta.url), 'utf8');
const heroSource = readFileSync(new URL('../src/components/marketing/home/hero-with-ambient-video.tsx', import.meta.url), 'utf8');

test('homepage exports dynamic metadata integration', () => {
  assert.match(pageSource, /generateMetadata/);
  assert.match(pageSource, /buildSegmentMetadata/);
});

test('metadata builder includes open graph and twitter fields', () => {
  assert.match(metadataSource, /openGraph/);
  assert.match(metadataSource, /twitter/);
});

test('sidebar includes audit CTA and segment navigation shell', () => {
  assert.match(sidebarSource, /Start an Automation Audit/);
  assert.match(sidebarSource, /Automations/);
  assert.match(sidebarSource, /Member Hubs/);
  assert.match(sidebarSource, /SegmentToggle/);
});

test('hero includes ambient video and conversion CTA labels', () => {
  assert.match(heroSource, /ambient-loop\.mp4/);
  assert.match(heroSource, /content\.ctaLabel/);
  assert.match(heroSource, /Authenticity is the new Authority/);
});
