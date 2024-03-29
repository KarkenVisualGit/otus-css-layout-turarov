import puppeteer from "puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

describe("styles.test", () => {
  const originalTimeout = 10000;

  [
    { width: 1920, height: 1080 },
    { width: 600, height: 1080 },
  ].forEach(({ width, height }) =>
    it(
      `should have proper view for ${width}x${height} params`,
      async () => {
        // setting up puppeteer
        const browser = await puppeteer.launch({
          headless: "new",
          // `headless: true` (default) enables old Headless;
          // `headless: 'new'` enables new Headless;
          // `headless: false` enables “headful” mode.
        });
        const page = await browser.newPage();
        // set current view port size
        await page.setViewport({ width, height });
        // navigate to the page, served with webpack
        // IMPORTANT!: test assumes webpack is started
        await page.goto("http://localhost:9000", { waitUntil: "networkidle0" });

        const image = await page.screenshot();
        await browser.close();

        expect(image).toMatchImageSnapshot(
          process.env.CI
            ? {
                failureThreshold: 0.01,
                failureThresholdType: "percent",
              }
            : undefined
        );
      },
      originalTimeout
    )
  );
});
