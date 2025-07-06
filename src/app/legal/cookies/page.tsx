'use client';

import { Layout } from '../../../components/Layout';
import styles from '../../../styles/LegalPage.module.scss';

export default function CookiesPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Cookie Policy</h1>
          <p className={styles.lastUpdated}>Last updated: July 6, 2025</p>
          
          <div className={styles.section}>
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Free Service</h2>
            <p>
              This website is provided completely free of charge for educational and personal use. We do not sell your data, 
              display advertisements, or charge for any features. Our use of cookies is limited to essential functionality 
              and basic analytics to improve the service.
            </p>
          </div>

          <div className={styles.section}>
            <h2>How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul>
              <li><strong>Analytics:</strong> To understand how visitors use our website</li>
              <li><strong>Functionality:</strong> To remember your preferences and settings</li>
              <li><strong>Performance:</strong> To optimize website performance and user experience</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Types of Cookies We Use</h2>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable basic functionality 
              such as page navigation and access to secure areas of the website.
            </p>

            <h3>Analytics Cookies</h3>
            <p>
              We use Google Analytics to understand how visitors interact with our website. These cookies collect 
              information about your visit, including pages viewed, time spent on the site, and any error messages.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Third-Party Cookies</h2>
            <p>
              Our website may contain third-party services that place cookies on your device, including:
            </p>
            <ul>
              <li>Google Analytics</li>
            </ul>
            <p>
              These third parties have their own privacy policies and cookie practices. We recommend reviewing 
              their policies for more information about how they use cookies.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies in several ways:
            </p>
            <ul>
              <li>Through your browser settings - most browsers allow you to block or delete cookies</li>
              <li>Through third-party tools and services</li>
            </ul>
            <p>
              Please note that disabling cookies may affect the functionality of our website and your user experience.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with 
              an updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Cookie Policy, please contact us at{' '}
              <a href="mailto:luke@lstevens.dev">luke@lstevens.dev</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
