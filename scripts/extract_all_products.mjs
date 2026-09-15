import fs from 'fs';

async function main() {
  const r2 = await fetch("https://daily-admin.com/shop/2/", { headers: { "User-Agent": "Mozilla/5.0" } });
  const html2 = await r2.text();
  fs.writeFileSync("shop2.html", html2);

  function extractProducts(html) {
    const products = [];
    const blockRegex = /<img[^>]+src="([^"]+)"[\s\S]*?<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>([\s\S]*?)<\/h1>[\s\S]*?<p[^>]*class="price"[^>]*>([\s\S]*?)<\/p>/gi;
    let match;
    while ((match = blockRegex.exec(html)) !== null) {
      const img = match[1];
      let title = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      // clean up symbol entities if any
      title = title.replace(/&trade;/g, '™').replace(/&#8482;/g, '™');
      let price = match[3].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&euro;/g, '€').trim();
      products.push({ title, price, img });
    }
    return products;
  }

  const p1 = extractProducts(fs.readFileSync("shop1.html", "utf8"));
  const p2 = extractProducts(html2);

  console.log(`Page 1 count: ${p1.length}`);
  console.log(`Page 2 count: ${p2.length}`);
  const total = [...p1, ...p2];
  console.log(`Total products: ${total.length}`);

  fs.writeFileSync("src/data/shop_products.json", JSON.stringify(total, null, 2));
  console.log("Saved to src/data/shop_products.json");
}

main();
