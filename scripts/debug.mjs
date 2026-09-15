import fs from 'fs';

async function main() {
  const r1 = await fetch("https://daily-admin.com/shop/", { headers: { "User-Agent": "Mozilla/5.0" } });
  const html1 = await r1.text();
  fs.writeFileSync("shop1.html", html1);
  console.log("Written shop1.html, length:", html1.length);
}

main();
