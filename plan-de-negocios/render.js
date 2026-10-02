const puppeteer = require("puppeteer-core");
const path = require("path");

const CHROME = "/home/german/.cache/puppeteer/chrome/linux-150.0.7871.24/chrome-linux64/chrome";
const DIR = __dirname;
const htmlPath = "file://" + path.join(DIR, "LOBBY-plan-de-negocios.html");
const out = path.join(DIR, "LOBBY-plan-de-negocios.pdf");

const foot = `
<div style="width:100%; font-size:8px; color:#8a90a8;
  font-family:'Noto Sans',Arial,sans-serif; padding:0 16mm;
  display:flex; justify-content:space-between; align-items:center;">
  <span>LOBBY · Plan de Negocios</span>
  <span style="letter-spacing:.12em;">CONFIDENCIAL</span>
  <span>Página <span class="pageNumber"></span> / <span class="totalPages"></span></span>
</div>`;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.goto(htmlPath, { waitUntil: "networkidle0" });
  await page.pdf({
    path: out,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: "<div></div>",
    footerTemplate: foot,
    margin: { top: "14mm", bottom: "16mm", left: "15mm", right: "15mm" },
  });
  await browser.close();
  console.log("PDF:", out);
})();
