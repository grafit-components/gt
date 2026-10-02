import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

// docs.ts импортирует Angular-компоненты, в Node его не загрузить — берём пути из текста файла
const paths = [...readFileSync('projects/app/src/app/docs.ts', 'utf8').matchAll(/path: '([^']+)'/g)].map((m) => m[1]);

for (const theme of ['light', 'dark']) {
  for (const path of ['', ...paths]) {
    test(`${path || 'overview'} ${theme}`, async ({ page }) => {
      // На страницах есть «текущая дата» — фиксируем часы, иначе эталоны устареют завтра
      await page.clock.setFixedTime(new Date('2026-01-15T12:00:00'));
      await page.addInitScript((t) => (localStorage['theme'] = t), theme);
      await page.goto('/' + path);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      // Страница прокручивается внутри контейнера, а не окна — растягиваем окно, чтобы влезло всё содержимое
      const extra = await page.locator('router-outlet').evaluate((el) => el.parentElement!.scrollHeight - el.parentElement!.clientHeight);
      await page.setViewportSize({ width: 1280, height: 800 + extra });
      await expect(page).toHaveScreenshot([theme, `${path || 'overview'}.png`], { fullPage: true, animations: 'disabled' });
    });
  }
}
