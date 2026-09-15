import fs from 'fs';

async function parsePage(file) {
  const html = fs.readFileSync(file, 'utf8');
  const products = [];

  // Each product block is an elementor-loop-item or elementor-grid item or contains woocommerce-product-title
  // Let us find all occurrences of product_title entry-title elementor-heading-title
  const titleRegex = /<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/gi;

  // Let us split html by elementor-loop-container or loop item, or parse around titles
  // Actually, let us find all <img ...> before title, <h1 class="product_title...">, and <p class="price">...

  // Let us use regex to match blocks containing image, title, price
  const blockRegex = /<img[^>]+src="([^"]+)"[\s\S]*?<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>([\s\S]*?)<\/h1>[\s\S]*?<p[^>]*class="price"[^>]*>([\s\S]*?)<\/p>/gi;

  let match;
  while ((match = blockRegex.exec(html)) !== null) {
    const img = match[1];
    const rawTitle = match[2].replace(/<[^>]+>/g, '').trim();
    const rawPrice = match[3].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    products.push({
      title: rawTitle,
      price: rawPrice,
      img: img
    });
  }

  return products;
}

async function main() {
  const p1 = await parsePage('shop1.html');
  console.log("Page 1 products found:", p1.length);
  if (p1.length > 0) console.log("Sample:", p1[0]);
}

main();
