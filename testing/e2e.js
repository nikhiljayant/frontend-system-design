// End-to-end testing with Puppeteer

const puppeteer = require("puppeteer"); // Alternatives: Cypress (More Advance), Selenium.

(async () => {
  // Launch browser instance
  const browser = await puppeteer.launch({
    // Headless mode: true = runs in background without UI, false = opens visible browser window
    headless: true,
    slowMo: 100,
    args: [
      "--window-size=1920,1080",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto("https://namastedev.com/");
  console.log("Webpage loaded");

  // Set browser viewport size
  await page.setViewport({ width: 1920, height: 1080 });

  // Target link selector
  const coursePageLink = 'a[href*="courses"]'; // Corrections required

  // Wait for and click the course page link
  await page.waitForSelector(coursePageLink);
  await page.click(coursePageLink);
  console.log("Course page loaded");

  // Close browser instance
  await browser.close();
  console.log("Browser closed");
})();

// IDEAL FLOW IMPLEMENTATION:

// ==========================================
// 1. Automate Whole User Journey Example
// ==========================================
// Complete journey: Home -> Login -> Search -> Course Details -> Logout
async function runUserJourney() {
  const logs = [];
  const errors = [];

  const log = (msg) => {
    const time = new Date().toISOString();
    const entry = `[${time}] ${msg}`;
    console.log(entry);
    logs.push(entry);
  };

  const logError = (err) => {
    const time = new Date().toISOString();
    const entry = `[${time}] ERROR: ${err.message || err}`;
    console.error(entry);
    errors.push(entry);
  };

  log("Starting full user journey automation...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    // Step 1: Open Home Page
    await page.goto("https://namastedev.com/", { waitUntil: "networkidle2" });
    log("Navigated to Home Page");

    // Step 2: Login Flow
    await page.click("#login-btn");
    await page.type("#username", "user@example.com");
    await page.type("#password", "SecurePassword123");
    await page.click("#submit-login");
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    log("User logged in successfully");

    // Step 3: Search and Navigate
    await page.type("#search-input", "Frontend System Design");
    await page.keyboard.press("Enter");
    await page.waitForSelector(".course-card");
    log("Search completed and results loaded");

    // Step 4: Perform Main Action / Journey verification
    await page.click(".course-card:first-child");
    await page.waitForSelector(".course-details");
    log("Opened course details page");

    // Step 5: Logout
    await page.click("#user-profile-menu");
    await page.click("#logout-btn");
    log("User logged out successfully");
  } catch (error) {
    logError(error);
  } finally {
    await browser.close();
    log("Browser session closed");
  }

  return { logs, errors };
}

// ==========================================
// 2. Collect Logs and Send Email via Amazon SES
// ==========================================
// Using AWS SDK Amazon SES client to send log and error reports
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

async function sendEmailReport(logs, errors) {
  const sesClient = new SESClient({ region: "us-east-1" });

  const status = errors.length === 0 ? "SUCCESS" : "FAILED";
  const subject = `[E2E Test Report] Daily Execution Status: ${status}`;

  const bodyText = `
E2E Test Execution Summary
---------------------------
Status: ${status}
Total Logs: ${logs.length}
Total Errors: ${errors.length}

--- LOGS ---
${logs.join("\n")}

${errors.length > 0 ? `--- ERRORS ---\n${errors.join("\n")}` : ""}
  `;

  const params = {
    Source: "noreply@example.com", // Verified Amazon SES sender address
    Destination: {
      ToAddresses: ["admin@example.com"], // Recipient email address
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Text: { Data: bodyText },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log("Email sent successfully via Amazon SES:", response.MessageId);
  } catch (err) {
    console.error("Failed to send email via Amazon SES:", err);
  }
}

// ==========================================
// 3. Schedule Daily Execution at 8:00 AM (CRON Job)
// ==========================================
// Using 'node-cron' module to schedule daily jobs
// Install via: npm install node-cron
const cron = require("node-cron");

// Cron pattern '0 8 * * *' triggers every day at 8:00 AM
cron.schedule("0 8 * * *", async () => {
  console.log("Triggering daily 8:00 AM E2E test suite...");

  // 1. Run whole user journey automation & collect logs/errors
  const { logs, errors } = await runUserJourney();

  // 2. Send collected logs and error report via Amazon SES
  await sendEmailReport(logs, errors);
});
