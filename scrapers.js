const puppeteer = require("puppeteer");

const scrapeProduct = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const [el] = await page.$x('//*[@id="landingImage"]');
  const src = await el.getProperty("src");
  const imgURL = await src.jsonValue();

  const [el2] = await page.$x('//*[@id="productTitle"]');
  const txt = await el2.getProperty("textContent");
  const title = await txt.jsonValue();

  const [el3] = await page.$x(
    '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span/span[2]'
  );
  const txt2 = await el3.getProperty("textContent");

  const price = await txt2.jsonValue();

  console.log({ imgURL, title, price });

  browser.close();
};

scrapeProduct(
  "https://www.amazon.ca/Sony-WH-CH710N-Canceling-Headphones-Bluetooth/dp/B085RNVJ3P/ref=lp_24030158011_1_1"
);
