import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("keyboard validation, honest unavailable result and zero inquiry requests", async ({ page }) => {
  const inquiries: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST" || /\/api\/v1\/inquiries/.test(request.url())) inquiries.push(request.url());
  });
  await page.goto("/contact");
  await expect(page).toHaveTitle("Contact | AmplifyWorld");
  await expect(page.locator(".footer-invitation")).toBeHidden();
  await page.getByRole("link", { name: "Send Your Inquiry" }).click();
  const form = page.getByRole("form");
  await expect(form.getByRole("button", { name: /Check Inquiry/ })).toBeEnabled();
  await form.getByRole("button", { name: /Check Inquiry/ }).click();
  await expect(page.getByRole("textbox", { name: "Full Name", exact: true })).toBeFocused();
  await page.getByRole("textbox", { name: "Full Name", exact: true }).fill("Sample Person");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("textbox", { name: "Email Address", exact: true })).toBeFocused();
  await page.keyboard.type("sample@example.org");
  await page.getByRole("combobox", { name: "Service Interested In", exact: true }).selectOption("not-sure");
  await page.getByRole("textbox", { name: "Project Details", exact: true }).fill("We would like to discuss a website for our business.");
  await form.getByRole("button", { name: /Check Inquiry/ }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toContainText("Nothing has been sent");
  await expect(page.getByRole("status")).toBeFocused();
  await expect(page.getByRole("textbox", { name: "Full Name", exact: true })).toHaveValue("Sample Person");
  await expect(page.locator('a[href^="https://wa.me/"]')).toHaveCount(0);
  await expect(page.locator('[data-whatsapp-state="unconfigured"]').first()).toBeDisabled();
  expect(inquiries).toEqual([]);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

for (const width of [1440, 1024, 768, 390, 375, 320]) {
  test(`Contact fits ${width}px with readable fields and reduced motion`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/contact");
    await page.getByRole("button", { name: /Check Inquiry/ }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const name = await page.getByRole("textbox", { name: "Full Name", exact: true }).boundingBox();
    const email = await page.getByRole("textbox", { name: "Email Address", exact: true }).boundingBox();
    expect(name!.height).toBeGreaterThanOrEqual(48);
    expect(await page.getByRole("textbox", { name: "Email Address", exact: true }).evaluate((element) => getComputedStyle(element).fontSize)).toBe("16px");
    if (width >= 1100 || (width >= 640 && width <= 850)) expect(email!.y).toBe(name!.y);
    else expect(email!.y).toBeGreaterThan(name!.y);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`contact-${width}.png`), fullPage: true });
  });
}

test("no JavaScript cannot submit personal data through a native GET", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/contact");
  await expect(page.getByRole("textbox", { name: "Full Name", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: /Check Inquiry/ })).toBeDisabled();
  await expect(page.getByText("JavaScript is needed to check this form.")).toBeVisible();
  await context.close();
});

test("existing public routes still render their main heading", async ({ page }) => {
  for (const path of ["/", "/about", "/portfolio", "/blog", "/blog?article=search"]) {
    await page.goto(path);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator(".site-footer")).toBeVisible();
  }
});
