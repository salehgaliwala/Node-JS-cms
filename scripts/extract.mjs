import fs from 'fs';

async function main() {
  const r1 = await fetch("https://daily-admin.com/shop/", { headers: { "User-Agent": "Mozilla/5.0" } });
  const html1 = await r1.text();
  const r2 = await fetch("https://daily-admin.com/shop/2/", { headers: { "User-Agent": "Mozilla/5.0" } });
  const html2 = await r2.text();

  function parseProducts(html) {
    const products = [];
    const liRegex = /<li[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]*?)<\/li>/gi;
    let match;
    while ((match = liRegex.exec(html)) !== null) {
      const block = match[1];

      const titleMatch = block.match(/<h2[^>]*class="[^"]*woocommerce-loop-product__title[^"]*"[^>]*>([\s\S]*?)<\/h2>/i) ||
                         block.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      const priceMatch = block.match(/<span[^>]*class="[^"]*woocommerce-Price-amount[^"]*"[^>]*>([\s\S]*?)<\/span>/i) ||
                         block.match(/(€\s*[\d.,]+|[\d.,]+\s*€)/i);
      const price = priceMatch ? priceMatch[0].replace(/<[^>]+>/g, '').trim() : '';

      const imgMatch = block.match(/<img[^>]+(?:src|data-src)="([^"]+)"/i);
      const img = imgMatch ? imgMatch[1] : '';

      if (title) {
        products.push({ title, price, img });
      }
    }
    return products;
  }

  const list1 = parseProducts(html1);
  const list2 = parseProducts(html2);

  console.log(`Page 1 count: ${list1.length}`);
  console.log(`Page 2 count: ${list2.length}`);
  console.log("Total:", list1.length + list2.length);

  const all = [...list1, ...list2];
  fs.writeFileSync('extracted_products.json', JSON.stringify(all, null, 2));
  console.log("Saved to extracted_products.json");
}

main();
