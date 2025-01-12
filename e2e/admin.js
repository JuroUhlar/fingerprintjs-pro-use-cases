/**
 * @param {import('@playwright/test').BrowserContext} context
 * */
export async function reset(context) {
  const page = await context.newPage();

  await page.goto('/admin');

  await page.click('#reset');

  await page.waitForSelector('text=Reset all data for this visitorId');

  await page.close();
}
