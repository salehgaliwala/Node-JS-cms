import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getContent } from '@/lib/getContent';

export const revalidate = 0;

export default async function HomePage() {
  const content = await getContent('/');
  const globalContent = await getContent('global');

  const mergedContent = { ...globalContent, ...content };

  const greenChoicesTitle = mergedContent.green_choices_title || 'Green Choices';
  const greenChoicesText = mergedContent.green_choices_text || 'Where sustainability meets convenience. Our carefully curated selection of sustainable goods aims to promote a more mindful approach to shopping, encouraging positive changes for a healthier planet.';
  const greenChoicesBtn = mergedContent.green_choices_btn || 'Our store';
  const greenChoicesImg = mergedContent.green_choices_img || '/assets/wooden-product.jpg';

  const climateTitle = mergedContent.climate_title || 'Make Climate Action Count';
  const climateText = mergedContent.climate_text || 'With us, you can offset your carbon footprint either once or on a monthly basis. For example, you can spend 5 euros per month on carbon credits to offset your monthly driven kilometers, or you can choose to offset your flights either monthly or as a one-time action.';
  const climateBtn = mergedContent.climate_btn || 'Your climate journey';
  const climateImg = mergedContent.climate_img || '/assets/wind-turbine.jpg';

  const aboutTitle = mergedContent.about_title || 'About us';
  const faq1Q = mergedContent.faq1_q || 'Who are we and what do we do?';
  const faq1A = mergedContent.faq1_a || 'Daily-admin.com is a sustainability-focused platform helping individuals and families reduce their environmental footprint in a simple and practical way. We offer monthly carbon offset subscriptions (Offset Journey) that allow you to offset emissions from daily activities, as well as eco-friendly product subscriptions (such as bamboo toilet paper and toothpaste tablets) delivered conveniently to your home. Our operations are fully transparent, legally structured, and designed to make sustainable living accessible to everyone.';
  const faq2Q = mergedContent.faq2_q || 'Why do we do this?';
  const faq2A = mergedContent.faq2_a || 'We want to make meaningful climate action simple, practical and accessible in everyday life.';
  const faq3Q = mergedContent.faq3_q || 'How do our subscriptions work?';
  const faq3A = mergedContent.faq3_a || 'Choose a subscription, select the option that fits your lifestyle, and we take care of the recurring delivery or offset contribution.';

  const ctaH2 = mergedContent.cta_h2 || 'Combat climate change!';
  const ctaH3 = mergedContent.cta_h3 || 'Join us.';
  const ctaBtn1 = mergedContent.cta_btn1 || 'Climate journey';
  const ctaBtn2 = mergedContent.cta_btn2 || 'info@daily-admin.com';
  const ctaBtn3 = mergedContent.cta_btn3 || 'Green store';
  const ctaBtn4 = mergedContent.cta_btn4 || 'Cancel subscription';

  return (
    <>
      <Header content={mergedContent} />

      <main>
        <section className="impact-section container" id="store">
          <div className="black-panel">
            <div className="copy">
              <h2>{greenChoicesTitle}</h2>
              <p>{greenChoicesText}</p>
              <Link className="btn btn-light" href="/shop">
                {greenChoicesBtn}
              </Link>
            </div>
            <div className="photo photo-product">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={greenChoicesImg} alt="Sustainable wooden product" />
            </div>
          </div>
        </section>

        <section className="climate-section container" id="journey">
          <div className="climate-copy">
            <h2>{climateTitle}</h2>
            <p>{climateText}</p>
            <Link className="btn btn-dark" href="/journey">
              {climateBtn}
            </Link>
          </div>
          <div className="turbine-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={climateImg} alt="Wind turbines and farmland" />
          </div>
        </section>

        <section className="about container" id="about">
          <h2>{aboutTitle}</h2>

          <div className="faq-list" id="faq">
            <details open>
              <summary>
                {faq1Q}
                <span>−</span>
              </summary>
              <p>{faq1A}</p>
            </details>

            <details>
              <summary>
                {faq2Q}
                <span>+</span>
              </summary>
              <p>{faq2A}</p>
            </details>

            <details>
              <summary>
                {faq3Q}
                <span>+</span>
              </summary>
              <p>{faq3A}</p>
            </details>
          </div>
        </section>

        <section className="cta">
          <div className="cta-inner container">
            <h2>
              {ctaH2.includes('!') ? (
                <>
                  {ctaH2.split('!')[0]}!<br />
                  {ctaH2.split('!')[1]}
                </>
              ) : (
                ctaH2
              )}
            </h2>
            <h3>{ctaH3}</h3>

            <div className="cta-grid">
              <Link href="/journey" className="cta-button">
                {ctaBtn1} <span>♟</span>
              </Link>
              <a href={`mailto:${ctaBtn2}`} className="cta-button">
                {ctaBtn2} <span>✉</span>
              </a>
              <Link href="/shop" className="cta-button">
                {ctaBtn3} <span>▱</span>
              </Link>
              <Link href="/cancel" className="cta-button cancel">
                {ctaBtn4} <span>×</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer content={mergedContent} />
    </>
  );
}
