import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getPageContent } from '@/lib/getContent';

export const revalidate = 0;

export default async function HomePage() {
  const pageData = await getPageContent('/');

  if (pageData.is_custom_content_enabled && pageData.content) {
    return (
      <>
        <Header content={{}} />
        <main dangerouslySetInnerHTML={{ __html: pageData.content }} />
        <Footer content={{}} />
      </>
    );
  }

  return (
    <>
      <Header content={{}} />

      <main>
        <section className="impact-section container" id="store">
          <div className="black-panel">
            <div className="copy">
              <h2>Green Choices</h2>
              <p>
                Where sustainability meets convenience. Our carefully curated selection of sustainable goods aims to promote a more mindful approach to shopping, encouraging positive changes for a healthier planet.
              </p>
              <Link className="btn btn-light" href="/shop">
                Our store
              </Link>
            </div>
            <div className="photo photo-product">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/wooden-product.jpg" alt="Sustainable wooden product" />
            </div>
          </div>
        </section>

        <section className="climate-section container" id="journey">
          <div className="climate-copy">
            <h2>Make Climate Action Count</h2>
            <p>
              With us, you can offset your carbon footprint either once or on a monthly basis. For example, you can spend 5 euros per month on carbon credits to offset your monthly driven kilometers, or you can choose to offset your flights either monthly or as a one-time action.
            </p>
            <Link className="btn btn-dark" href="/journey">
              Your climate journey
            </Link>
          </div>
          <div className="turbine-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/wind-turbine.jpg" alt="Wind turbines and farmland" />
          </div>
        </section>

        <section className="about container" id="about">
          <h2>About us</h2>

          <div className="faq-list" id="faq">
            <details open>
              <summary>
                Who are we and what do we do?
                <span>−</span>
              </summary>
              <p>
                Daily-admin.com is a sustainability-focused platform helping individuals and families reduce their environmental footprint in a simple and practical way. We offer monthly carbon offset subscriptions (Offset Journey) that allow you to offset emissions from daily activities, as well as eco-friendly product subscriptions (such as bamboo toilet paper and toothpaste tablets) delivered conveniently to your home. Our operations are fully transparent, legally structured, and designed to make sustainable living accessible to everyone.
              </p>
            </details>

            <details>
              <summary>
                Why do we do this?
                <span>+</span>
              </summary>
              <p>
                We want to make meaningful climate action simple, practical and accessible in everyday life.
              </p>
            </details>

            <details>
              <summary>
                How do our subscriptions work?
                <span>+</span>
              </summary>
              <p>
                Choose a subscription, select the option that fits your lifestyle, and we take care of the recurring delivery or offset contribution.
              </p>
            </details>
          </div>
        </section>

        <section className="cta">
          <div className="cta-inner container">
            <h2>
              Combat climate change!<br />Join us.
            </h2>
            <h3>Join us.</h3>

            <div className="cta-grid">
              <Link href="/journey" className="cta-button">
                Climate journey <span>♟</span>
              </Link>
              <a href="mailto:info@daily-admin.com" className="cta-button">
                info@daily-admin.com <span>✉</span>
              </a>
              <Link href="/shop" className="cta-button">
                Green store <span>▱</span>
              </Link>
              <Link href="/cancel" className="cta-button cancel">
                Cancel subscription <span>×</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer content={{}} />
    </>
  );
}
